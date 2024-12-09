from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles  # StaticFiles 임포트
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv
import os

# .env 파일 로드
load_dotenv()

# 환경 변수 가져오기
KAKAOMAP_API_KEY = os.getenv("appkey")
GTM_ID = os.getenv("gtmid")

app = FastAPI()
templates = Jinja2Templates(directory="static")

# StaticFiles를 "/static" 경로에 마운트
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    # index.html 렌더링
    return templates.TemplateResponse("index.html", {
        "request": request,
        "kakaomap_api_key": KAKAOMAP_API_KEY,
        "gtm_id": GTM_ID
    })

@app.get("/static", response_class=HTMLResponse)
async def read_static():
    # static/index.html 읽기
    with open("static/index.html", "r", encoding="utf-8") as file:
        return HTMLResponse(content=file.read())