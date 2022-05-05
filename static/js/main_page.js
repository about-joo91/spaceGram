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