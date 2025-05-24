from moviepy import VideoFileClip
import librosa
import numpy as np
import os

class AudioProcessor:
    def extract_features(self, file_path):
        # If file is an MP4, extract audio to temporary WAV
        if file_path.endswith(".mp4"):
            print("Converting MP4 to WAV...")
            video = VideoFileClip(file_path)
            temp_audio_path = "temp_audio.wav"
            video.audio.write_audiofile(temp_audio_path, verbose=False, logger=None)
            file_path = temp_audio_path  # Use the converted audio

        # Load the audio file with librosa
        y, sr = librosa.load(file_path, sr=22050)
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        mfcc_mean = np.mean(mfcc.T, axis=0)

        # Optional cleanup
        if os.path.exists("temp_audio.wav"):
            os.remove("temp_audio.wav")

        return mfcc_mean
