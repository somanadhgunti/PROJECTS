<<<<<<< HEAD
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
=======
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import string

class LyricsProcessor:
    def __init__(self):
        self.lemmatizer = WordNetLemmatizer()
        self.sid = SentimentIntensityAnalyzer()

    def preprocess_lyrics(self, lyrics):
        # Tokenize and clean
        tokens = word_tokenize(lyrics.lower())
        tokens = [t for t in tokens if t not in string.punctuation]
        # Lemmatize
        tokens = [self.lemmatizer.lemmatize(t) for t in tokens]
        return tokens

    def analyze_sentiment(self, lyrics):
        try:
            # Get sentiment scores
            scores = self.sid.polarity_scores(lyrics)
            sentiment = "positive" if scores['compound'] > 0.05 else "negative" if scores['compound'] < -0.05 else "neutral"
            return sentiment, scores['compound']
        except Exception as e:
            raise Exception(f"Error analyzing lyrics sentiment: {str(e)}")
>>>>>>> 70e5ebfaa12ed94a4645ae5c863c42b87cf4bd92
