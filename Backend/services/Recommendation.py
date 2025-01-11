from groclake.modellake import ModelLake
from dotenv import load_dotenv
import os

def recommend(user_message):
    load_dotenv()
    GROCLAKE_ACCOUNT_ID = os.getenv("GROCLAKE_ACCOUNT_ID")
    modellake = ModelLake()

    chat_completion_request = {
        "groc_account_id": GROCLAKE_ACCOUNT_ID,
        "messages": [
            {"role": "system", "content": "Recommend resources that are relevant to the study notes presented. And format it nicely using markdown."},
            {"role": "user", "content": user_message},
        ],
        "token_size": 500
    }

    response_text = modellake.chat_complete(chat_completion_request)
    return response_text