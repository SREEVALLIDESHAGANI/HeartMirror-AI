# Use Python 3.11 slim image for smaller size
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies for Tesseract OCR
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port (Render sets PORT environment variable)
EXPOSE 8000

# Start the application with Render's PORT environment variable
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "${PORT}"]
