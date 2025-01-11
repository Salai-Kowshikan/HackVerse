import cv2
import numpy as np
import easyocr

def preprocess_image(image):
    gray_img = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, thresh_img = cv2.threshold(gray_img, 150, 255, cv2.THRESH_BINARY)
    denoised_img = cv2.fastNlMeansDenoising(thresh_img, None, 30, 7, 21)
    resized_img = cv2.resize(denoised_img, None, fx=2, fy=2, interpolation=cv2.INTER_LINEAR)
    return resized_img

def extract_text_from_image(image):
    reader = easyocr.Reader(['en'])
    preprocessed_img = preprocess_image(image)
    text = reader.readtext(preprocessed_img, detail=0)
    return " ".join(text)

def process_image(image_path, output_dir="./"):
    image = cv2.imread(image_path)
    if image is None:
        raise FileNotFoundError("The image file was not found. Please check the file path.")
    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY_INV)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
    dilated = cv2.dilate(thresh, kernel, iterations=2)
    
    contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    largest_rect = None
    largest_area = 0

    for contour in contours:
        approx = cv2.approxPolyDP(contour, 0.02 * cv2.arcLength(contour, True), True)
        if len(approx) == 4:
            x, y, w, h = cv2.boundingRect(approx)
            area = w * h
            if area > largest_area:
                largest_area = area
                largest_rect = (x, y, w, h)

    if largest_rect:
        x, y, w, h = largest_rect
        diagram_image = image[y:y+h, x:x+w]
        text_above = image[:y, :]
        text_below = image[y+h:, :]

        cv2.imwrite(f"{output_dir}/diagram.jpg", diagram_image)
        cv2.imwrite(f"{output_dir}/text_above.jpg", text_above)
        cv2.imwrite(f"{output_dir}/text_below.jpg", text_below)

        print("Cropped images saved successfully:")
        print(f"Diagram: {output_dir}/diagram.jpg")
        print(f"Text Above: {output_dir}/text_above.jpg")
        print(f"Text Below: {output_dir}/text_below.jpg")

        # Extract text from text_above and text_below
        text_above_content = extract_text_from_image(text_above)
        text_below_content = extract_text_from_image(text_below)

        print("Extracted Text Above:\n", text_above_content)
        print("Extracted Text Below:\n", text_below_content)
    else:
        print("No rectangular boundary detected.")

# Example usage
if __name__ == "__main__":
    process_image("test.jpg")