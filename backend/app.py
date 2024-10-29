import os
from flask import Flask, request, jsonify
import requests, json
from flask_cors import CORS
from script2 import Script
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": os.getenv('CORS_ORIGIN')}})

@app.route('/api/comments', methods=['POST'])
def get_comments():
    data = request.get_json()
    post_url = data.get('post_url')

    script = Script(post_url)

    comments = script.getComments()

    # comments = ["comment 1", "comment 2"]

    return jsonify({'comments': comments})

if __name__ == '__main__' :
    app.run(debug=True, port=os.getenv('PORT'))