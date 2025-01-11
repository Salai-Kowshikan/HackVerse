from PIL import Image
import pytesseract
import cv2
import numpy as np

def preprocess_image(image_path):
    img = cv2.imread(image_path)
    
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    _, thresh_img = cv2.threshold(gray_img, 150, 255, cv2.THRESH_BINARY)
    
    denoised_img = cv2.fastNlMeansDenoising(thresh_img, None, 30, 7, 21)
    
    resized_img = cv2.resize(denoised_img, None, fx=2, fy=2, interpolation=cv2.INTER_LINEAR)
    
    return resized_img

def extract_text_from_image(image_path):
    preprocessed_img = preprocess_image(image_path)
    
    custom_config = r'--oem 3 --psm 6'
    
    text = pytesseract.image_to_string(preprocessed_img, config=custom_config)
    
    return text

if __name__ == "__main__":
    pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
    
    image_path = 'Backend\\test2.jpg'
    
    extracted_text = extract_text_from_image(image_path)
    
    print("Extracted Text:\n", extracted_text)
