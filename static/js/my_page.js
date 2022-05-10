$("#mp_pimg_hb_cf_post").addClass("is_highlight")

           

//모달을 구성할 때 받아오는 값들을 변수에 저장
const body = document.querySelector('body');
const modal = document.querySelector('.mp_modal');
const btnOpenPopup = document.querySelector('.mp_mp_mt_top_option');
const closePopup = document.querySelector('.mp_md_exit');


//옆의 톱니바퀴를 누르면 모달이 열리는 창 구현
btnOpenPopup.addEventListener('click', function () {
    modal.classList.toggle('show');
    if (modal.classList.contains('show')) {
        body.style.overflow = 'hidden';
    }
});
modal.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.classList.toggle('show');
        if (!modal.classList.contains('show')) {
            body.style.overflow = 'auto';

        }
    }
    if (event.target === closePopup) {
        modal.classList.toggle('show');
        body.style.overflow = 'auto';
    }
});


document.querySelector('.mp_pimg_hb_cf_post').addEventListener('click',function(){my_post_list()})

function my_post_list(){
    window.location.reload('/my_page')
}

document.querySelector('.mp_pimg_hb_cf_bookmark').addEventListener('click',function(){book_mark_list()})

function book_mark_list(){

    $.ajax({
        type: "GET",
        url: "/my_page/book_mark",
        data: {
        },
        success: function (response) {
            console.log("success")
            $('#mp_pimg_posts').empty()
            let post = response['post'];
            console.log(post)
            for (var w = 0; w < post.length; w++){
                temp_html = `
            <div class="mp_pimg_pts_pl_post" style="background-image : url('data:image/png;base64,${post[w][0]}"></div>
            `
            $('#mp_pimg_posts').append(temp_html);
            }
            
            $("#mp_pimg_hb_cf_post").removeClass("")
            $("#mp_pimg_hb_cf_post").addClass("is_none")
            $("#mp_pimg_hb_cf_bookmark").removeClass("")
            $("#mp_pimg_hb_cf_bookmark").removeClass("is_none")
            $("#mp_pimg_hb_cf_bookmark").addClass("is_highlight")
            $("#mp_pimg_hb_cf_taged").removeClass("")
            $("#mp_pimg_hb_cf_taged").addClass("is_none")
        }
    });
}

document.querySelector('.mp_pimg_hb_cf_taged').addEventListener('click',function(){tag_list()})

function tag_list(){
    $.ajax({
        type: "GET",
        url: "/my_page/tag",
        data: {
        },
        success: function (response) {
            $('#mp_pimg_posts').empty()
            let post = response['post'];
            console.log(post)
            for (var w = 0; w < post.length; w++){
                temp_html = `
            <div class="mp_pimg_pts_pl_post" style="background-image : url('data:image/png;base64,${post[w][0]}"></div>
            `
            $('#mp_pimg_posts').append(temp_html);
            }
            $("#mp_pimg_hb_cf_post").removeClass("")
            $("#mp_pimg_hb_cf_post").addClass("is_none")
            $("#mp_pimg_hb_cf_bookmark").removeClass("")
            $("#mp_pimg_hb_cf_bookmark").addClass("is_none")
            $("#mp_pimg_hb_cf_taged").removeClass("")
            $("#mp_pimg_hb_cf_taged").removeClass("is_none")
            $("#mp_pimg_hb_cf_taged").addClass("is_highlight")
        }
    });

}
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
document.querySelector('.mp_mp_mt_top_ep_button').addEventListener('click', function(){
    edit_page()
})
function edit_page(){
    window.location.replace('/edit_page') 
}