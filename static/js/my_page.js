const body = document.querySelector('body');
const modal = document.querySelector('.mp_modal');
const btnOpenPopup = document.querySelector('.mp_mp_mt_top_option');
const closePopup = document.querySelector('.mp_md_exit');

btnOpenPopup.addEventListener('click', function () {
    console.log("눌렀따");
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
    }
});