from dotenv import load_dotenv
import os

load_dotenv()

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
from ocr import extract_text_from_image
from analyzer import analyze_conversation

app = FastAPI(title="HeartMirror AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "HeartMirror AI Backend is running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.get("/check-key")
async def check_key():
    key = os.getenv("GEMINI_API_KEY")

    return {
        "exists": key is not None,
        "length": len(key) if key else 0,
    }


@app.post("/analyze")
async def analyze_screenshot(file: UploadFile = File(...)) -> Dict:
    try:
        # Validate uploaded file
        if not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=400,
                detail="File must be an image"
            )

        # Read image
        image_bytes = await file.read()

        # OCR
        extracted_text = extract_text_from_image(image_bytes)

        print("\n========== OCR TEXT ==========")
        print(extracted_text)
        print("==============================\n")

        if not extracted_text or len(extracted_text.strip()) < 10:
            raise HTTPException(
                status_code=400,
                detail="Could not extract enough text from image."
            )

        # Gemini Analysis
        analysis = analyze_conversation(extracted_text)

        print("\n========== ANALYSIS ==========")
        print(analysis)
        print("==============================\n")

        return analysis

    except HTTPException:
        raise

    except Exception as e:
        import traceback
        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )