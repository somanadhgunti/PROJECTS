import os
import numpy as np
import librosa
import speech_recognition as sr
import ffmpeg
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk

# Download NLTK sentiment model
nltk.download('vader_lexicon')

# Set ffmpeg executable path
ffmpeg_exe_path = r"C:\Users\231fa04974\Downloads\ffmpeg-7.1.1-full_build\ffmpeg-7.1.1-full_build\bin\ffmpeg.exe"

# 🔁 Convert any format to WAV using ffmpeg-python
def convert_to_wav(input_path, output_path="converted_audio.wav"):
    try:
        # Use ffmpeg wrapper to convert input to output WAV
        ffmpeg.input(input_path).output(output_path).run(overwrite_output=True, cmd=ffmpeg_exe_path)
        return output_path
    except ffmpeg.Error as e:
        print(" Error converting audio file with ffmpeg:", e)
        raise


# 🎼 Extract MFCC Features
def extract_mfcc(file_path, n_mfcc=13):
    y, sr = librosa.load(file_path, sr=None)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc)
    mfcc_means = np.mean(mfcc, axis=1)
    return mfcc_means


# 🎤 Transcribe Audio to Text
def audio_to_text(wav_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(wav_path) as source:
        audio = recognizer.record(source)
    try:
        return recognizer.recognize_google(audio)
    except sr.UnknownValueError:
        return "Could not understand the audio."
    except sr.RequestError:
        return "Speech Recognition API error."


# 💬 Sentiment Analysis using NLTK
def analyze_sentiment(text):
    sia = SentimentIntensityAnalyzer()
    score = sia.polarity_scores(text)
    if score['compound'] >= 0.05:
        return "Positive"
    elif score['compound'] <= -0.05:
        return "Negative"
    else:
        return "Neutral"


# 🧠 Main Analysis Function
def analyze_audio_file(file_path):
    print(f"\n Processing file: {file_path}")

    # Convert to WAV using ffmpeg-python
    wav_path = convert_to_wav(file_path)

    # Extract MFCC features
    mfcc_means = extract_mfcc(wav_path)
    print("\nMFCC Mean Values:")
    for i, val in enumerate(mfcc_means):
        print(f"  Coefficient {i+1}: {val:.2f}")

    # Transcribe speech to text
    text = audio_to_text(wav_path)
    print(f"\nTranscribed Text:\n  \"{text}\"")

    # Analyze sentiment
    sentiment = analyze_sentiment(text)
    print(f"\n Sentiment: {sentiment}")

    # Clean up temporary WAV file
    if wav_path == "converted_audio.wav":
        os.remove(wav_path)

    return {
        "mfcc_means": mfcc_means.tolist(),
        "text": text,
        "sentiment": sentiment
    }


# 🚀 Run the analyzer
if __name__ == "__main__":
    # Replace with your audio file path (can be mp3, m4a, etc.)
    input_file = "human_audio1.mp3"

    if not os.path.exists(input_file):
        print(f"❌ File not found: {input_file}")
    else:
        analyze_audio_file(input_file)
