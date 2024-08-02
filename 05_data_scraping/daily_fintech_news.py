import requests
import pandas as pd
from dotenv import load_dotenv
load_dotenv()
import os
from sqlalchemy import create_engine
import pymysql
pymysql.install_as_MySQLdb()
from dbio import news_db_connect, news_to_db
from datetime import datetime

def string_delete(text) :
    return text.replace("<b>","").replace("</b>", "").replace("&quot;", "")

def parse_date(date_str):
    # 날짜 문자열을 datetime 객체로 변환
    return datetime.strptime(date_str, "%a, %d %b %Y %H:%M:%S %z")

def make_df(df_name) :
    for i in df_name :
        for idx in range(0, len(df_name[i])) : 
            df_name[i][idx] = string_delete(df_name[i][idx])
    df_name['pubDate'] = df_name['pubDate'].apply(parse_date)
    return df_name

client_id = os.getenv('client_id') # 환경 변수에 접근
client_pw = os.getenv('client_pw') # 환경 변수에 접근

url = "https://openapi.naver.com/v1/search/news.json"
payload = {'query' : '핀테크', 'display' : 100, 'start' : 1, 'sort' : 'date'}
headers = {'X-Naver-Client-Id' : client_id, 'X-Naver-Client-Secret' : client_pw}
r = requests.get(url, params = payload, headers = headers)
if r.status_code == 200 :
    data = r.json()
else :
    print("Error Code:", r.status_code)
    
df = pd.json_normalize(data['items'])

# 제목과 요약에 태그 지우고 날짜 데이터 타입 바꾸기
make_df(df)

# 오늘 날짜 생성
now = datetime.now()

# 날짜 비교 후 오늘 날짜인 뉴스만 남기기
filtered_df = df[df['pubDate'].dt.date == now.date()]

# news_to_db 함수를 실행하는 코드
if __name__ == "__main__" :
    news_to_db('fintech_news',now.date(), filtered_df)
