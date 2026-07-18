import os
import json
from dotenv import load_dotenv
from groq import Groq
from ocr import extract_text_from_image

load_dotenv()

import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def analyze_conversation(image_bytes: bytes):
    # Extract text from image using OCR
    extracted_text = extract_text_from_image(image_bytes)
    
    print("Extracted text:", extracted_text)
    
    if not extracted_text or len(extracted_text.strip()) < 10:
        return {
            "sentiment": "Unknown",
            "relationship_score": 0,
            "interest_level": 0,
            "communication_style": "Unable to analyze - insufficient text extracted from image",
            "red_flags": ["No text detected in image"],
            "green_flags": [],
            "summary": "Please upload a clearer image with readable text."
        }

    prompt = f"""
You are an expert AI relationship analyst.

Here is a conversation extracted from a chat screenshot:

{extracted_text}

Your tasks:
1. Analyze the relationship dynamics from this conversation.
2. Return ONLY valid JSON.

Format:

{{
  "sentiment":"Positive/Negative/Neutral",
  "relationship_score":0-100,
  "interest_level":0-100,
  "communication_style":"...",
  "red_flags":[
    "...",
    "..."
  ],
  "green_flags":[
    "...",
    "..."
  ],
  "summary":"..."
}}

Rules:
- Return ONLY JSON.
- No markdown.
- No ```json.
- No explanation.
- relationship_score and interest_level must be numbers (0-100)
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.5,
        max_tokens=1024,
    )

    result = response.choices[0].message.content.strip()

    if result.startswith("```"):
        result = result.replace("```json", "").replace("```", "").strip()

    print("Analysis result:", result)

    try:
        return json.loads(result)
    except json.JSONDecodeError:
        # Fallback if JSON parsing fails
        return {
            "sentiment": "Unknown",
            "relationship_score": 50,
            "interest_level": 50,
            "communication_style": "Analysis failed - please try again",
            "red_flags": ["AI analysis error"],
            "green_flags": [],
            "summary": result
        }