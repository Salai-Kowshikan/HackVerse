import requests
import time
from dotenv import load_dotenv
import os
import cv2
import numpy as np
import base64

load_dotenv()

subscription_key = os.getenv("SUBSCRIPTION_KEY")
endpoint = os.getenv("ENDPOINT")
ocr_url = endpoint + "/vision/v3.2/read/analyze"

def textract(image_path):
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

def crop_largest_rectangle(image_path):
    image = cv2.imread(image_path)
    _, buffer = cv2.imencode('.jpg', image)
    image_base64 = base64.b64encode(buffer).decode('utf-8')
    return image_base64

if __name__ == "__main__":
    image_path = 'Backend\\test3.jpg'
    result = textract(image_path)
    extracted_text = extract_text(result)
    print("Extracted Text:\n", extracted_text)
    
    cropped_image_base64 = crop_largest_rectangle(image_path)
    print("Cropped Image Base64:\n", cropped_image_base64)