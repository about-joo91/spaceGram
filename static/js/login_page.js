function sign_in() {
    login_id = $('#login_id').val();
    login_pw = $('#login_pw').val();

    $.ajax({
        type : 'POST',
        url : '/login_page/login',
        data : {
            email_give : login_id,
            pw_give : login_pw
        },
        success: function(response){
            if(response['result'] == 'success'){
                $.cookie('mytoken', response['token'], {path: '/'});
                window.location.replace('/')
            } else {
                alert(response['msg'])
            }
        }
    });
}

// const lp_s_b_li_s_btn_blue = document.querySelector('.lp_s_b_li_s_btn_blue');

// lp_s_b_li_s_btn_blue.addEventListener('click',sign_in)

const lp_s_b_li_s_btn_blue = document.querySelector('.lp_s_b_li_s_btn_blue');

lp_s_b_li_s_btn_blue.addEventListener('click',sign_in)