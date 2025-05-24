from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from collections import Counter

# Initialize FastAPI app
app = FastAPI()

# Mock sentiment analysis model (simplified from Day 2)
stop_words = set(stopwords.words('english')) - {'not', 'no', 'this'}
lemmatizer = WordNetLemmatizer()

def mock_sentiment_analysis(text):
    """
    Mock sentiment analysis using simple keyword matching.
    In a real scenario, use the trained Naive Bayes classifier from Day 2.
    """
    tokens = [lemmatizer.lemmatize(word.lower()) for word in word_tokenize(text) if word.isalpha()]
    features = Counter(tokens)
    positive_words = {'love', 'amazing', 'great', 'recommend', 'adore', 'wonderful'}
    negative_words = {'hate', 'terrible', 'bad', 'worst', 'not'}
    pos_score = sum(features[word] for word in positive_words if word in features)
    neg_score = sum(features[word] for word in negative_words if word in features)
    return "Positive" if pos_score > neg_score else "Negative"

# Mock ResNet classification (from Day 3)
def mock_resnet_classify(image_data):
    """
    Mock ResNet classification based on filename or content.
    In a real scenario, use a pre-trained ResNet model.
    """
    return "Dog"  # Mocked for simplicity

# Mock Whisper transcription (simplified)
def mock_whisper_transcribe(audio_data):
    """
    Mock Whisper transcription.
    In a real scenario, use the Whisper model to transcribe audio.
    """
    return "Hello, this is a test transcription"

# Endpoint for text prediction (sentiment analysis)
@app.post("/predict/text")
async def predict_text(data: dict):
    text = data.get("text", "")
    if not text:
        return JSONResponse(content={"error": "Text is required"}, status_code=400)
    sentiment = mock_sentiment_analysis(text)
    return {"text": text, "sentiment": sentiment}

# Endpoint for image prediction (mock ResNet)
@app.post("/predict/image")
async def predict_image(file: UploadFile = File(...)):
    image_data = await file.read()
    classification = mock_resnet_classify(image_data)
    return {"filename": file.filename, "classification": classification}

# Endpoint for audio prediction (mock Whisper)
@app.post("/predict/audio")
async def predict_audio(file: UploadFile = File(...)):
    audio_data = await file.read()
    transcription = mock_whisper_transcribe(audio_data)
    return {"filename": file.filename, "transcription": transcription}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
