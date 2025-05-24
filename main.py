<<<<<<< HEAD
import streamlit as st
import os
import numpy as np
import librosa
from audio_processor import AudioProcessor
from genre_classifier import GenreClassifier

# Set up Streamlit page
st.set_page_config(page_title="Music Genre Classifier", page_icon="🎶")

# Title of the web app
st.title("Music Genre Classification App")
st.markdown(
    """
    This application can predict the genre of a song based on audio features extracted from audio or video files.
    Upload a .mp3, .wav, or .mp4 file to get started!
    """
)

# File uploader (supports audio and video files)
audio_file = st.file_uploader("Upload an audio or video file", type=["mp3", "wav", "mp4"])

if audio_file is not None:
    # Save the uploaded file to a temporary location
    with open("temp_uploaded_file", "wb") as f:
        f.write(audio_file.getbuffer())

    # Show a message that the file is being processed
    st.info("Processing your file... Please wait.")

    # Initialize the AudioProcessor and GenreClassifier
    audio_processor = AudioProcessor()
    genre_classifier = GenreClassifier()

    # Extract features from the audio or video file
    features = audio_processor.extract_features("temp_uploaded_file")

    # Predict the genre
    predicted_genre = genre_classifier.predict(features)

    # Display the predicted genre
    st.success(f"The predicted genre is: {predicted_genre}")

    # Clean up temporary file
    os.remove("temp_uploaded_file")
=======
<<<<<<< HEAD
import streamlit as st
import matplotlib.pyplot as plt
from audio_processor import AudioProcessor
from lyrics_processor import LyricsProcessor
from genre_classifier import GenreClassifier
from image_processor import ImageProcessor
from langdetect import detect, DetectorFactory
import requests

# Force consistent language detection behavior
DetectorFactory.seed = 0

# Function to get the singer using the Musixmatch API
def get_singer_from_musixmatch(song_title):
    api_key = 'your_api_key'  # 🔁 Replace with your actual API key
    url = f"http://api.musixmatch.com/ws/1.1/track.search?q_track={song_title}&apikey={api_key}"

    try:
        response = requests.get(url)
        data = response.json()
        if data['message']['body']['track_list']:
            singer = data['message']['body']['track_list'][0]['track']['artist_name']
            return singer
        else:
            return "Singer not found"
    except Exception as e:
        return f"Error: {str(e)}"

# Function to visualize results
def plot_results(genre, sentiment, cover_genre, language, singer):
    fig, ax = plt.subplots()
    categories = ['Audio Genre', 'Lyrics Sentiment', 'Cover Genre', 'Language', 'Singer']
    values = [genre, sentiment, cover_genre or 'N/A', language, singer]
    ax.bar(categories, [1]*len(categories), color=['blue', 'green', 'red', 'purple', 'orange'])
    for i, v in enumerate(values):
        ax.text(i, 0.5, v, ha='center', va='center', color='white')
    ax.set_ylim(0, 1)
    ax.set_ylabel('Results')
    st.pyplot(fig)

# Main function
def main():
    st.title("🎵 Music Genre Classifier + Insights")
    st.write("Upload a song, lyrics, and optional album cover to classify genre, sentiment, language, and find the singer.")

    # Initialize processors
    audio_processor = AudioProcessor()
    lyrics_processor = LyricsProcessor()
    genre_classifier = GenreClassifier()
    image_processor = ImageProcessor()

    # File uploaders
    audio_file = st.file_uploader("Upload an audio file", type=["mp3", "wav"])
    lyrics_file = st.file_uploader("Upload lyrics (text file)", type=["txt"])
    cover_file = st.file_uploader("Upload album cover (optional)", type=["jpg", "jpeg", "png"])

    if audio_file and lyrics_file:
        # Save files locally
        audio_path = "temp_audio.mp3"
        lyrics_path = "temp_lyrics.txt"
        cover_path = "temp_cover.jpg" if cover_file else None

        with open(audio_path, "wb") as f:
            f.write(audio_file.getbuffer())
        with open(lyrics_path, "wb") as f:
            f.write(lyrics_file.getbuffer())
        if cover_file:
            with open(cover_path, "wb") as f:
                f.write(cover_file.getbuffer())

        # Step 1: Extract genre from audio
        try:
            audio_features = audio_processor.extract_features(audio_path)
            genre = genre_classifier.predict_genre(audio_features)
        except Exception as e:
            st.error(f"Audio processing failed: {str(e)}")
            return

        # Step 2: Analyze lyrics for sentiment and language
        sentiment = "Unknown"
        language = "Unknown"
        try:
            with open(lyrics_path, "r", encoding="utf-8") as f:
                lyrics = f.read()

            if not lyrics.strip():
                raise ValueError("Lyrics are empty or invalid")

            try:
                sentiment, _ = lyrics_processor.analyze_sentiment(lyrics)
            except Exception as e:
                st.warning(f"Sentiment analysis failed: {str(e)}")

            try:
                language = detect(lyrics)
            except Exception as e:
                st.warning(f"Language detection failed: {str(e)}")

        except Exception as e:
            st.error(f"Error reading lyrics: {str(e)}")
            return

        # Step 3: Classify album cover (optional)
        cover_genre = None
        if cover_path:
            try:
                cover_genre = image_processor.classify_cover(cover_path)
            except Exception as e:
                st.warning(f"Album cover classification failed: {str(e)}")

        # Step 4: Get singer (use dummy title or extract from metadata if implemented)
        song_title = "Your Song Title"  # 🔁 Optionally update to extract from metadata
        singer = get_singer_from_musixmatch(song_title)

        # Show results
        st.success(f"🎧 Genre: {genre}")
        st.success(f"📝 Sentiment: {sentiment}")
        st.success(f"🌐 Language: {language}")
        st.success(f"🎤 Singer: {singer}")
        if cover_genre:
            st.success(f"🖼️ Cover Genre: {cover_genre}")

        # Plot
        plot_results(genre, sentiment, cover_genre, language, singer)

if __name__ == "__main__":
    main()
=======
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
>>>>>>> cf368abf8067b354ceb0fc49d438a9c74bcbe2c6
>>>>>>> 70e5ebfaa12ed94a4645ae5c863c42b87cf4bd92
