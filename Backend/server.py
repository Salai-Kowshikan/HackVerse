from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from services.Explain import explain

load_dotenv()

app = Flask(__name__)

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
    data = request.get_json()
    user_message = data.get('user_message')
    if not user_message:
        return jsonify({"error": "No user_message provided"}), 400
    
    response_text = explain(user_message)
    return jsonify(response_text)

if __name__ == '__main__':
    app.run(debug=True)