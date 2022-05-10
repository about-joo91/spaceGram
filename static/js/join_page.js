let inputTag = document.getElementsByTagName("input");
let buttonArray = document.getElementsByTagName("button");

let inputId = inputTag[0]; //아이디 입력창(input 태그의 0번째)
let inputPassword = inputTag[1]; //비밀번호 입력창



let ordinaryButton = buttonArray[0];
let facebookLoginButton = buttonArray[1];

inputPassword.addEventListener("keyup", () => {
    if (inputId.value) {
        ordinaryButton.classList.remove("unactivatedLoginColor");
        ordinaryButton.classList.add("activatedLoginColor");
    }
    if (!inputPassword.value) {
        ordinaryButton.classList.remove("activatedLoginColor");
        ordinaryButton.classList.add("unactivatedLoginColor");
    }
})

ordinaryButton.addEventListener('click', () => {
    if (inputId.value === "본인의아이디" && inputPassword.value === "비밀번호") {
        alert("로그인 성공");
    } else {
        alert("로그인 실패");
    }
})

// function is_id(asValue) {
//     var can_input = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,30}$/i;
//     return can_input.test(asValue);
// }


// function is_pw(asValue) {
//     var can_input = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
//     return can_input.test(asValue);
// }

// function is_user_name(asValue) {
//     // var can_input = /([^가-힣ㄱ-ㅎㅏ-ㅣ\x20])/i{2,6}$/;
//     var can_input = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
//     return can_input.test(asValue);
// }

// function is_nick_name(asValue) {
//     var can_input = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;
//     return can_input.test(asValue);
// }



function sign_up() {
    let new_id = $('#new_id').val()
    let new_pw = $('#new_pw').val()
    let new_nick_name = $('#new_nick_name').val()
    let new_user_name = $('#new_user_name').val()

    if (new_id == "") {
        alert("email 주소가 비어있습니다.")
        $("#new_id").focus()
        return;
    }
    // if (!is_id(new_id)) {
    //     alert("email 형식을 확인 해주세요. 영문과 숫자, 일부 특수문자(._-) 사용가능 2-10자")
    //     $("#new_id").focus()
    //     return;
    // }

    if (new_nick_name == "") {
        alert("nick_name 칸이 비어있습니다.")
        $("#new_nick_name").focus()
        return;
    }
    // if (!is_nick_name(new_nick_name)) {
    //     alert("nick_name 형식을 확인 해주세요. 영문과 숫자, 일부 특수문자(._-) 사용가능 2-10자")
    //     $("#new_nick_name").focus()
    //     return;
    // }
    if (new_user_name == "") {
        alert("user_name 칸이 비어있습니다.")
        $("#new_user_name").focus()
        return;
    }
    // if (!is_user_name(new_user_name)) {
    //     alert("user_name 형식을 확인 해주세요. 한글 사용가능 2-6자")
    //     $("#new_user_name").focus()
    //     return;
    // }
    if (new_pw == "") {
        alert("비밀번호 칸이 비어있습니다.")
        $("#new_pw").focus()
        return;
    }
    // if (!is_pw(new_pw)) {
    //     alert("비밀번호의 형식을 확인해주세요. 영문과 숫자 필수 포함, 특수문자(!@#$%^&*) 사용가능 8-20자")
    //     $("#new_id").focus()
    //     return;
    // }

    $.ajax({
        type: "POST",
        url: "/join_page/sign_up",
        data: {
            new_id_give : new_id,
            new_pw_give : new_pw,
            new_nick_name_give : new_nick_name,
            new_user_name_give : new_user_name
        },
        success: function (response) {
            alert(response['msg'])
            window.location.replace(response['url'])
        }
    });
}
document.querySelector('.mj_p_joiner_button').addEventListener('click',function(){sign_up()})
