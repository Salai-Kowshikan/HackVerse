import cv2
import pytesseract
import numpy as np
import os

# Specify the Tesseract executable path
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Load the image
image_path = 'Backend/services/test.jpg'
image = cv2.imread(image_path)

# Convert the image to grayscale
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Use OpenCV to find contours (diagrams and text)
ret, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY_INV)
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Function to classify contours
def classify_contour(contour):
    x, y, w, h = cv2.boundingRect(contour)
    aspect_ratio = w / float(h)
    if aspect_ratio > 1.5:  # Example threshold for diagrams
        return 'diagram'
    else:
        return 'text'

# Classify and sort contours
sections = []
for contour in contours:
    x, y, w, h = cv2.boundingRect(contour)
    section_type = classify_contour(contour)
    sections.append((x, y, w, h, section_type))

# Sort sections by their y-coordinate to maintain order
sections.sort(key=lambda s: s[1])

# Create output directory
output_dir = 'output_sections'
os.makedirs(output_dir, exist_ok=True)

# Crop and save sections
for i, (x, y, w, h, section_type) in enumerate(sections):
    section_image = image[y:y+h, x:x+w]
    section_filename = f'{output_dir}/section_{i+1}_{section_type}.jpg'
    cv2.imwrite(section_filename, section_image)

print("Sections saved successfully.")