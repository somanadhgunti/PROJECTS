from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import pdfplumber
import re
from io import BytesIO

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Resume Parser API"}

@app.post("/parse-resume")
async def parse_resume(file: UploadFile = File(...)):
    # Validate file type
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    # Optional: Limit file size (e.g., 10MB)
    contents = await file.read()
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large (max 10MB)")

    # Read and extract text from PDF
    try:
        with pdfplumber.open(BytesIO(contents)) as pdf:
            text = ""
            # Limit to first 10 pages for performance/safety
            for i, page in enumerate(pdf.pages):
                if i >= 10:
                    break
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except pdfplumber.PDFSyntaxError:
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading PDF: {str(e)}")

    # Extract information
    skills = extract_skills(text)
    emails = extract_emails(text)
    experience = extract_experience(text)

    return {
        "filename": file.filename,
        "skills": skills,
        "emails": emails,
        "experience": experience
    }

def extract_skills(text):
    skill_keywords = [
        "Java", "Python", "JavaScript", "SQL", "HTML", "CSS",
        "React", "Spring", "Django", "AWS", "Docker", "Kubernetes",
        "Git", "MySQL", "PostgreSQL", "C++", "C#", "REST API"
    ]
    # Build regex pattern for all skills, escaping special characters
    pattern = r'\b(' + '|'.join(map(re.escape, skill_keywords)) + r')\b'
    matches = re.findall(pattern, text, re.IGNORECASE)
    # Return unique, properly capitalized skills
    found_skills = sorted(set(match for match in matches))
    return found_skills if found_skills else ["No skills detected"]

def extract_emails(text):
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, text)
    return emails if emails else ["No email found"]

def extract_experience(text):
    # Looks for patterns like '3 years experience', '5+ years of experience', etc.
    experience_pattern = r'(\d+\+?\s*years?)\s+(?:of\s+)?experience'
    match = re.search(experience_pattern, text, re.IGNORECASE)
    return match.group(1) if match else "Experience not specified"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
