## while 문으로 입력받고 하는 거
## 함수화
## 1페이지만
import requests
from dotenv import load_dotenv
import os

# .env 파일에서 환경 변수 로드
load_dotenv()


def naver_search() :
    a = True
    typed = input("블로그, 책, 뉴스, 전문자료 중 하나를 입력하세요 : ")
    search = input("검색어를 입력하세요 : ")
    client_id = os.getenv('client_id') # 환경 변수에 접근
    client_pw = os.getenv('client_pw') # 환경 변수에 접근
    while a :
        if typed == "블로그" :
            choice_type = 'blog'
            url = f"https://openapi.naver.com/v1/search/{choice_type}"
            payload = {f'query' : {search}, 'display' : 10, 'start' : 1, 'sort' : 'sim'}
            headers = {'X-Naver-Client-Id' : client_id, 'X-Naver-Client-Secret' : client_pw}
            r = requests.get(url, params = payload, headers = headers)
            if r.status_code == 200 :
                data = r.json()
                print(data)
                a = False
            else :
                print("Error Code:", r.status_code)
                a = False

        elif typed == "책" :
            choice_type = 'book'
            url = f"https://openapi.naver.com/v1/search/{choice_type}"
            payload = {f'query' : {search}, 'display' : 10, 'start' : 1, 'sort' : 'sim'}
            headers = {'X-Naver-Client-Id' : client_id, 'X-Naver-Client-Secret' : client_pw}
            r = requests.get(url, params = payload, headers = headers)
            if r.status_code == 200 :
                data = r.json()
                print(data)
                a = False
            else :
                print("Error Code:", r.status_code)
                a = False

        elif typed == "뉴스" :
            choice_type = 'news'
            url = f"https://openapi.naver.com/v1/search/{choice_type}"
            payload = {f'query' : {search}, 'display' : 10, 'start' : 1, 'sort' : 'sim'}
            headers = {'X-Naver-Client-Id' : client_id, 'X-Naver-Client-Secret' : client_pw}
            r = requests.get(url, params = payload, headers = headers)
            if r.status_code == 200 :
                data = r.json()
                print(data)
                a = False
            else :
                print("Error Code:", r.status_code)
                a = False

        elif typed == "전문자료" :
            choice_type = 'doc'
            url = f"https://openapi.naver.com/v1/search/{choice_type}"
            payload = {f'query' : {search}, 'display' : 10, 'start' : 1, 'sort' : 'sim'}
            headers = {'X-Naver-Client-Id' : client_id, 'X-Naver-Client-Secret' : client_pw}
            r = requests.get(url, params = payload, headers = headers)
            if r.status_code == 200 :
                data = r.json()
                print(data)
                a = False
            else :
                print("Error Code:", r.status_code)
                a = False

        else :
            print("블로그, 책, 뉴스, 전문자료 중 하나를 입력하세요")
            a = False