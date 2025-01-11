from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
import os
import tempfile
from services.Explain import explain
from services.Translate import translate
from services.Textract import textract, extract_text, crop_largest_rectangle
from services.Recommendation import recommend
from services.SpellCheck import check

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

@app.route('/recommend', methods=['POST'])
def recommend_route():
    print("data send")
    data = request.get_json()
    user_message = data.get('user_message')
    if not user_message:
        return jsonify({"error": "No user_message provided"}), 400
    
    response_text = recommend(user_message)
    return jsonify({"response": response_text})

@app.route('/check', methods=['POST'])
def check_route():
    print("data send")
    data = request.get_json()
    user_message = data.get('user_message')
    if not user_message:
        return jsonify({"error": "No user_message provided"}), 400
    
    response_text = check(user_message)
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
            print("textract completed")
            db['Records'].insert_one(record)
            return jsonify({"success": True})
        except Exception as e:
            return jsonify({"error": str(e)}), 500

@app.route('/records', methods=['GET'])
def get_records():
    records = list(db['Records'].find())
    for record in records:
        record['_id'] = str(record['_id']) 
        if 'image' in record:
            del record['image'] 
    return jsonify(records)

@app.route('/record/<record_id>', methods=['GET'])
def get_record(record_id):
    try:
        record = db['Records'].find_one({"_id": ObjectId(record_id)})
        if record:
            record['_id'] = str(record['_id'])
            return jsonify(record)
        else:
            return jsonify({"error": "Record not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/noteUpdate/<record_id>', methods=['PUT'])
def update_note(record_id):
    data = request.get_json()
    new_text = data.get('text')
    if not new_text:
        return jsonify({"error": "No text provided"}), 400
    
    try:
        result = db['Records'].update_one(
            {"_id": ObjectId(record_id)},
            {"$set": {"text": new_text}}
        )
        if result.matched_count == 0:
            return jsonify({"error": "Record not found"}), 404
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.config['DEBUG'] = False
    app.run(host='0.0.0.0', port=5000)