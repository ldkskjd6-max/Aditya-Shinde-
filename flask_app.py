import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
app = Flask(__name__)

# CORS configuration
CORS(app, resources={r"/*": {"origins": "*"}})

# DeepSeek API Key from Railway Environment Variables
API_KEY = os.getenv("DEEPSEEK_API_KEY")

# DeepSeek Chat Completions Endpoint
DEEPSEEK_URL = "https://api.deepseek.com/chat/completions"

@app.route('/ask', methods=['POST'])
def ask():
    try:
        data = request.json
        user_doubt = data.get('question', '')
        
        if not user_doubt:
            return jsonify({'error': 'No question provided'}), 400
            
        if not API_KEY:
            return jsonify({'error': 'DeepSeek API Key is missing on the server!'}), 500
        
        # Standard Payload structure for DeepSeek (OpenAI compatible)
        payload = {
            "model": "deepseek-chat",
            "messages": [
                {"role": "system", "content": "You are a highly logical and conceptual AI study assistant. Explain concepts step-by-step."},
                {"role": "user", "content": user_doubt}
            ]
        }
        
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {API_KEY}'
        }
        
        response = requests.post(DEEPSEEK_URL, json=payload, headers=headers)
        response_data = response.json()
        
        # Checking for successful response
        if response.status_code == 200:
            answer = response_data['choices'][0]['message']['content']
            return jsonify({'answer': answer})
        else:
            return jsonify({'error': str(response_data)}), response.status_code
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def health_check():
    return "AI Backend is running smoothly on DeepSeek API!", 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
    
