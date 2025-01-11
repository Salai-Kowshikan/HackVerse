import cv2
import numpy as np

def process_image(image_path, output_dir="./"):
    image = cv2.imread(image_path)
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
    else:
        print("No rectangular boundary detected.")

# Example usage
process_image("test.jpg")
