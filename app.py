from functools import wraps
from io import BytesIO
import re
from django.test import RequestFactory
from flask import Flask, jsonify, render_template, request, abort
from datetime import date, datetime, timedelta
from pymongo import MongoClient
import base64
import jwt
import hashlib
from bson.objectid import ObjectId

from PIL import Image
import certifi
client = MongoClient('mongodb+srv://@cluster0.qwbpf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', tlsCAFile=certifi.where())


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
    
@app.route('/home')
@authrize
def home(user):
    if user is not None:
        user_id = user.get('id')
        post_list = list(db.posts.find({'user_id' : user_id}))
        for post in post_list:
            post['file'] = list(map(lambda x: x.decode('utf-8'), post['file']))
            post['timestamp'] = (datetime.utcnow() - post['timestamp']).days
            comments = list(db.comment.find({'post_id':str(post['_id'])}, {"_id":0}))
            user_info_comments =[]
            for comment in comments:
                user_dict = db.user.find_one({'_id':ObjectId(comment.get('user_id'))})
                comment_dict = {
                    'nick_name': user_dict.get('nick_name'),
                    'profile_img' : user_dict.get('profile_img'),
                    'comment': comment.get('content'),
                }
                user_info_comments.append(comment_dict)
            post['comment'] = user_info_comments
        return render_template('main.html', posts = post_list)

@app.route('/')
def login_page():
    return render_template('login_page.html')

@app.route('/join_page')
def join_page():   
    return render_template('join_page.html')

@app.route('/edit_page')
@authrize
def edit_page(user):
    if user is not None:
        my_name = db.user.find_one({'_id': ObjectId(user["id"])})
        print(my_name)

        return render_template('edit_page.html', my_name = my_name)

@app.route('/edit_page/updage', methods=['POST'])
@authrize
def update_user(user):
    if user is not None:
        new_nick_name_receive = request.form['new_nick_name_give']
        new_user_name_receive = request.form['new_user_name_give']
        new_email_receive = request.form['new_email_give']

        doc = {
        "email" : new_email_receive,  
        "nick_name" : new_nick_name_receive,  
        "user_name" : new_user_name_receive
        # "profile_img": "static/images/profile_img.png",
        }

        name = ObjectId(user["id"])
        print("name : ",name)
        db.user.update_one({'_id' : name}, {'$set':doc})
        return jsonify({"result" : "success", "msg" : "수정되었습니다!!"})


@app.route('/join_page/sign_up', methods=["POST"])
def check():
    new_id_receive = request.form['new_id_give']
    new_pw_receive = request.form['new_pw_give']
    new_nick_name_receive = request.form['new_nick_name_give']
    new_user_name_receive = request.form['new_user_name_give']
    hashed_password = hashlib.sha256(new_pw_receive.encode('utf-8')).hexdigest()

    doc1 = {
        'email' : new_id_receive
    }
    doc2 = {
        'nick_name' : new_nick_name_receive
    }

    check_id = db.user.find_one(doc1)
    check_nick_name = db.user.find_one(doc2)

    if check_id is None and check_nick_name is None:
        doc3 = {
        "email" : new_id_receive,  
        "password" : hashed_password,  
        "nick_name" : new_nick_name_receive,  
        "user_name" : new_user_name_receive,
        "profile_img": "static/images/profile_img.png",
        }
        db.user.insert_one(doc3)
        return jsonify({"result": "success",'msg' : '회원가입을 축하합니다.','url' : "/login_page"})

    elif check_id is not None:
        return jsonify ({"result": "fail", 'msg': '중복되는 아이디가 있습니다.', 'url' : '/join_page'})
    
    elif check_nick_name is not None:
        return jsonify ({"result": "fail", 'msg': '중복되는 닉네임이 있습니다.', 'url' : '/join_page'})




@app.route('/my_page')
@authrize
def my_page(user):
    if user is not None:
        print("user= ", user)
        my_post = list(db.posts.find({'user_id' : user.get('id')}))
        my_follower = list(db.follower_map.find({'user_id' : user.get('id')}))
        my_follow = list(db.follower_map.find({'target_user_id' : user.get('id')}))
        my_name = db.user.find_one({'_id': ObjectId(user.get('id'))})

       
        count_my_post = len(my_post)
        count_my_follower = len(my_follower)
        count_my_follow = len(my_follow)

        my_profile_dic = {
            "count_my_post" : count_my_post,
            "count_my_follower" : count_my_follower,
            "count_my_follow" : count_my_follow,
            "my_name" : my_name
        }

        for post in my_post:
            post['file'] = list(map(lambda x: x.decode('utf-8'), post['file']))

        return render_template('mypage.html',my_profile_dic = my_profile_dic, my_name = my_name, myposts = my_post)

# 여기는 북마크 게시판

@app.route('/my_page/book_mark')
@authrize
def book_mark_list(user):
    if user is not None:
        book_mark_post = list(db.book_mark.find({'user_id' : user["id"]}))


        for post in book_mark_post:
            post['file'] = list(map(lambda x: x.decode('utf-8'), post['file']))

        return jsonify({"result" : "success", 'post' : book_mark_post})


@app.route('/my_page/tag')
@authrize
def tag_list(user):
    if user is not None:
        
        tag_post = list(db.tag_post_map.find({'user_id' : user["id"]}))
        
        for post in tag_post:
            post['file'] = list(map(lambda x: x.decode('utf-8'), post['file']))

        return jsonify({"result" : "success", 'post' : tag_post})




@app.route('/login',methods=['POST'])
def sign_in():
    email_receive = request.form['email_give']
    pw_receive = request.form['pw_give']
    hashed_pw = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()
    result = db.user.find_one({'email':email_receive, 'password': hashed_pw})

    if result is not None:
        payload = {
            'id' : str(result.get('_id')),
            'nick_name':result.get('nick_name'),
            'exp' : datetime.utcnow() + timedelta(seconds=60 * 60 * 24)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({'result': 'success', 'token': token})
    else:
        return jsonify({'result':'fail', 'msg': '아이디/비밀번호 오류!'})    


@app.route('/posts', methods=['POST'])
@authrize
def post_file(user):
    if user is not None:
        files = request.files.to_dict()
        file_list = []
        for file in files.values():
            extension = file.filename.split('.')[-1]
            format = 'JPEG' if extension.lower() == 'jpg' else extension.upper()
            img = Image.open(file)
            wpercent = (614/ float(img.size[0]))
            h_size = int((float(img.size[1]) * float(wpercent)))
            img_resize = img.resize((614, h_size))
            buffered = BytesIO()
            img_resize.save(buffered, format)
            image_base64 = base64.b64encode(buffered.getvalue())
            file_list.append(image_base64)
        user_id = user.get('id')
        user_nick_name = user.get('nick_name')
        content = request.form['content']
        doc = {
            'user_id': user_id,
            'user_nick_name': user_nick_name,
            'file' : file_list,
            'content': content,
            'timestamp': datetime.utcnow()
        }
        db.posts.insert_one(doc)
        return jsonify({'msg': '저장완료!'})

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
            db.likes.delete_one({
                'user_id': user_id,
                'post_id': post_id_receive
            })
        return jsonify({'result':'success'})      

@app.route('/comment', methods=['POST'])
@authrize
def comment(user):
    if user is not None:
        user_id = user.get('id')
        post_id_receive = request.form['post_id']
        comment_receive = request.form['comment_give']
        doc = {
            'post_id' : post_id_receive,
            'user_id' : user_id,
            'content' : comment_receive,
            'timestamp': datetime.utcnow()
        }
        db.comment.insert_one(doc)
        return jsonify({'result': 'success'})


@app.route('/follow_map', methods=['POST'])
@authrize
def follow(user):
    if user is not None:
        user_id = user.get('id')
        follow_receive = request.form['target_user_id']
        
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
        post_id = request.form['post_id']
        result = db.book_mark.find_one({'user_id': user_id, 'post_id': post_id})
        doc = {
            'user_id': user_id,
            'post_id': post_id,
            'timestamp': datetime.utcnow()
        }
        if result is not None:
            db.book_mark.insert_one(doc)
        else:
            db.book_mark.delete_one({'user_id': user_id, 'post_id': post_id})
        return jsonify({'result':'success'})  

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
