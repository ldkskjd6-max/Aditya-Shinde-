import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables (useful for local testing)
load_dotenv()

app = Flask(__name__)

# CORS configuration to allow requests from your GitHub Pages
CORS(app, resources={r"/*": {"origins": "*"}})

# API Key setup
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

# Initialize the model (Updated to gemini-1.5-flash for better stability)
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/ask', methods=['POST'])
def ask():
    try:
        data = request.json
        user_doubt = data.get('question', '')
        
        if not user_doubt:
            return jsonify({'error': 'No question provided'}), 400
        
        # Generate content using Gemini
        response = model.generate_content(user_doubt)
        
        return jsonify({'answer': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def health_check():
    return "AI Backend is running successfully!", 200

if __name__ == '__main__':
    # Use Railway's port or default to 5000
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
    
