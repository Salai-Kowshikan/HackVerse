from groclake.modellake import ModelLake
from dotenv import load_dotenv
import os

def check(user_message):
    load_dotenv()
    GROCLAKE_ACCOUNT_ID = os.getenv("GROCLAKE_ACCOUNT_ID")
    modellake = ModelLake()

    chat_completion_request = {
        "groc_account_id": GROCLAKE_ACCOUNT_ID,
        "messages": [
            {"role": "system", "content": "Fix the spelling and grammatical errors that might be present in the text. It is from OCR and may contain unrelated words. Also add Markdown for better formatting. If there are no errors, Don't return anything other than the markdown."},
            {"role": "user", "content": user_message},
        ],
        "token_size": 500
    }

    response_text = modellake.chat_complete(chat_completion_request)
    return response_text