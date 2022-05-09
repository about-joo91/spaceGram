from crypt import methods
from functools import wraps
from bson import encode
from flask import Flask, jsonify, render_template, request, abort
from datetime import datetime, timedelta
from pymongo import MongoClient
import base64
import jwt
import hashlib

from regex import P
client = MongoClient('mongodb+srv://@cluster0.qwbpf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

SECRET_KEY = 'spaceGram'
db = client.dbsparta

app = Flask(__name__)

def authrize(f):
    @wraps(f)
    def decorated_function(*args, **kws):
        if not 'mytoken' in request.cookies:
            abort(401)
        user = None
        token = request.cookies['mytoken']
        try:
            user = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except:
            abort(401)
        return f(user, *args, **kws)
    return decorated_function

# get 방식으로 db에 저장된 좋아요 숫자(<- user_id 숫자로 받아옴), name 받아옴 
# post 방식으로 하트 누르면 db에 해당 posts의 posts_like_id로 저장됨 
# post_id(클릭한 하트의 특정한 post에 아이디를 받아와서 저장), timestamp 저장 useer_id는 토큰을 받아와서 저장 
# 일단은 저장되는것 까지 

# 누른다 -> 눌러져있는지 확인한다
# -> 1. 눌러져있다. like table에 추가한다.
# -> 2. 아니다. like table에서 지운다. 
# 쿠키 user, user.get("id")

@app.route('/like', methods=['POST'])
@authrize
def likes(user):
    if user is not None:
        user_id = user.get('id')
        post_id_receive = request.form['post_id']
        action_receive = request.form['action_give']
        doc = {
            'user_id': user_id,
            'post_id' : post_id_receive,
            'timestamp': datetime.utcnow()
        }
        if action_receive == 'like':
            db.likes.insert_one(doc)
        else:
            db.likes.delete_one(doc)
        return jsonify({'result':'success'})      

