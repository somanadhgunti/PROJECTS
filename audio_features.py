import librosa
import numpy as np

def extract_audio_features(audio_path):
    """
    Extract MFCC features from an audio file using librosa.
    """
    try:
        # Load the audio file
        y, sr = librosa.load(audio_path)

        # Extract MFCCs
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)

        # Compute the mean of each MFCC coefficient
        mfccs_mean = np.mean(mfccs, axis=1)

        return mfccs_mean
    except FileNotFoundError:
        print("Audio file not found. Mocking audio features...")
        mock_features = np.array([-300.5, 120.3, -50.2, 30.1, -10.5, 5.2, -2.3, 1.8, -1.2, 0.9, -0.5, 0.3, -0.1])
        return mock_features

# Test with sample audio files
sample_audios = [

    "a3.wav",
    "a4.wav",
    "mp3_sound.mp3"
]

for audio_path in sample_audios:
    features = extract_audio_features(audio_path)
    print(f"Audio: {audio_path} → MFCC Means: {features}")