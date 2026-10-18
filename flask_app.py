import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
app = Flask(__name__)

# CORS setup for frontend communication
CORS(app, resources={r"/*": {"origins": "*"}})

# Fetching the fresh Gemini API Key
API_KEY = os.getenv("GEMINI_API_KEY")

# Primary model gemini-3.0-flash with automatic fallback to gemini-flash-latest
MODELS_TO_TRY = [
    "gemini-3.0-flash",
    "gemini-flash-latest",
    "gemini-3.0-pro"
]

@app.route('/ask', methods=['POST'])
def ask():
    try:
        data = request.json
        user_doubt = data.get('question', '')
        
        if not user_doubt:
            return jsonify({'error': 'No question provided'}), 400
            
        if not API_KEY:
            return jsonify({'error': 'Gemini API Key is missing on the server!'}), 500
        
        payload = {
            "contents": [{"parts": [{"text": user_doubt}]}]
        }
        headers = {'Content-Type': 'application/json'}
        
        last_error = None
        for model_name in MODELS_TO_TRY:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={API_KEY}"
            response = requests.post(url, json=payload, headers=headers)
            response_data = response.json()
            
            if response.status_code == 200:
                answer = response_data['candidates'][0]['content']['parts'][0]['text']
                return jsonify({'answer': answer})
            else:
                last_error = response_data.get('error', 'API Error')
                # Agar model naam ki wajah se 404 aaye toh agla model try karo
                if response.status_code == 404:
                    continue
                else:
                    return jsonify({'error': str(last_error)}), response.status_code
        
        return jsonify({'error': str(last_error)}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def health_check():
    return "AI Backend is running smoothly on Gemini 3.0 Flash!", 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
    
