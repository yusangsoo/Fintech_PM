import os
import pandas as pd
from datetime import date
from dbenv import db, dbtype, user_id, pw, host, er_db_name
from sqlalchemy import create_engine
import pymysql
import time
from bs4 import BeautifulSoup as bs
pymysql.install_as_MySQLdb()
import selenium
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from dbio import er_to_db
from dbio import db_connect
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
import datetime

# 시작 날짜와 끝 날짜 설정
start_date = datetime.date(2013, 10, 23)
end_date = datetime.date(2024, 7, 31)

# 월요일부터 금요일에 해당하는 날짜 리스트 생성
weekdays = []
current_date = start_date

while current_date <= end_date:
    if current_date.weekday() < 5:  # 월요일=0, 화요일=1, ..., 금요일=4
        weekdays.append(current_date)
    current_date += datetime.timedelta(days=1)

for weekday in weekdays :
    today = str(weekday)

    # 크롬 옵션즈에 정보를 담아 사람인 것 처럼 만들기
    options = webdriver.ChromeOptions()
    # options.add_experimental_option("excludeSwitches", ['enable-logging'])

    # f12 -> 네트워크 -> 맨 위에 있는 home -> headers -> user-agent에 있는 값 복사 후 괄호 안에 넣기
    # options.add_argument("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36")
    # options.add_argument('lang=ko_KR')
    options.add_argument('--headless') # 웹브라우저를 안 띄우는 거
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')

    # 크롬 웹브라우저 드라이버 자동 다운로드
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options = options)
    driver.set_window_size(1920, 1080) # 웹브라우저 해상도 조절
    driver.get('https://www.kebhana.com/cms/rate/index.do?contentUrl=/cms/rate/wpfxd651_01i.do#//HanaBank')

    # 웹 요소가 나타날 때까지 최대 10초 기다림
    # wait = WebDriverWait(driver,10)
    # 창 열리고 약간 로딩 진행시키기
    time.sleep(5)

    cols = ('통화', '현찰_살때_환율', '현찰_살때_Spread', '현찰_팔때_환율','현찰_팔때_Spread', '송금_보낼때', '송금_받을때', 'T/C_살때', '외화_수표_팔때', '매매기준율', '환가_료율','미화_환산율','date')
    sorted_cols = ('date','통화', '현찰_살때_환율', '현찰_살때_Spread', '현찰_팔때_환율','현찰_팔때_Spread', '송금_보낼때', '송금_받을때', 'T/C_살때', '외화_수표_팔때', '매매기준율', '환가_료율','미화_환산율')


    # 전체 페이지에 있는 거기 때문에 따로 넣기
    # soup에 넣기
    page_html = driver.page_source
    soup = bs(page_html, 'lxml')


    # 날짜 입력창에 기존 값 지우고 날짜 입력
    # 날짜 입력창이 뜰 때까지 기다림
    # search_box = wait.until(ec.presence_of_element_located((By.CSS_SELECTOR, "#tmpInqStrDt")))
    search_box = driver.find_element(By.CSS_SELECTOR, "#tmpInqStrDt")
    search_box.clear()
    search_box.send_keys(today)

    # 조회 버튼 클릭하게 만들기
    search_button = driver.find_element(By.CSS_SELECTOR, '#HANA_CONTENTS_DIV > div.btnBoxCenter > a')
    search_button.click()

    # 5초 이후에 실행
    time.sleep(5)


    # 환율 정보 테이블이 뜰 때까지 기다림
    # er_wait_table = wait.until(ec.presence_of_element_located((By.CSS_SELECTOR, '#searchContentDiv > div.printdiv > table')))

    # 테이블을 read_html로 읽고 date 열 추가
    er_table = str(soup.select('#searchContentDiv > div.printdiv > table'))
    df = pd.read_html(er_table)
    # date 컬럼명 추가
    df[0]['date'] = today
    # cols에 정의한 컬럼명으로 변경하기
    df[0].columns = cols
    # 컬럼 순서 변경
    df[0] = df[0][[*sorted_cols]]

    # er_to_db 함수 진행하라는 명령
    if __name__ == "__main__" :
        er_to_db('exchange_rate',today, df[0])
    driver.close()
