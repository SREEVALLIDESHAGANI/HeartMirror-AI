import easyocr
from io import BytesIO
from PIL import Image
import numpy as np

# Initialize reader (load once)
reader = easyocr.Reader(['en'], gpu=False)

def extract_text_from_image(image_bytes: bytes) -> str:
    """
    Extract text from image bytes using EasyOCR.
    
    Args:
        image_bytes: Image data as bytes
        
    Returns:
        Extracted text as string
    """
    # Convert bytes to PIL Image
    image = Image.open(BytesIO(image_bytes))
    
    # Convert PIL Image to numpy array
    image_np = np.array(image)
    
    # Extract text using EasyOCR
    results = reader.readtext(image_np)
    
    # Combine all detected text
    text_lines = [result[1] for result in results]
    extracted_text = '\n'.join(text_lines)
    
    return extracted_text
