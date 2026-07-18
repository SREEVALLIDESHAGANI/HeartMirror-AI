from io import BytesIO
from PIL import Image
import pytesseract
import cv2
import numpy as np

import platform

if platform.system() == "Windows":
    pytesseract.pytesseract.tesseract_cmd = (
        r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    )
else:
    pytesseract.pytesseract.tesseract_cmd = "/usr/bin/tesseract"

def extract_text_from_image(image_bytes: bytes) -> str:
    """
    Extract text from image bytes using Tesseract OCR.
    """

    image = Image.open(BytesIO(image_bytes)).convert("RGB")

    image_np = np.array(image)

    # Convert to grayscale
    gray = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)

    # Reduce noise
    gray = cv2.GaussianBlur(gray, (3, 3), 0)

    # Improve text visibility
    _, thresh = cv2.threshold(
        gray,
        0,
        255,
        cv2.THRESH_BINARY + cv2.THRESH_OTSU
    )

    text = pytesseract.image_to_string(
        thresh,
        config="--oem 3 --psm 6"
    )

    return text.strip()