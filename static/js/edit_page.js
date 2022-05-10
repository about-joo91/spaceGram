// 프로필 모달 버튼!!
document.querySelector('.mh_circle_avatar').addEventListener('click', function(){
    open_profile_modal()
})
function open_profile_modal(){
    document.querySelector('.profile_modal').style.display = "block";
}

document.querySelector('.pm_my_page').addEventListener('click', function(){
    open_my_page()})
function open_my_page(){
    window.location.replace('/my_page')
}
document.querySelector('.pm_book_mark').addEventListener('click', function(){
    open_booK_mark()})
    // 만약 여기서 오류가 생긴다면, my_page를 먼저 불러오고 함수를 실행해야 함
function open_booK_mark(){
    if (window.location.href == '/my_page'){
        book_mark_list()
    }
    else {
        window.location.replace('/my_page')
        
    }
}
document.querySelector('.summit').addEventListener('click', function(){
    update_user()
})

function update_user(){
    let new_user_name = $('#new_user_name').val()
    let new_nick_name = $('#new_nick_name').val()
    let new_email = $('#new_email').val()

    $.ajax({
        type: "POST",
        url: "/edit_page/updage",
        data: {
            new_nick_name_give : new_nick_name,
            new_user_name_give : new_user_name,
            new_email_give : new_email
        },
        success: function (response) {
            alert(response['msg'])
            window.location.replace('/my_page')
        }
    });


}