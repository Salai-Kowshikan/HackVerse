from groclake.modellake import ModelLake
from dotenv import load_dotenv
import os

def translate(user_message, src="en", tar="ta"):
    load_dotenv()
    GROCLAKE_ACCOUNT_ID = os.getenv("GROCLAKE_ACCOUNT_ID")
    modellake = ModelLake()

    translate_request={
                  "text": [
                      user_message
                  ],
                  "source_lang_code": src,
                  "target_lang_code": tar,
                  "model": "openai"
              }

    text = modellake.translate(translate_request)
    return text

# user_message = "பலத்த மழை மற்றும் பலத்த காற்று இருந்தபோதிலும், உறுதியான மலையேறுபவர்கள் செங்குத்தான மலைப்பாதையில் தங்கள் பயணத்தைத் தொடர்ந்தனர், மூச்சடைக்கக்கூடிய காட்சிகள் மற்றும் நிலப்பரப்பைக் குறிக்கும் காட்டுப்பூக்களின் துடிப்பான வண்ணங்களைக் கண்டு ஆச்சரியப்பட்டனர்."
# src = "en"
# tar = "ta"
# response = get_translation_response(user_message, src, tar)
# print("Response:", response)