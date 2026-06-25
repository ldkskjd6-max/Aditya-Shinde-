import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
app = Flask(__name__)

# CORS configuration to allow requests from your GitHub Pages
CORS(app, resources={r"/*": {"origins": "*"}})

API_KEY = os.getenv("GEMINI_API_KEY")

# Updated explicitly to the latest stable gemini-2.0-flash via REST API
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

@app.route('/ask', methods=['POST'])
def ask():
    try:
        data = request.json
        user_doubt = data.get('question', '')
        
        if not user_doubt:
            return jsonify({'error': 'No question provided'}), 400
        
        # Direct JSON payload for Google API
        payload = {
            "contents": [{"parts": [{"text": user_doubt}]}]
        }
        
        headers = {'Content-Type': 'application/json'}
        response = requests.post(GEMINI_URL, json=payload, headers=headers)
        response_data = response.json()
        
        # Checking if Google sent a success response
        if response.status_code == 200:
            answer = response_data['candidates'][0]['content']['parts'][0]['text']
            return jsonify({'answer': answer})
        else:
            return jsonify({'error': str(response_data.get('error', 'API Error'))}), response.status_code
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def health_check():
    return "AI Backend is running on Direct REST API with Gemini 2.0!", 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
    
