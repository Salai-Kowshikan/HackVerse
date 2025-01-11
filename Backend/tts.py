from groclake.modellake import ModelLake
from dotenv import load_dotenv
import os

def get_speech(user_message):
    load_dotenv()
    GROCLAKE_ACCOUNT_ID = os.getenv("GROCLAKE_ACCOUNT_ID")
    modellake = ModelLake()

    text_to_speech_request = {
                      "groc_account_id": GROCLAKE_ACCOUNT_ID,
                      "text": user_message,
                      "lang": "en"
                    }
    text_to_speech = modellake.text_to_speech(text_to_speech_request)
    return text_to_speech

user_message = "Hello, this is a direct response example hey hey hey!"
response = get_speech(user_message)
print("Text to speech:", response)