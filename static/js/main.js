const story_box_wrapper = document.querySelector('.mb_l_story_box_wrapper');
let story_box_width = 90;
let story_boxes_cnt = document.querySelectorAll('.mb_l_sbw_sp_sb_content').length;
story_box_wrapper.style.width = (story_box_width * story_boxes_cnt) + "px";
const mb_l_sb_btn_prev = document.querySelector('.mb_l_sbw_sp_sb_btn_prev');
const mb_l_sb_btn_next = document.querySelector('.mb_l_sbw_sp_sb_btn_next');
const mb_l_sb = document.querySelector('.mb_l_sbw_sp_sb')
let cur_idx_for_story_carousel = 0
let last_page = parseInt((story_box_width * story_boxes_cnt) / 315) - 1
if (last_page >= 1) {
    mb_l_sb_btn_next.style.visibility = 'visible'
}
mb_l_sb_btn_next.addEventListener('click', function () {
    mb_l_sb_btn_prev.style.visibility = 'visible'
    mb_l_sb.style.transition = 500 + 'ms'
    if (++cur_idx_for_story_carousel == last_page) {
        mb_l_sb_btn_next.style.visibility = 'hidden'
        mb_l_sb.style.transform = "translate3d(-" + ((story_box_width * story_boxes_cnt) - 615) + "px,0px,0px)"
    }
    else {
        mb_l_sb.style.transform = "translate3d(-" + (cur_idx_for_story_carousel * 307) + "px,0px,0px)"
    }
})
mb_l_sb_btn_prev.addEventListener('click', function () {
    mb_l_sb_btn_next.style.visibility = 'visible'
    mb_l_sb.style.transition = 500 + 'ms'
    if (--cur_idx_for_story_carousel == 0) {
        mb_l_sb_btn_prev.style.visibility = 'hidden'
        mb_l_sb.style.transform = "translate3d(-" + (cur_idx_for_story_carousel * 307) + "px, 0px, 0px)"
    }
    else {
        mb_l_sb.style.transform = "translate3d(-" + (cur_idx_for_story_carousel * 307) + "px, 0px, 0px)"
    }
})

image_list = [
    "pretty_image.jpg",
    "flower.jpg"
]
let length_of_image = image_list.length
const mb_l_mc_mi_carousel = document.querySelector('.mb_l_mc_mib_carousel');
mb_l_mc_mi_carousel.style.width = (615 * length_of_image) + "px";
for (let i = 0; i < image_list.length; i++) {
    image_html = `<img class="mb_l_mc_mi_c_img" src = "/static/images/${image_list[i]}">`;
    mb_l_mc_mi_carousel.innerHTML += image_html
}
const mb_l_mc_mib_btn_prev = document.querySelector('.mb_l_mc_mib_btn_prev');
const mb_l_mc_mib_btn_next = document.querySelector('.mb_l_mc_mib_btn_next');
let cur_idx_for_main_carousel = 0;
if (length_of_image >= 1) {
    mb_l_mc_mib_btn_next.style.visibility = 'visible';
}
mb_l_mc_mib_btn_prev.addEventListener('click', function () {
    if (--cur_idx_for_main_carousel == 0) {
        mb_l_mc_mib_btn_prev.style.visibility = 'hidden';
    }
    mb_l_mc_mib_btn_next.style.visibility = 'visible';
    mb_l_mc_mi_carousel.style.transition = 500 + "ms";
    mb_l_mc_mi_carousel.style.transform = "translate3d(-" + cur_idx_for_main_carousel * 615 + "px, 0px,0px)";


})
mb_l_mc_mib_btn_next.addEventListener('click', function () {
    if (++cur_idx_for_main_carousel == length_of_image - 1) {
        mb_l_mc_mib_btn_next.style.visibility = 'hidden';
    }
    mb_l_mc_mib_btn_prev.style.visibility = 'visible'
    mb_l_mc_mi_carousel.style.transition = 500 + "ms";
    mb_l_mc_mi_carousel.style.transform = "translate3d(-" + cur_idx_for_main_carousel * 615 + "px,0px,0px)";
})


const mh_circle_avatar = document.querySelector('.mh_circle_avatar')

mh_circle_avatar.addEventListener('click', function () {
    window.location.href = '/my_page'
})

const small_modal_wrapper = document.querySelector('.small_modal_wrapper');
const small_modal_body = document.querySelector('.sm_w_body');
let modal_left_now = parseInt((window.innerWidth * 0.7) / 2)
let modal_top_now = parseInt((document.body.clientHeight) / 2.5)
small_modal_body.innerHTML = `
                                    <div class="sm_w_body_txt sm_w_b_t_red">신고</div>
                                    <div class="sm_w_body_txt sm_w_b_t_red">팔로우 취소</div>
                                    <div class="sm_w_body_txt sm_w_b_t_black">게시물로 이동</div>
                                    <div class="sm_w_body_txt sm_w_b_t_black">공유 대상...</div>
                                    <div class="sm_w_body_txt sm_w_b_t_black">링크 복사</div>
                                    <div class="sm_w_body_txt sm_w_b_t_black">퍼가기</div>
                                    <div class="sm_w_body_txt sm_w_b_t_black modal_cancel_button">취소</div>
                                    `
small_modal_body.style.left = modal_left_now + "px";
small_modal_body.style.top = modal_top_now + "px";
small_modal_body.style.zIndex = "3";
const mb_l_mc_h_b_dot_icon = document.querySelector('.mb_l_mc_h_b_dot_icon');
const modal_cancel_button = document.querySelector('.modal_cancel_button')
function small_modal_in() {
    small_modal_wrapper.style.display = 'block';
    document.body.style.overflow = 'hidden'
}
function small_modal_out() {
    small_modal_wrapper.style.display = 'none';
    document.body.style.overflow = 'auto'
}
mb_l_mc_h_b_dot_icon.addEventListener('click', small_modal_in)
small_modal_wrapper.addEventListener('click', function (e) {
    if (e.target.classList.contains("small_modal_wrapper")) {
        small_modal_out()
    }
})
modal_cancel_button.addEventListener('click', small_modal_out)

const mb_l_mc_c_lk_comments_button = document.querySelector('.mb_l_mc_c_lk_comments_button');
const huge_modal_body = document.querySelector('.hm_w_body');
const hm_w_x_button = document.querySelector('.hm_w_x_button');
const huge_modal_wrapper = document.querySelector('.huge_modal_wrapper');
huge_modal_body.innerHTML = `
                                <img src="/static/images/flower.jpg" class="hm_w_b_img">
                                <div class="hm_w_b_content_box">
                                    <div class="hm_w_b_cb_my_account">
                                        <div class="hm_w_b_cb_mc_front">
                                            <img class="hm_w_b_cb_mc_f_circle_avatar" src="/static/images/df.jpeg">
                                            <div class="hm_w_b_cb_mc_f_txt">
                                                <div class="hm_w_b_cb_mc_f_t_id">about_joo
                                                    <i class="bi bi-dot"></i>
                                                    <span class="hm_w_b_cb_mc_f_t_i_following_button">팔로잉</span>
                                                </div>
                                            </div>
                                        </div>
                                        <i class="bi bi-three-dots"></i>
                                    </div>
                                    <div class="hm_w_b_cb_under">
                                        <div class="hm_w_b_cb_u_my_account_box">
                                            <img src="/static/images/df.jpeg" class="hm_w_b_cb_u_my_ab_circle_avatar">
                                            <div class="hm_w_b_cb_u_my_ab_txt">
                                                <div class="hm_w_b_cb_u_mc_my_id">about_joo</div>
                                                <div class="hm_w_b_cb_u_mc_mydesc">꽃이 너무 예쁘다</div>
                                            </div>
                                        </div>
                                        <div class="hm_w_b_cb_u_mc_day_before"></div>
                                        <div class="hm_w_b_cb_u_my_desc"></div>
                                        <div class="hm_w_b_cb_u_comments"></div>
                                    </div>
                                </div>
                            `
function huge_modal_in() {
    huge_modal_wrapper.style.display = 'block';
    document.body.style.overflow = 'hidden';
}
function huge_modal_out() {
    huge_modal_wrapper.style.display = 'none';
    document.body.style.overflow = 'auto'
}
hm_w_x_button.addEventListener('click', huge_modal_out);
huge_modal_wrapper.addEventListener('click', function (e) {
    if (e.target.classList.contains('huge_modal_wrapper')) {
        huge_modal_out()
    }
})
mb_l_mc_c_lk_comments_button.addEventListener('click', huge_modal_in)