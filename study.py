from functools import wraps
from io import BytesIO
from flask import Flask, jsonify, render_template, request, abort
from datetime import datetime, timedelta
from pymongo import MongoClient
import base64
import jwt
import hashlib

from PIL import Image
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

# 팔로우 수 늘리기 
# 팔로우 버튼을 누르면 

# 게시물 마우스 갖다대면 

# 프로필 수정 페이지 만들기, api까지 입혀보기 (타임어택)

# jinja2 활용해서 메인페이지에 뿌리기 숙제 

#머신러닝 강의 좀 듣기 

# 내일 목표 -> 최종 발표 (기능 숙지 수요일 발표자료 만들기 )


@app.route('/follow_map', methods=['POST'])
@authrize
def follow(user):
    if user is not None:
        user_id = user.get('id')
        follow_receive = request.form['target_user_id']
        #
        doc = {
            'user_id': user_id,
            'target_user_id': follow_receive,
            'timestamp': datetime.utcnow()
        }
        check_follow = db.user.find_one({'user_id':user_id, 'target_user_id':follow_receive})

        if check_follow is None :
            db.follower_map.insert_one(doc)

        else:
            db.follower_map.delete_one({'user_id':user_id, 'target_user_id':follow_receive})

        return jsonify({'result':'success'})



# 북마크 
@app.route('/mypage/book_mark', methods=['POST'])
@authrize
def bookmark(user):
    if user is not None:
        user_id = user.get('_id'),
        book_mark_id = request.form['book_mark_id']
        post_id = request.form['post_id']
        result = db.book_mark.find_one({'book_mark_id':book_mark_id, 'user_id': user_id, 'post_id': post_id})
        doc = {
            'user_id': user_id,
            'book_mark_id': book_mark_id,
            'timestamp': datetime.utcnow()
        }
        if result is not None:
            db.book_mark.insert_one({'book_mark_id':book_mark_id, 'user_id': user_id, 'post_id': post_id})
        else:
            db.book_mark.delete_one({'book_mark_id':book_mark_id, 'user_id': user_id, 'post_id': post_id})
        return jsonify({'result':'success'})  
