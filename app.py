from functools import wraps
from flask import Flask, jsonify, render_template, request, abort
import datetime
from pymongo import MongoClient
import base64
import jwt
import hashlib
client = MongoClient('mongodb+srv://test:sparta@cluster0.qwbpf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

SECRET_KEY = 'spaceGram'
db = client.dbsparta

app = Flask(__name__)

def authrize(f):
    @wraps(f)
    def decorated_function(*args, **kws):
        if 'myToken' not in request.cookies:
            abort(401)
        user = None
        token = request.cookies['myToken']
        try:
            user = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except:
            abort(401)
        return f(user, *args, **kws)
    return decorated_function
    
@app.route('/')
def home():
    return render_template('main.html')


@app.route('/my_page')
@authrize
def my_page(user):
    if user is not None:
        return render_template('mypage.html')

@app.route('/posts', methods=['POST'])
@authrize
def post_file(user):
    if user is not None:
        user_id = user.get('id')
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
