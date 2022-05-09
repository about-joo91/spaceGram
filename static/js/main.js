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
]
let length_of_image = image_list.length
const mb_l_mc_mib_carousel = document.querySelector('.mb_l_mc_mib_carousel');
// mb_l_mc_mib_carousel.style.width = (615 * length_of_image) + "px";
// for (let i = 0; i < image_list.length; i++) {
//     image_html = `<img class="mb_l_mc_mi_c_img" src = "/static/images/${image_list[i]}">`;
//     mb_l_mc_mib_carousel.innerHTML += image_html
// }
const mb_l_mc_mib_btn_prev = document.querySelector('.mb_l_mc_mib_btn_prev');
const mb_l_mc_mib_btn_next = document.querySelector('.mb_l_mc_mib_btn_next');
let cur_idx_for_main_carousel = 0;
if (length_of_image > 1) {
    mb_l_mc_mib_btn_next.style.visibility = 'visible';
}
mb_l_mc_mib_btn_prev.addEventListener('click', function () {
    if (--cur_idx_for_main_carousel == 0) {
        mb_l_mc_mib_btn_prev.style.visibility = 'hidden';
    }
    mb_l_mc_mib_btn_next.style.visibility = 'visible';
    mb_l_mc_mib_carousel.style.transition = 500 + "ms";
    mb_l_mc_mib_carousel.style.transform = "translate3d(-" + (cur_idx_for_main_carousel * (1 / length_of_image)) * 100 + "%, 0px,0px)";


})
mb_l_mc_mib_btn_next.addEventListener('click', function () {
    if (++cur_idx_for_main_carousel == length_of_image - 1) {
        mb_l_mc_mib_btn_next.style.visibility = 'hidden';
    }
    mb_l_mc_mib_btn_prev.style.visibility = 'visible'
    mb_l_mc_mib_carousel.style.transition = 500 + "ms";
    mb_l_mc_mib_carousel.style.transform = "translate3d(-" + (cur_idx_for_main_carousel * (1 / length_of_image)) * 100 + "%,0px,0px)";
})


const mh_circle_avatar = document.querySelector('.mh_circle_avatar')

mh_circle_avatar.addEventListener('click', function () {
    window.location.href = '/my_page'
})

const small_modal_wrapper = document.querySelector('.small_modal_wrapper');
const small_modal_body = document.querySelector('.sm_w_body');
let modal_left_now = parseInt((window.innerWidth * 0.7) / 2)
let modal_top_now = parseInt((document.documentElement.clientHeight) / 3)
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
    // document.body.style.overflow = 'hidden'
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

const huge_modal_body = document.querySelector('.hm_w_body');
const hm_w_x_button = document.querySelector('.hm_w_x_button');
const huge_modal_wrapper = document.querySelector('.huge_modal_wrapper');
huge_modal_body.innerHTML = `
                                <div class= "hm_w_b_img_wrapper">
                                <div class="hm_w_button_box">
                                    <div class="hm_w_btn_prev">
                                        <i class="bi bi-chevron-left"></i>
                                    </div>
                                    <div class="hm_w_btn_next">
                                        <i class="bi bi-chevron-right"></i>
                                    </div>
                                </div>
                                <div class="hm_w_b_iw_img_box">
                                </div>
                                </div>
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
                                        <i class="bi bi-three-dots hm_w_b_cb_ma_dot_icon"></i>
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


// 큰 모달페이지의 버튼 컨트롤러
const hm_w_b_cb_ma_dot_icon = document.querySelector('.hm_w_b_cb_ma_dot_icon');
const hm_w_b_img_box = document.querySelector('.hm_w_b_iw_img_box');

hm_w_b_cb_ma_dot_icon.addEventListener('click', small_modal_in);

// 모달 안쪽에 사진 넣기
hm_w_b_img_box.style.width = 100 * length_of_image + "%"
for (let i = 0; i < length_of_image; i++) {
    let modal_image_html = `
    <img class="hm_w_b_img" src="/static/images/${image_list[i]}">
    `
    hm_w_b_img_box.innerHTML += modal_image_html
}
cur_idx_for_huge_modal = 0;

const hm_w_btn_prev = document.querySelector('.hm_w_btn_prev');
const hm_w_btn_next = document.querySelector('.hm_w_btn_next');
if (length_of_image >= 1) {
    hm_w_btn_next.style.visibility = 'visible'
}

const hm_w_b_img = document.querySelector('.hm_w_b_img')
hm_w_btn_next.addEventListener('click', function () {
    if (++cur_idx_for_huge_modal == length_of_image - 1) {
        hm_w_btn_next.style.visibility = 'hidden'
    }
    hm_w_btn_prev.style.visibility = 'visible'
    hm_w_b_img_box.style.transition = 500 + "ms";
    hm_w_b_img_box.style.transform = "translate3d(-" + ((1 / length_of_image) * cur_idx_for_huge_modal) * 100 + "%,0px,0px)";
})
hm_w_btn_prev.addEventListener('click', function () {
    if (--cur_idx_for_huge_modal == 0) {
        hm_w_btn_prev.style.visibility = 'hidden'
    }
    hm_w_btn_next.style.visibility = 'visible'
    hm_w_b_img_box.style.transition = 500 + "ms"
    hm_w_b_img_box.style.transform = "translate3d(-" + ((1 / length_of_image) * cur_idx_for_huge_modal) * 100 + "%,0px,0px)"
})

const upload_modal = document.querySelector('.upload_modal');
const preview_image = document.getElementById('um_preview_image')
const um_desc = document.querySelector('.um_desc');
const um_header_next_btn = document.querySelector('.um_header_next_btn')
const um_header_upload_btn = document.querySelector('.um_header_upload_btn');
const um_comment_page = document.querySelector('.um_comment_page');
const mh_i_square = document.querySelector('.mh_i_square')
const upload_modal_wrapper = document.querySelector('.upload_modal_wrapper')

function isValid(data) {
    if (data.types.indexOf('Files') < 0)
        return false;
    if (data.files[0].type.indexOf('image') < 0) {
        alert('이미지 파일만 업로드 가능합니다.')
        return false;
    }
    if (data.files[0].size >= 1024 * 1024 * 50) {
        alert('50MB 이상인 파일은 업로드 할 수 없습니다.')
    }
    return true;
}
upload_modal.addEventListener('dragover', function (e) {
    e.preventDefault();
    um_desc.style.transition = 500 + 'ms'
    um_desc.style.color = 'rgb(65, 147, 239)'
});
upload_modal.addEventListener('dragleave', function (e) {
    e.preventDefault();
    um_desc.style.transition = 500 + 'ms'
    um_desc.style.color = 'black'
});

const formData = new FormData();
upload_modal.addEventListener('drop', function (e) {
    e.preventDefault();
    const data = e.dataTransfer;
    if (!isValid(data)) return;

    formData.append('img', data.files[0])
    const reader = new FileReader();
    reader.onload = () => {
        preview_image.style.display = 'block'
        um_desc.style.display = 'none'
        um_header_next_btn.style.display = 'flex'
        preview_image.src = reader.result;
    }
    reader.readAsDataURL(data.files[0])
});
um_header_next_btn.addEventListener('click', function () {
    um_header_next_btn.style.display = 'none'
    upload_modal.style.transition = 500 + "ms"
    upload_modal.style.width = 800 + "px"

    setTimeout(() => {
        um_header_upload_btn.style.display = 'flex'
        um_comment_page.style.display = 'block'
    }, 500)
})
um_header_upload_btn.addEventListener('click', () => {
    let content_give = $('#um_cp_ma_f_input').val()
    formData.append('content', content_give)
    $.ajax({
        type: "POST",
        url: "/posts",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        },

    })

}
)
function upload_modal_in() {
    upload_modal_wrapper.style.display = 'flex';
}
function upload_modal_out() {
    upload_modal_wrapper.style.display = 'none'
}
mh_i_square.addEventListener('click', upload_modal_in)
upload_modal_wrapper.addEventListener('click', function (e) {
    if (e.target.classList.contains('upload_modal_wrapper')) {
        upload_modal_out()
    }
})

// 홈화면 네비게이팅 
const mh_i_home = document.querySelector('.mh_i_home')
const mh_name = document.querySelector('.mh_name')
function home_redirecting() {
    window.location.replace('/home')
}
mh_i_home.addEventListener('click', home_redirecting)
mh_name.addEventListener('click', home_redirecting)

//좋아요 버튼 기능
function like_button(post_id) {
    let heart_icon = document.getElementById(post_id)
    if (!heart_icon.classList.contains('bi-heart-fill')) {
        console.log('like')
        $.ajax({
            type: 'POST',
            url: '/like',
            data: {
                post_id: post_id,
                action_give: 'like'
            },
            success: function (response) {
                heart_icon.classList.replace('bi-heart', 'bi-heart-fill');
                heart_icon.style.color = 'red';
            }
        })
    } else {
        console.log('unlike')
        $.ajax({
            type: 'POST',
            url: '/like',
            data: {
                post_id: post_id,
                action_give: 'unlike'
            },
            success: function (response) {
                heart_icon.classList.replace('bi-heart-fill', 'bi-heart')
                heart_icon.style.color = 'black'
            }
        })
    }
}
function change_comment_input(obj) {
    let post_id = obj.id.split('_')[2]
    let submit_post_id = document.getElementById('submit_' + post_id)
    value = obj.value;
    if (value == '' || value == NaN) {
        submit_post_id.style.fontWeight = '400';
        submit_post_id.style.cursor = 'text'
    } else {
        submit_post_id.style.fontWeight = 'bold'
        submit_post_id.addEventListener('mouseover', function () {
            submit_post_id.style.cursor = 'pointer'
        })
    }
}

function comment_submit(post_id) {
    let comment_content = document.getElementById('comment_input_' + post_id).value;
    if (!comment_content == "") {
        $.ajax({
            type: 'POST',
            url: '/comment',
            data: {
                post_id: post_id,
                comment_give: comment_content
            },
            success: function (response) {
                alert('댓글작성 완료!')
                window.location.reload()
            }
        })
    }

}