<<<<<<< HEAD
class GenreClassifier:
    def __init__(self, model):
        self.model = model  # e.g., the trained model (like a RandomForest, etc.)

    def predict(self, features):
        """
        Predict the genre based on the given features.
        """
        return self.model.predict(features)  # Use the model's predict method
=======
from sklearn.ensemble import RandomForestClassifier
import numpy as np

class GenreClassifier:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.genres = ['pop', 'rock', 'classical', 'hip-hop']  # Simplified for demo
        # Dummy training data (replace with real dataset)
        self.X_train = np.random.rand(100, 14)  # 100 samples, 14 features (tempo + 12 chroma + centroid)
        self.y_train = np.random.choice(self.genres, 100)
        self.model.fit(self.X_train, self.y_train)

    def predict_genre(self, audio_features):
        try:
            # Reshape features for prediction
            features = audio_features.reshape(1, -1)
            genre = self.model.predict(features)[0]
            return genre
        except Exception as e:
            raise Exception(f"Error predicting genre: {str(e)}")
>>>>>>> 70e5ebfaa12ed94a4645ae5c863c42b87cf4bd92
