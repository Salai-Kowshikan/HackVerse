from groclake.modellake import ModelLake
from dotenv import load_dotenv
import os

def get_chat_response(user_message):
    load_dotenv()
    GROCLAKE_ACCOUNT_ID = os.getenv("GROCLAKE_ACCOUNT_ID")
    modellake = ModelLake()

    chat_completion_request = {
        "groc_account_id": GROCLAKE_ACCOUNT_ID,
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_message}
        ]
    }

    response_text = modellake.chat_complete(chat_completion_request)
    return response_text

user_message = "Explain water cycle"
response = get_chat_response(user_message)
print("Response:", response)