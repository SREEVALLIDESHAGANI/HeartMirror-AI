import os
import json
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-3.5-flash")


def analyze_conversation(text: str):
    prompt = f"""
You are an AI relationship analyst.

Analyze the following conversation.

Conversation:
{text}

Return ONLY valid JSON in exactly this format:

{{
  "sentiment": "Positive/Neutral/Negative",
  "relationship_score": 85,
  "interest_level": 80,
  "communication_style": "...",
  "red_flags": [
    "...",
    "..."
  ],
  "green_flags": [
    "...",
    "..."
  ],
  "summary": "..."
}}

Do not write markdown.
Do not use ```json.
Return only valid JSON.
"""

    try:
        response = model.generate_content(prompt)
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise e

    result = response.text.strip()

    if result.startswith("```"):
        result = result.replace("```json", "").replace("```", "").strip()

    print("\n========== GEMINI RESPONSE ==========")
    print(result)
    print("=====================================\n")

    return json.loads(result)