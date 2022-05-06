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

//여기는 게시물, 저장됨, 태그됨 버튼을 누를 경우 생기는 동작
function mypost() {
        //누를 때 마다 게시물이 바뀌게
        document.getElementById("mp_pimg_posts").style.display = "block";
        document.getElementById("mp_pimg_bookmarks").style.display = "none";
        document.getElementById("mp_pimg_taged").style.display = "none";
        //누를 때 마다 굵기, 상단에 줄 생기게
        document.getElementById("mp_pimg_hb_cf_post").style.fontWeight = "bold";
        document.getElementById("mp_pimg_hb_cf_post").style.borderTop="1px solid black"
        document.getElementById("mp_pimg_hb_cf_bookmark").style.fontWeight = "normal";
        document.getElementById("mp_pimg_hb_cf_bookmark").style.borderTop = "none";
        document.getElementById("mp_pimg_hb_cf_taged").style.fontWeight = "normal";
        document.getElementById("mp_pimg_hb_cf_taged").style.borderTop = "none";

    }
    function bookmarkpost() {
        document.getElementById("mp_pimg_posts").style.display = "none";
        document.getElementById("mp_pimg_bookmarks").style.display = "block";
        document.getElementById("mp_pimg_taged").style.display = "none";
        document.getElementById("mp_pimg_hb_cf_post").style.fontWeight = "normal";
        document.getElementById("mp_pimg_hb_cf_post").style.borderTop="none"
        document.getElementById("mp_pimg_hb_cf_bookmark").style.fontWeight = "bold";
        document.getElementById("mp_pimg_hb_cf_bookmark").style.borderTop = "0.5px solid black"
        document.getElementById("mp_pimg_hb_cf_taged").style.fontWeight = "normal";
        document.getElementById("mp_pimg_hb_cf_taged").style.borderTop = "none"

    }

    function tagedpost() {
        document.getElementById("mp_pimg_posts").style.display = "none";
        document.getElementById("mp_pimg_bookmarks").style.display = "none";
        document.getElementById("mp_pimg_taged").style.display = "block";
        document.getElementById("mp_pimg_hb_cf_post").style.fontWeight = "normal";
        document.getElementById("mp_pimg_hb_cf_post").style.borderTop = "none";
        document.getElementById("mp_pimg_hb_cf_bookmark").style.fontWeight = "normal";
        document.getElementById("mp_pimg_hb_cf_bookmark").style.borderTop = "none";
        document.getElementById("mp_pimg_hb_cf_taged").style.fontWeight = "bold";
        document.getElementById("mp_pimg_hb_cf_taged").style.borderTop = "0.5px solid black";
    }