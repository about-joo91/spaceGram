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
function carousel_prev_btn(post_id, name) {

    let carousel_now = document.getElementById(name + '_carousel_' + post_id)
    let next_button_now = document.getElementById(name + '_button_next_' + post_id)
    let prev_button_now = document.getElementById(name + '_button_prev_' + post_id)
    let check_transform = parseInt(carousel_now.style.transform.split('-')[1])
    if (check_transform == 614) {
        prev_button_now.style.visibility = 'hidden';
    }
    next_button_now.style.visibility = 'visible';
    carousel_now.style.transition = 500 + "ms";
    carousel_now.style.transform = "translate3d(-" + (check_transform - 614) + "px, 0px,0px)";
}
function carousel_next_btn(post_id, length_of_image, name) {
    console.log(name, 'caro')
    let carousel_now = document.getElementById(name + '_carousel_' + post_id)
    let next_button_now = document.getElementById(name + '_button_next_' + post_id)
    let prev_button_now = document.getElementById(name + '_button_prev_' + post_id)
    let check_transform = parseInt(carousel_now.style.transform.split('-')[1])
    if (isNaN(check_transform)) {
        check_transform = 0
    }
    if (check_transform == ((parseInt(length_of_image) - 2) * 614)) {
        next_button_now.style.visibility = 'hidden';
    }
    prev_button_now.style.visibility = 'visible'
    carousel_now.style.transition = 500 + "ms";
    carousel_now.style.transform = "translate3d(-" + (check_transform + 614) + "px,0px,0px)";
}
const mh_circle_avatar = document.querySelector('.mh_circle_avatar')

mh_circle_avatar.addEventListener('click', function () {
    window.location.href = '/my_page'
})



const modal_cancel_button = document.querySelector('.modal_cancel_button')
function small_modal_in(post_id) {
    let small_modal_wrapper = document.getElementById('small_modal_wrapper_' + post_id)
    console.log(document.documentElement.scrollTop)
    let modal_top_now = parseInt((window.innerHeight - 380) / 2)
    let modal_left_now = parseInt((window.innerWidth - 380) / 2)
    let small_modal_body = document.getElementById('sm_w_body_' + post_id);
    small_modal_body.style.left = modal_left_now + "px";
    small_modal_body.style.top = modal_top_now + "px";
    small_modal_wrapper.style.display = 'block';
    // document.body.style.overflow = 'hidden'
    small_modal_wrapper.addEventListener('click', function (e) {
        if (e.target.classList.contains("small_modal_wrapper")) {
            small_modal_out(post_id)
        }
    })
}
function small_modal_out(post_id) {
    let small_modal_wrapper = document.getElementById('small_modal_wrapper_' + post_id)
    small_modal_wrapper.style.display = 'none';
    document.body.style.overflow = 'auto'
}

const huge_modal_wrapper = document.querySelector('.huge_modal_wrapper');
function huge_modal_in(post_id) {
    let post_modal = document.getElementById('modal_wrapper' + post_id)
    post_modal.style.display = 'block'
    document.body.style.overflow = 'hidden';
    post_modal.addEventListener('click', function (e) {
        if (e.target.classList.contains('huge_modal_wrapper')) {
            huge_modal_out(post_id)
        }
    })
}
function huge_modal_out(post_id) {
    let post_modal = document.getElementById('modal_wrapper' + post_id)
    post_modal.style.display = 'none';
    document.body.style.overflow = 'auto'
}


const upload_modal = document.querySelector('.upload_modal');
const preview_image = document.getElementById('um_preview_image_box')
const um_p_ib_wrapper = document.getElementById('um_p_ib_wrapper')
const um_desc = document.querySelector('.um_desc');
const um_header_next_btn = document.querySelector('.um_header_next_btn')
const um_header_upload_btn = document.querySelector('.um_header_upload_btn');
const um_comment_page = document.querySelector('.um_comment_page');
const mh_i_square = document.querySelector('.mh_i_square')
const upload_modal_wrapper = document.querySelector('.upload_modal_wrapper')
const ul_bb_prev = document.querySelector('.ul_bb_prev')
const ul_bb_next = document.querySelector('.ul_bb_next')
const um_preview_images = document.querySelector('.um_preview_images')

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
let file_length = 0
upload_modal.addEventListener('drop', function (e) {
    e.preventDefault();
    const data = e.dataTransfer;
    if (!isValid(data)) return;
    um_p_ib_wrapper.style.width = 400 * data.files.length + "px"
    file_length = data.files.length
    for (let i = 0; i < data.files.length; i++) {
        formData.append(data.files[i].name, data.files[i])
        const reader = new FileReader();
        reader.onload = () => {
            um_p_ib_wrapper.innerHTML +=
                `
            <img class="um_preview_images" src="${reader.result}">
            `
        }
        reader.readAsDataURL(data.files[i])
    }
    preview_image.style.display = 'block'
    um_desc.style.display = 'none'
    um_header_next_btn.style.display = 'flex'
    if (data.files.length > 1) {
        ul_bb_next.style.visibility = 'visible'
    }

});
ul_bb_cur_idx = 0
ul_bb_next.addEventListener('click', function () {
    ul_bb_prev.style.visibility = 'visible'
    if (++ul_bb_cur_idx == file_length - 1) {
        ul_bb_next.style.visibility = 'hidden'
    }
    um_p_ib_wrapper.style.transition = 500 + 'ms'
    um_p_ib_wrapper.style.transform = "translate3d(-" + (400 * ul_bb_cur_idx) + "px,0px,0px)"
})
ul_bb_prev.addEventListener('click', function () {
    if (--ul_bb_cur_idx == 0) {
        ul_bb_prev.style.visibility = 'hidden'
    }
    um_p_ib_wrapper.style.transform = "translate3d(-" + (400 * ul_bb_cur_idx) + "px, 0px, 0px)"
    ul_bb_next.style.visibility = 'visible'
    um_p_ib_wrapper.style.transition = 500 + 'ms'

})
um_header_next_btn.addEventListener('click', function () {
    um_header_next_btn.style.display = 'none'
    upload_modal.style.transition = 500 + "ms"
    upload_modal.style.width = 800 + "px"

    setTimeout(() => {
        um_header_upload_btn.style.display = 'flex'
        um_comment_page.style.display = 'block'
        um_preview_images.style.borderRadius = "0px 0px 0px 0px";
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

//
// 여기부터 아래로 수정 
//
// 좋아요 기능 구현 *동시성 문제?!
function like_button(post_id) {
    let heart_icon = document.getElementById(post_id)
    if (heart_icon.classList.contains('bi-heart')) {
        $.ajax({
            type: 'POST',
            url: '/like',
            data: {
                post_id: post_id,
                action_give: 'like'
            },
            success: function (response) {
                heart_icon.classList.replace('bi-heart', 'bi-heart-fill')
                heart_icon.style.color = 'red';
            }
        })
    } else {
        $.ajax({
            type: 'POST',
            url: '/like',
            data: {
                post_id: post_id,
                action_give: 'unlike'
            },
            success: function (response) {
                heart_icon.classList.replace('bi-heart-fill', 'bi-heart')
                heart_icon.style.color = 'black';

            }
        })
    }
    window.location.reload()
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
function follow_btn(obj) {
    target_user_id = obj.id.split('_')[2]
    let following = document.getElementById('following_btn_' + target_user_id)
    let follow = document.getElementById('follow_btn_' + target_user_id)
    $.ajax({
        type: 'POST',
        url: '/follow_map',
        data: {
            target_user_id: target_user_id
        },
        success: function (response) {
            follow.classList.toggle('invisible')
            following.classList.toggle('invisible')

        }
    })
    window.location.reload()
}

function delete_post(post_id) {
    $.ajax({
        type: 'POST',
        url: '/posts/delete',
        data: {
            post_id: post_id
        },
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    })

}