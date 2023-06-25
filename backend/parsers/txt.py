from fastapi import UploadFile


async def txt(file: UploadFile) -> str:
    return str(await file.read())
