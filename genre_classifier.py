class GenreClassifier:
    def __init__(self, model):
        self.model = model  # e.g., the trained model (like a RandomForest, etc.)

    def predict(self, features):
        """
        Predict the genre based on the given features.
        """
        return self.model.predict(features)  # Use the model's predict method
