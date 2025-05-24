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
