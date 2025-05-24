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
