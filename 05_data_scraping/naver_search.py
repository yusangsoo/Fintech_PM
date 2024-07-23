import os
import sys
import urllib.request
import json
import pandas as pd
import time
from dotenv import load_dotenv
import os

# .env 파일에서 환경 변수 로드
load_dotenv()

# 생성자가 아니라 input함수로 입력받기
def choice_type2() :
    """
    이 함수는 naver 검색 api를 이용해 블로그, 책, 뉴스, 전문자료를 검색하는 함수입니다.
    """
    typed = input("블로그, 책, 뉴스, 전문자료 중 하나를 입력하세요 : ")
    query_name = input("검색할 검색어를 입력하세요 : ")
    data_list = []
    client_id = os.getenv('client_id') # 환경 변수에 접근
    client_pw = os.getenv('client_pw') # 환경 변수에 접근
    query = query_name
    encText = urllib.parse.quote(query)
    a = True
    page = 0
    n = 1
    if typed == "블로그" :
        choiced_type = 'blog'
        while a :
            url = f"https://openapi.naver.com/v1/search/{choiced_type}.json?query={encText}&display=10&start={n}" # JSON 결과
            request = urllib.request.Request(url)
            request.add_header("X-Naver-Client-Id",client_id)
            request.add_header("X-Naver-Client-Secret",client_pw)
            response = urllib.request.urlopen(request)
            rescode = response.getcode()
            if(rescode==200):
                response_body = response.read()
                data = json.loads(response_body.decode('utf-8'))
                data_list.append(json.loads(response_body.decode('utf-8')))
            else:
                print("Error Code:" + rescode)
            page += 1
            n += 10
            if page >= data['total'] // 10 + 1 :
                a = False
                
        # pandas 활용해 전체페이지 엑셀 형태로 적용
        result = pd.DataFrame()
        for i in data_list :
            temp = pd.json_normalize(i['items'])
            result = pd.concat([result,temp])
        result
        result.to_csv(f'{choiced_type}_{query}_list.csv', encoding = 'cp949')

        
    elif typed == "책" :
        choiced_type = 'book'
        while a :
            url = f"https://openapi.naver.com/v1/search/{choiced_type}.json?query={encText}&display=10&start={n}" # JSON 결과
            request = urllib.request.Request(url)
            request.add_header("X-Naver-Client-Id",client_id)
            request.add_header("X-Naver-Client-Secret",client_pw)
            response = urllib.request.urlopen(request)
            rescode = response.getcode()
            if(rescode==200):
                response_body = response.read()
                data = json.loads(response_body.decode('utf-8'))
                data_list.append(json.loads(response_body.decode('utf-8')))
            else:
                print("Error Code:" + rescode)
            page += 1
            n += 10
            if page >= data['total'] // 10 + 1 :
                a = False
                
        # pandas 활용해 전체페이지 엑셀 형태로 적용
        result = pd.DataFrame()
        for i in data_list :
            temp = pd.json_normalize(i['items'])
            result = pd.concat([result,temp])
        result
        result.to_csv(f'{choiced_type}_{query}_list.csv', encoding = 'cp949')

        
    elif typed == "뉴스" :
        choiced_type = 'news'
        while a :
            url = f"https://openapi.naver.com/v1/search/{choiced_type}.json?query={encText}&display=10&start={n}" # JSON 결과
            request = urllib.request.Request(url)
            request.add_header("X-Naver-Client-Id",client_id)
            request.add_header("X-Naver-Client-Secret",client_pw)
            response = urllib.request.urlopen(request)
            rescode = response.getcode()
            if(rescode==200):
                response_body = response.read()
                data = json.loads(response_body.decode('utf-8'))
                data_list.append(json.loads(response_body.decode('utf-8')))
            else:
                print("Error Code:" + rescode)
            page += 1
            n += 10
            if page >= data['total'] // 10 + 1 :
                a = False
        # pandas 활용해 전체페이지 엑셀 형태로 적용
        result = pd.DataFrame()
        for i in data_list :
            temp = pd.json_normalize(i['items'])
            result = pd.concat([result,temp])
        result
        result.to_csv(f'{choiced_type}_{query}_list.csv', encoding = 'cp949')

        
    elif typed == "전문자료" :
        choiced_type = 'doc'
        while a :
            url = f"https://openapi.naver.com/v1/search/{choiced_type}.json?query={encText}&display=10&start={n}" # JSON 결과
            request = urllib.request.Request(url)
            request.add_header("X-Naver-Client-Id",client_id)
            request.add_header("X-Naver-Client-Secret",client_pw)
            response = urllib.request.urlopen(request)
            rescode = response.getcode()
            if(rescode==200):
                response_body = response.read()
                data = json.loads(response_body.decode('utf-8'))
                data_list.append(json.loads(response_body.decode('utf-8')))
            else:
                print("Error Code:" + rescode)
            page += 1
            n += 10
            if page >= data['total'] // 10 + 1 :
                a = False
        # pandas 활용해 전체페이지 엑셀 형태로 적용
        result = pd.DataFrame()
        for i in data_list :
            temp = pd.json_normalize(i['items'])
            result = pd.concat([result,temp])
        result
        result.to_csv(f'{choiced_type}_{query}_list.csv', encoding = 'cp949')

    
    else :
        print("블로그, 책, 뉴스, 전문자료 중에 하나를 입력하세요")
        

    
# choice_type2()
        