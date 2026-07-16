# HeartMirror AI

HeartMirror AI is an AI-powered web application that analyzes chat screenshots to provide insights into communication patterns, relationship dynamics, emotional tone, and conversation quality.

The application combines OCR (Optical Character Recognition) with Google's Gemini AI to transform chat screenshots into structured relationship insights.

---

## Features

- AI-powered conversation analysis
- OCR-based text extraction
- Relationship Score
- Interest Level
- Sentiment Analysis
- Communication Style Analysis
- AI-generated Conversation Summary
- Red Flag Detection
- Green Flag Detection
- Modern glassmorphism user interface
- Responsive design

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons

### Backend

- FastAPI
- Python
- Google Gemini AI
- EasyOCR

---

## Project Architecture

```
Chat Screenshot
        │
        ▼
Upload Interface
        │
        ▼
FastAPI Backend
        │
        ├── OCR
        │
        ▼
Gemini AI
        │
        ▼
Relationship Analysis
        │
        ▼
Results Dashboard
```

---

## Screenshots

### Landing Page

(Add Screenshot)

### Upload Page

(Add Screenshot)

### Results Dashboard

(Add Screenshot)

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/HeartMirror-AI.git
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## Folder Structure

```
HeartMirror-AI
│
├── frontend
│
├── backend
│
├── README.md
│
└── requirements.txt
```

---

## Future Enhancements

- PDF Report Generation
- Conversation History
- Authentication
- Multiple Language Support
- Conversation Comparison
- Cloud Deployment

---

## Disclaimer

HeartMirror AI provides AI-generated insights for informational and educational purposes only. Results should not be considered professional advice or definitive conclusions about personal relationships.

---

## License

MIT License