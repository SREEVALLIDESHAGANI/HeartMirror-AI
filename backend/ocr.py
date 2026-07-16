import easyocr
import numpy as np
import cv2

_reader = None

def get_reader():
    global _reader
    if _reader is None:
        _reader = easyocr.Reader(['en'], gpu=False)
    return _reader


def extract_text_from_image(image_bytes: bytes) -> str:
    try:
        # Convert bytes -> numpy array
        np_arr = np.frombuffer(image_bytes, np.uint8)

        # Decode image
        image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if image is None:
            raise Exception("Could not decode image")

        reader = get_reader()

        # EasyOCR accepts numpy arrays
        results = reader.readtext(image)

        extracted_text = " ".join(
            [result[1] for result in results]
        )

        return extracted_text.strip()

    except Exception as e:
        raise Exception(f"OCR extraction failed: {str(e)}")