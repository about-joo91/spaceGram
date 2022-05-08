
from flask import Flask, jsonify, render_template, request
import datetime
from pymongo import MongoClient
import base64
from PIL import Image
import hashlib
client = MongoClient('mongodb+srv://test:sparta@cluster0.qwbpf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

db = client.dbsparta

app = Flask(__name__)
ab = hashlib.sha256('1234'.encode('utf-8')).hexdigest()
print(ab)
@app.route('/')
def home():
    return render_template('main.html')


@app.route('/my_page')
def my_page():
    return render_template('mypage.html')

@app.route('/posts', methods=['POST'])
def post_file():
    user_id = ''
    files = request.files['img']
    content = request.form['content']
    image_base64 = base64.b64encode(files.read())
    doc = {
        'user_id': user_id,
        'file' : image_base64,
        'content': content,
        'timestamp': datetime.datetime.utcnow()
    }
    db.posts.insert_one(doc)
    return jsonify({'msg': '저장완료!'})
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
