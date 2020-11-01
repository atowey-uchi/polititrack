import requests

API_KEY = "8d77699e93a44aada889066a2b09b865"

selected_sources = ["the-washington-times", "the-wall-street-journal", "associated-press", "politico", "fox-news", "cnn"]

response = requests.get(f"https://newsapi.org/v2/sources?apiKey={API_KEY}")

sources = response.json()["sources"]
