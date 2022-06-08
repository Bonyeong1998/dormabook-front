$(document).on("click", "#upload", function () {
    var token = sessionStorage.getItem('jwt');
    var parseJwt = JSON.parse(Base64.decode(token.toString().split('.')[1]));
    var username = parseJwt.sub;


    var title = $('#title').val();
    var subject = $('#subject').val();
    var bookname = $('#bookname').val();
    var content = $('#content').val();

    if (title == null || title == undefined || title == "") {
        alert('제목을 입력해주세요.');
        $('#title').focus();
        return;
    }
    if (subject == null || subject == undefined || subject == "") {
        alert('과목을 입력해주세요.');
        $('#subject').focus();
        return;
    }
    if (bookname == null || bookname == undefined || bookname == "") {
        alert('책 이름을 입력해주세요.');
        $('#bookname').focus();
        return;
    }
    if (content == null || content == undefined || content == "") {
        alert('내용을 입력해주세요.');
        $('#content').focus();
        return;
    }

    var data = {
        "postTitle": $('#title').val(),
        "postSubject": $('#subject').val(),
        "postRole": "멘티",
        "postBookTitle": $('#bookname').val(),
        "postContent": $('#content').val(),
        "memberId": username
    };
    var formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(data)], {type: "application/json"}));

    $.ajax({
        type: 'post',
        url: 'https://dormabook.shop/api/post/mentee_post/upload/post',
        processData: false,
        contentType: false,
        cache: false,
        data: formData,
        error: function (error) {
            alert('게시글 작성 실패');
        },
        success: function () {
            console.log('게시글 작성 완료')
            alert('게시글 작성 완료');
            window.location.href ="https://dormabook.shop/content";

        }
    });
})

$('#comunity_home').click(function (){
    window.location.href = "https://dormabook.shop/community";
})
$('#post_list').click(function (){
    window.location.href = "https://dormabook.shop/postlist";
})
$('#my_profile').click(function (){
    window.location.href = "https://dormabook.shop/mypage";
})