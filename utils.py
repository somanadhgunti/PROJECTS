import requests

def get_singer_from_musixmatch(song_title, api_key='your_api_key'):
    url = f"http://api.musixmatch.com/ws/1.1/track.search?q_track={song_title}&apikey={api_key}"
    try:
        response = requests.get(url)
        data = response.json()
        if data['message']['body']['track_list']:
            return data['message']['body']['track_list'][0]['track']['artist_name']
        else:
            return "Singer not found"
    except Exception as e:
        return f"Error: {str(e)}"
