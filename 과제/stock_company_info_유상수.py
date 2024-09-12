import requests
import pandas as pd
from bs4 import BeautifulSoup
import time
# 날짜를 다루는 라이브러리
from datetime import date
import os
from sqlalchemy import create_engine
import pymysql
pymysql.install_as_MySQLdb()
from sqlalchemy import text


def db_connect(db_name=None):
# 데이터베이스가 없는 경우, MySQL 기본 연결로 접근
    if db_name:
        engine = create_engine(f'mysql+pymysql://root:1234@127.0.0.1:3306/{db_name}')
    else:
        engine = create_engine('mysql+pymysql://root:1234@127.0.0.1:3306')

    conn = engine.connect()
    return conn

def create_database_if_not_exists(db_name):
    # 기본 MySQL 연결 (특정 DB 없이 연결)
    conn = db_connect()
    
    # korea_stock 데이터베이스가 존재하는지 확인하는 쿼리
    check_db_query = f"SHOW DATABASES LIKE '{db_name}'"
    
    db_exists = conn.execute(text(check_db_query)).fetchone()
    
    if not db_exists:
        # 데이터베이스가 없으면 생성
        print(f"데이터베이스 '{db_name}'가 없습니다. 새로 생성합니다.")
        create_db_query = f"CREATE DATABASE {db_name}"
        conn.execute(text(create_db_query))
    else:
        print(f"데이터베이스 '{db_name}'가 이미 존재합니다.")
    
    conn.close()

# db에 저장하는 함수
def stock_info_to_db(df, db_name="korean_stock") :
    today = str(date.today()).replace("-", "_")
    
    # 데이터베이스 존재 여부 확인 및 생성
    create_database_if_not_exists(db_name)
    
    conn = db_connect(db_name)
    
    df.to_sql("company_info", con = conn, if_exists = 'replace', index = False)
    conn.close()
    
    return print(f'{today},{"저장완료":<30s}', end = "\r")

def stock_info_scraping() :


    # 상장공시시스템
    page = 1
    a = True
    dic = {'상장종류' : [], "회사명" : [], "종목코드" : [], "업종" : [], "주요제품" : [], "상장일" : [], "결산월" : [], "대표자명" : [], "홈페이지" : [], "지역" : []}
    while a :
        url = "https://kind.krx.co.kr/corpgeneral/corpList.do"
        payload = {'method' : 'searchCorpList', 'pageIndex' : page, 'currentPageSize' : 100, 'orderMode' : 3, 'orderStat':'D', 'searchType':13}
        r = requests.get(url, params = payload)
        

        data = r.text
        soup = BeautifulSoup(data, 'lxml')
        
        total_items = int(soup.select_one(".info.type-00 > em").text.replace(",",""))
        total_pages = total_items // 100 + 1
        print(f"{page}/{total_pages} 수집중", end = "\r")

        # 전체 페이지
        # 상장종류
        types = []
        for i in soup.select('td.first') :
            types_types = [(img['alt']) for img in i.select('img')]
            type = ", ".join(types_types)
            types.append(type)


        # 회사명
        com_name = []
        for i in soup.select('td.first > a') :
            com_name.append(i.string)
            
        # 종목코드
        code = []
        for i in soup.select('td.first > a') :
            code.append(i.get('onclick').split("'")[1]+"0")
        

        # 업종 & 주요제품
        sums = []
        sector = []
        product = []
        for i in soup.select('.textOverflow') :
            sums.append(i.string)

        for sec in sums[0::2] :
            sector.append(sec)
        for pro in sums[1::2] :
            product.append(pro)
        # sector와 product를 딕셔너리에 setdefault로 넣으면 됨

        # txc에 엮인 것들 모조리 가져오기
        entire = []
        ceo_names = []
        for i in soup.find_all('td', 'txc') :
            if i.find('a') is not None :
                entire.append(i.find('a')['href'])
            elif i.string == '\n' :
                entire.append("None")
            elif i is not None :
                entire.append(i.string)

        # 대표명은 string이 아닌 title 값을 가져와야 함
        for i in soup.find_all('td', class_='txc') :
            ceo_names.append(i.get('title'))
            
        # title 값으로 가져온 대표명을 다시 entire의 대표명으로 교체   
        for i in range(0, len(entire)) :
            if i % 5 == 2 :
                entire[i] = ceo_names[i]

        # 상장일, 결산월, 대표명, 홈페이지, 지역
        date = []
        month = []
        ceo_name = []
        homepage = []
        region = []
        for i in range(0,5) :
            if i == 0 :
                for da in entire[i::5]:
                    date.append(da)
            if i == 1 :
                for mo in entire[i::5]:
                    month.append(mo)
            if i == 2 :
                for ceo in entire[i::5]:
                    ceo_name.append(ceo)
            if i == 3 :
                for home in entire[i::5]:
                    homepage.append(home)
            if i == 4 :
                for re in entire[i::5]:
                    region.append(re)

        # 딕셔너리에 페이지에서 가져온 값들 value로 넣기
        for key in dic :
            if key == "상장종류" :
                dic[key].extend(types)
            if key == "회사명" :
                dic[key].extend(com_name)
            if key == "종목코드" :
                dic[key].extend(code)
            if key == "업종" :
                dic[key].extend(sector)
            if key == "주요제품" :
                dic[key].extend(product)
            if key == "상장일" :
                dic[key].extend(date)
            if key == "결산월" :
                dic[key].extend(month)
            if key == "대표자명" :
                dic[key].extend(ceo_name)
            if key == "홈페이지" :
                dic[key].extend(homepage)
            if key == "지역" :
                dic[key].extend(region)
        # 전체 페이지까지 진행되도록 하는 코드
        if page < total_pages :
            print('page :', page, end = "\r")
            page += 1
            time.sleep(0.5)
        else :
            a = False
            
    # 딕셔너리를 데이터프레임으로 변환
    df = pd.DataFrame(dic)

    # 데이터베이스에 저장
    stock_info_to_db(df)
    
if __name__ == "__main__" :
    stock_info_scraping()