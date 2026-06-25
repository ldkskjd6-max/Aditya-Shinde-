import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Now fetching from the Groq variable
API_KEY = os.getenv("GROQ_API_KEY")

# Groq's OpenAI-compatible endpoint
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

@app.route('/ask', methods=['POST'])
def ask():
    try:
        data = request.json
        user_doubt = data.get('question', '')
        
        if not user_doubt:
            return jsonify({'error': 'No question provided'}), 400
            
        if not API_KEY:
            return jsonify({'error': 'Groq API Key is missing on the server!'}), 500
        
        # Using Meta's powerful LLaMA 3 model hosted on Groq
        payload = {
            "model": "llama3-8b-8192",
            "messages": [
                {"role": "system", "content": "You are a highly logical and conceptual AI study assistant. Explain concepts step-by-step."},
                {"role": "user", "content": user_doubt}
            ]
        }
        
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {API_KEY}'
        }
        
        response = requests.post(GROQ_URL, json=payload, headers=headers)
        response_data = response.json()
        
        # Success check
        if response.status_code == 200:
            answer = response_data['choices'][0]['message']['content']
            return jsonify({'answer': answer})
        else:
            return jsonify({'error': str(response_data)}), response.status_code
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def health_check():
    return "AI Backend is running smoothly on Groq LPU!", 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
    
