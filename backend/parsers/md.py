from fastapi import UploadFile
from markdown import markdown
from bs4 import BeautifulSoup


async def md(file: UploadFile) -> str:
    content = str(await file.read())
    html = markdown(content)
    text = "".join(BeautifulSoup(html, features="lxml").find_all(text=True))
    return text
