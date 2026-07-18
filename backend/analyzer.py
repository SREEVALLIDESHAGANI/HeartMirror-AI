import os
import json
from io import BytesIO

from dotenv import load_dotenv
from PIL import Image
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_conversation(image_bytes: bytes):
    image = Image.open(BytesIO(image_bytes))

    prompt = """
You are an expert AI relationship analyst.

The uploaded image is a screenshot of a chat conversation.

Your tasks:
1. Read the entire conversation from the image.
2. Analyze the relationship.
3. Return ONLY valid JSON.

Format:

{
  "sentiment":"Positive",
  "relationship_score":85,
  "interest_level":80,
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
}

Rules:
- Return ONLY JSON.
- No markdown.
- No ```json.
- No explanation.
"""

    response = model.generate_content([prompt, image])

    result = response.text.strip()

    if result.startswith("```"):
        result = result.replace("```json", "").replace("```", "").strip()

    print(result)

    return json.loads(result)