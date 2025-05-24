import librosa
import numpy as np

def extract_audio_features(audio_path):
    try:
        y, sr = librosa.load(audio_path)
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        mfccs_mean = np.mean(mfccs, axis=1)
        mfccs_std = np.std(mfccs, axis=1)
        return mfccs_mean, mfccs_std
    except FileNotFoundError:
        print("Audio file not found. Mocking audio features...")
        mock_mean = np.array([-300.5, 120.3, -50.2, 30.1, -10.5, 5.2, -2.3, 1.8, -1.2, 0.9, -0.5, 0.3, -0.1])
        mock_std = np.array([50.0, 20.0, 15.0, 10.0, 8.0, 5.0, 3.0, 2.0, 1.5, 1.0, 0.8, 0.5, 0.3])
        return mock_mean, mock_std

# Test with sample audio files
sample_audios = [
    "a3.wav","a4.wav","mp3_sound.mp3"
]

for audio_path in sample_audios:
    mean, std = extract_audio_features(audio_path)
    print(f"Audio: {audio_path}")
    print(f"MFCC Means: {mean}")
    print(f"MFCC Std Dev: {std}")