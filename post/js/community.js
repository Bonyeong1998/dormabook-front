$(document).ready(function ($) {
    var token = sessionStorage.getItem('jwt');
    var parseJwt;

    if(!token){
        alert('로그인이 되어 있지 않거나, 비정상적인 접근입니다.');
        window.location.href = "https://dormabook.shop"
    } else{
        parseJwt = JSON.parse(Base64.decode(token.toString().split('.')[1]));
    }

    var a = "";
    var trHTML = '';
    var memberName = parseJwt.memberName;

    document.getElementById('member-name').innerText = (memberName+' 님');

    $.ajax({
        type: "GET",
        // url: "https://dormabook.shop/api/post/community/profile",
        url: "https://dormabook.shop/api/post/community/profile",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", token);
        },
        success: function (data) {
            document.getElementById("post-count").innerText = data[0].count;
            document.getElementById("notice-count").innerText = data[1].count;
        },
        error: function () {
            //
        }
    });

    $("#mentee_postList").empty();
    $("#mento_postList").empty();
    // $('#mentee_postList').append(data);
    $.ajax({
        type: "GET",
        url: "https://dormabook.shop/api/post/community/postlist?" + $.param({"postRule": "멘티"}),
        beforeSend: function (xhr){
            xhr.setRequestHeader("Authorization",token);
        },

        success: function (data) {
            console.log(data);

            $.each(data, function (i, item) {
                if (item.postMatchState === 0) {
                    a = "매칭 중";
                    trHTML += '<tr><th scope="row" id="thId" class="thh">' + item.postTitle + '</th><td class="postMatchBox">' + a + '</td><td style="display: none">' + item.postNo+'</td></tr>';
                    $('.postMatchBox').css("background: rgba(170, 170, 170, 0.2)")
                } else {
                    a = "매칭 완료";
                    trHTML += '<tr><th scope="row" id="thId" class="thh">' + item.postTitle + '</th><td class="postMatchBox2">' + a + '</td><td style="display: none">' + item.postNo+'</td></tr>';
                    $('.postMatchBox').css("background: rgba(72, 118, 239, 0.2)")
                }
            });
            $('#mentee_postList').append(trHTML);
        },
        error: function () {
            //
        }
    });

    var a1 = "";
    var trHTML1 = '';
    $.ajax({
        type: "GET",
        url: "https://dormabook.shop/api/post/community/postlist?" + $.param({"postRule": "멘토"}),
        beforeSend: function (xhr){
            xhr.setRequestHeader("Authorization",token);
        },
        contentType: 'application/json',
        success: function (data) {
            console.log(data);

            $.each(data, function (i, item) {
                if (item.postMatchState === 0) {
                    a1 = "매칭 중";
                    trHTML1 += '<tr><th scope="row" id="thId" class="thh">' + item.postTitle + '</th><td class="postMatchBox">' + a1 + '</td><td style="display: none">' + item.postNo+'</td></tr>';
                    $('.postMatchBox').css("background: rgba(170, 170, 170, 0.2)")
                } else {
                    a1 = "매칭 완료";
                    trHTML1 += '<tr><th scope="row" id="thId" class="thh">' + item.postTitle + '</th><td class="postMatchBox2">' + a1 + '</td><td style="display: none">' + item.postNo+'</td></tr>';
                    $('.postMatchBox').css("background: rgba(72, 118, 239, 0.2)")
                }
                // console.log(item.postNo);
            });
            $('#mento_postList').append(trHTML1);
        },
        error: function () {
            //
        }

    });
    $('#post__btn').click(function (){
        window.location.href = "https://dormabook.shop/postmento";
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
})
$(document).on("click","#mentee_postList tr",function (){
    var tr = $(this);
    var td = tr.children();

    var no = td.eq(2).text();
    sessionStorage.setItem('postNo',no);
    window.location.href = "https://dormabook.shop/viewmentee";
    console.log(no);
})
$(document).on("click","#mento_postList tr",function (){
    var tr = $(this);
    var td = tr.children();

    var no = td.eq(2).text();
    sessionStorage.setItem('postNo',no);
    window.location.href = "https://dormabook.shop/viewmento";
    console.log(no);
})
