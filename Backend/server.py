from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import tempfile
from services.Explain import explain
from services.Translate import translate
from services.Textract import textract, extract_text, crop_largest_rectangle

load_dotenv()

app = Flask(__name__)
CORS(app)

mongo_connection_string = os.getenv('MONGO_CONNECTION_STRING')
if not mongo_connection_string:
    raise ValueError("No MongoDB connection string found in environment variables")

client = MongoClient(mongo_connection_string)
db = client['Records']

print("Connected to MongoDB")

@app.route('/')
def home():
    return "Brotatoes for the win!"

@app.route('/explain', methods=['POST'])
def explain_route():
    print("data send")
    data = request.get_json()
    user_message = data.get('user_message')
    if not user_message:
        return jsonify({"error": "No user_message provided"}), 400
    
    response_text = explain(user_message)
    return jsonify({"response": response_text})

@app.route('/translate', methods=['POST'])
def translate_route():
    data = request.get_json()
    source = data.get('source')
    target = data.get('target')
    text = data.get('text')
    print("Source:", source)
    print("Target:", target)
    print("Text:", text)
    if not source or not target or not text:
        return jsonify({"error": "source, target, and text must be provided"}), 400
    
    translated_text = translate(text, source, target)
    return jsonify(translated_text)

@app.route('/extract', methods=['POST'])
def extract_route():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    image_file = request.files['image']
    title = request.form.get('title')
    category = request.form.get('category')
    
    if not title or not category:
        return jsonify({"error": "title and category must be provided"}), 400
    
    print("Working on textract")
    
    with tempfile.TemporaryDirectory() as tmpdirname:
        image_path = os.path.join(tmpdirname, image_file.filename)
        image_file.save(image_path)
        
        try:
            result = textract(image_path)
            extracted_text = extract_text(result)
            cropped_image_base64 = crop_largest_rectangle(image_path)
            
            record = {
                "title": title,
                "category": category,
                "text": extracted_text,
                "image": cropped_image_base64
            }
            db['Records'].insert_one(record)
            print("textract completed")
            return
        except Exception as e:
            return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)