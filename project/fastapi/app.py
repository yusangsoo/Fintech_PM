from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# 정적 파일을 서빙
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_root():
    # index.html 파일을 읽어서 반환
    with open("static/index.html", "r", encoding="utf-8") as file:
        return HTMLResponse(content=file.read())