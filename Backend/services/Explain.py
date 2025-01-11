from groclake.modellake import ModelLake
from dotenv import load_dotenv
import os

def explain(user_message):
    load_dotenv()
    GROCLAKE_ACCOUNT_ID = os.getenv("GROCLAKE_ACCOUNT_ID")
    modellake = ModelLake()

    chat_completion_request = {
        "groc_account_id": GROCLAKE_ACCOUNT_ID,
        "messages": [
            {"role": "system", "content": "You are helping students with learning disabilities. Given the content, explain it in a way that is easy to understand."},
            {"role": "user", "content": user_message},
        ],
        "token_size": 500
    }

    response_text = modellake.chat_complete(chat_completion_request)
    return response_text