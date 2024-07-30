import os
import pandas as pd
from datetime import date
from dotenv import load_dotenv
from sqlalchemy import create_engine
import pymysql
import time
import requests
from bs4 import BeautifulSoup
pymysql.install_as_MySQLdb()
load_dotenv(dotenv_path = ".env_db")

def db_connect() :
    # env 파일을 못 읽어서 실행 파일이 오류가 남.
    # engine = create_engine(f"{os.getenv('db')}+{os.getenv('dbtype')}://{os.getenv('id')}:{os.getenv('pw')}@{os.getenv('host')}/{os.getenv('db_name')}")
    engine = create_engine("mysql+pymysql://root:1234@127.0.0.1:3306/korea_stock_info")
    conn = engine.connect()
    return conn

def stock_info_scraping() :

    # mysql에서 테이블 불러오기
    conn = db_connect()
    data = pd.read_sql('stock_company_info_2024_07_29', con = conn)
    conn.close()

    # db에 저장하는 함수
    def stock_info_to_db(idx,code,df) :
        today = str(date.today()).replace("-", "_")
        conn = db_connect()
        
        df.to_sql(f"{today[:7]}_stock_price_info", con = conn, if_exists = 'append', index = False)
        conn.close()
        
        return print(f'{today}, {idx}, {code}, {"저장완료":<30s}', end = "\r")


    # 전체 종목

    errors = {}
    for idx, code in enumerate(data['종목코드']) :
        stock = {}
        url = f'https://finance.naver.com/item/main.naver?code={code}'
        r = requests.get(url)
        dataset = r.text
        soup = BeautifulSoup(dataset, 'lxml')
        today = str(date.today())
        try : 
            if code[0] in ("U", "S", "J", "H","C") :
                continue
            else :
                # 년월일
                stock.setdefault("년월일", []).append(today)

                # 회사명
                stock.setdefault("회사명",[]).append(soup.select('dl.blind > dd')[1].string.split(" ")[1])

                # 종목코드
                stock.setdefault("종목코드", []).append(f"{code}")

                # 현재가
                stock.setdefault("현재가",[]).append(soup.select('.rate_info  span.blind')[0].string.replace(",",""))

                # 변동금액
                stock.setdefault("변동금액",[]).append(soup.select('.rate_info  span.blind')[1].string.replace(",",""))

                # 변동률
                if soup.select('.rate_info span.blind')[2].string == '0.00' :
                    stock.setdefault("변동률",[]).append(soup.select('.rate_info span.blind')[2].string)
                elif soup.select('.rate_info dd')[2].string[-3:] == "플러스" :
                    stock.setdefault("변동률",[]).append(float(soup.select_one('.rate_info span.ico.plus').text+soup.select('.rate_info span.blind')[2].string))
                else :
                    stock.setdefault("변동률",[]).append(float(soup.select_one('.rate_info span.ico.minus').text+soup.select('.rate_info span.blind')[2].string))

                # 전일
                stock.setdefault("전일",[]).append(soup.select('.rate_info  span.blind')[3].string.replace(",",""))

                # 고가
                stock.setdefault("고가",[]).append(soup.select('.rate_info  span.blind')[4].string.replace(",",""))

                # 거래량
                stock.setdefault("거래량",[]).append(soup.select('.rate_info  span.blind')[6].string.replace(",",""))

                # 시가
                stock.setdefault("시가",[]).append(soup.select('.rate_info  span.blind')[7].string.replace(",",""))

                # 저가
                stock.setdefault("저가",[]).append(soup.select('.rate_info  span.blind')[8].string.replace(",",""))

                # 거래대금
                stock.setdefault("거래대금",[]).append(soup.select('.rate_info  span.blind')[9].string.replace(",",""))
                
                df = pd.DataFrame(stock)
                stock_info_to_db(idx,code,df)

                time.sleep(3)
                print(f'{idx}번째 진행 중',code, end = "\r")
                
        except Exception as e :
            print(e)
            print(r.status_code, f'{idx}번째 진행 중',code)
            errors.setdefault("에러",[]).append(code) # 에러 코드 모음
    return(print(f'{str(date.today)} 주식 정보 수집 완료'))
        
if __name__ == "__main__" :
    stock_info_scraping()