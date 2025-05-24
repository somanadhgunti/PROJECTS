from textblob import TextBlob
from langdetect import detect

class LyricsProcessor:
    def analyze_sentiment(self, lyrics):
        blob = TextBlob(lyrics)
        polarity = blob.sentiment.polarity
        sentiment = "Positive" if polarity > 0 else "Negative" if polarity < 0 else "Neutral"
        return sentiment, polarity

    def detect_language(self, lyrics):
        return detect(lyrics)
