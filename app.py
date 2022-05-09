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
    
@app.route('/')
@authrize
def home(user):
    if user is not None:
        user_id = user.get('id')
        post_list = list(db.posts.find({'user_id' : user_id}))
        for post in post_list:
            post['file'] = post['file'].decode('utf-8')
        return render_template('main.html', posts = post_list)

@app.route('/login_page')
def login_page():
    return render_template('login_page.html')

@app.route('/my_page')
@authrize
def my_page(user):
    if user is not None:
        return render_template('mypage.html')

@app.route('/login_page/login',methods=['POST'])
def sign_in():
    email_receive = request.form['email_give']
    pw_receive = request.form['pw_give']
    hashed_pw = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()
    result = db.user.find_one({'email':email_receive, 'password': hashed_pw})

    if result is not None:
        payload = {
            'id' : str(result.get('_id')),
            'email':email_receive,
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
        user_id = user.get('id')
        user_email = user.get('email')
        file = request.files['img']
        extension = file.filename.split('.')[-1]
        format = 'JPEG' if extension.lower() == 'jpg' else extension.upper()
        img = Image.open(file)
        wpercent = (614/ float(img.size[0]))
        h_size = int((float(img.size[1]) * float(wpercent)))
        img_resize = img.resize((614, h_size))
        buffered = BytesIO()
        img_resize.save(buffered, format)
        image_base64 = base64.b64encode(buffered.getvalue())
        content = request.form['content']
        doc = {
            'user_id': user_id,
            'user_email': user_email,
            'file' : image_base64,
            'content': content,
            'timestamp': datetime.utcnow()
        }
        db.posts.insert_one(doc)
        return jsonify({'msg': '저장완료!'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
