import requests
import time
from dotenv import load_dotenv
import os

load_dotenv()


subscription_key = os.getenv("SUBSCRIPTION_KEY")
endpoint = os.getenv("ENDPOINT")
ocr_url = endpoint + "/vision/v3.2/read/analyze"

def recognize_text_azure(image_path):
    headers = {
        'Ocp-Apim-Subscription-Key': subscription_key,
        'Content-Type': 'application/octet-stream'
    }

    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()

    response = requests.post(ocr_url, headers=headers, data=image_data)

    if response.status_code != 202:
        raise Exception(f"Failed to connect: {response.text}")

    operation_location = response.headers['Operation-Location']

    result = None
    while True:
        response = requests.get(operation_location, headers={'Ocp-Apim-Subscription-Key': subscription_key})
        result = response.json()

        if 'status' in result and result['status'] == 'succeeded':
            break
        elif 'status' in result and result['status'] == 'failed':
            raise Exception("Text recognition failed")

        time.sleep(1)

    return result

def extract_text(result):
    text = []
    if 'analyzeResult' in result:
        for read_result in result['analyzeResult']['readResults']:
            for line in read_result['lines']:
                text.append(line['text'])
    return "\n".join(text)

if __name__ == "__main__":
    image_path = 'Backend\\test3.jpg'
    result = recognize_text_azure(image_path)
    extracted_text = extract_text(result)
    
    print("Extracted Text:\n", extracted_text)
