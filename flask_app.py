import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
app = Flask(__name__)

# CORS setup
CORS(app, resources={r"/*": {"origins": "*"}})

# Fetching OpenRouter API Key
API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

@app.route('/ask', methods=['POST'])
def ask():
    try:
        data = request.json
        user_doubt = data.get('question', '')
        
        if not user_doubt:
            return jsonify({'error': 'No question provided'}), 400
            
        if not API_KEY:
            return jsonify({'error': 'OpenRouter API Key is missing on the server!'}), 500
        
        # Switched to the ultra-stable, permanently free LLaMA-3 model
        payload = {
            "model": "meta-llama/llama-3-8b-instruct:free",
            "messages": [
                {"role": "system", "content": "You are a highly logical AI study assistant. Explain concepts step-by-step using first principles."},
                {"role": "user", "content": user_doubt}
            ]
        }
        
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {API_KEY}',
            'HTTP-Referer': 'https://ldkskjd6-max.github.io', # Required by OpenRouter
            'X-Title': 'AI Doubt Solver' # Required by OpenRouter
        }
        
        response = requests.post(OPENROUTER_URL, json=payload, headers=headers)
        response_data = response.json()
        
        if response.status_code == 200:
            # OpenRouter standard OpenAI-like response parsing
            answer = response_data['choices'][0]['message']['content']
            return jsonify({'answer': answer})
        else:
            return jsonify({'error': str(response_data)}), response.status_code
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def health_check():
    return "AI Backend is running smoothly on OpenRouter LLaMA-3!", 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
    
