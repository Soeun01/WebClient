jQuery(document).ready(function ($) {
    // const url = "http://localhost:58156/Service1.svc/";
    const url = "http://localhost:59755/WSUforestService.svc/";

    var cookieCheck = $.cookie("userId");

    // 로그인 버튼 : login-logout-select
    // 로그인한 사람 아이디 : access-name

    //처음 로딩시 현재 어떤 상태(로그인/로그아웃)인지에 따라 문자 변환
    $(function () {
        // 쿠키가 없을 경우
        if (cookieCheck == null) {
            $(".login-logout-select").text("로그인");
            $(".access-name").text("");
        } else { // 쿠키가 있을 경우
            // 로그인 유무 확인
            fetch(url + "WSU_LoginCheck/" + cookieCheck)
                .then(response => response.json())
                .then(data => {
                    // alert(data);
                    var res = data.split(",");

                    if (res[0] == "001") { // 로그인 중
                        $(".login-logout-select").text("로그아웃");
                        $(".access-name").text(res[2] + "님");

                        // 로그인/아웃 버튼 연결된 링크를 없애버림
                        $("a.login-logout-select").attr("href", "#");

                        // 게임접속 버튼 링크 변경
                        $("a.gamestart").attr("href", "sample://");
                    } else if (res[0] == "002") { // 로그아웃 중
                        $(".login-logout-select").text("로그인");
                        $(".access-name").text("");
                        $("a.login-logout-select").attr("href", "login.html");
                    } else { //003,로그인 체크 실패
                        alert("[" + res[0] + "] " + res[1]);
                    }
                })
        }
    })

    // 로그인/로그아웃 버튼 클릭시 
    $(".login-logout-select").on("click", function () {
        // 버튼 이름을 가져오기
        var text = $(".login-logout-select").text();

        // 로그인 버튼
        if (text == "로그인") {
            location.href = "login.html";
        } else { // 로그아웃 버튼
            fetch(url + "WSU_Logout/" + cookieCheck)
                .then(response => response.json())
                .then(data => {
                    var msg = data.split(",");
                    // alert("[" + msg[0] + "] " + msg[1]);
                    location.reload();
                });
        }
    });

    //게임 참가 버튼
    $(".gamestart").on("click", function () {
        // 로그인 유무 확인
        fetch(url + "WSU_LoginCheck/" + cookieCheck)
            .then(response => response.json())
            .then(data => {
                // alert(data);
                var res = data.split(",");

                if (res[0] == "001") { // 로그인 중
                    // 게임접속 버튼 링크 변경
                    $("a.gamestart").attr("href", "sample://");
                } else if (res[0] == "002") { // 로그아웃 중
                    alert("로그인이 필요한 서비스입니다.");
                    location.href = "login.html";
                } else { //003,로그인 체크 실패
                    alert("[" + res[0] + "] " + res[1]);
                }
            })
    })

    //navbar click add class active
    $(".navbar-nav").on("click", "li", function () {
        $(".navbar-nav li").removeClass("active");
        $(this).addClass("active");
    });

    //On scroll header add background
    $(window).scroll(function () {
        var a = 10;
        var pos = $(window).scrollTop();
        if (pos > a) {
            $(".header-top .navbar").css({
                background: '#29376E',
                transition: 'all 0.3s ease-in-out',
                height: 60,
            });
            $(".header-top .navbar").addClass("animated slideInDown");
        } else {
            $(".header-top .navbar").css({
                background: 'transparent'
            });
            $(".header-top .navbar").removeClass("animated slideInDown");
        }
    });
    $(window).scroll(function () {
        var a = 10;
        var pos = $(window).scrollTop();
        if (pos > a) {
            $(".articles .header-top .navbar").css({
                background: '#fff',
                transition: 'all 0.3s ease-in-out',
                height: 60,
            });
            $(".articles .header-top .navbar").addClass("animated slideInDown");
        } else {
            $(".articles .header-top .navbar").css({
                background: '#fff'
            });
            $(".articles .header-top .navbar").removeClass("animated slideInDown");
        }
    });

    //Feautes Slider
    $(".features-slider").owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        autoplay: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
    });

    //Feautes Slider
    $(".testimonial-slider").owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: true,
        autoplay: true,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
    });

    //Single Blog Slider
    $(".singleblog-slider").owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        //		autoplay: true,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        navText: [
            "<i class='fa fa-arrow-left'></i>previous post",
            "next post <i class='fa fa-arrow-right'></i>"
        ],
        dots: false,
        mouseDrag: false,
    });

    //Articles Slider
    $(".articles-slider").owlCarousel({
        center: true,
        items: 2,
        loop: true,
        margin: 50,
        autoplay: true,
        responsiveClass: true,
        dots: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 2,
            }
        }
    });

    //Single-blog Slider
    $(".single-blog-slider").owlCarousel({
        items: 2,
        loop: true,
        margin: 50,
        //		autoplay: true,
        responsiveClass: true,
        dots: true,
        responsive: {
            0: {
                items: 1,
            },
            767: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 2,
            }
        }
    });

    //Articles Slider
    $(".hero-slider-area").owlCarousel({
        items: 3,
        loop: true,
        dots: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    });

    //popup Modal Video
    $(".js-modal-btn").modalVideo();

    //Prevent default behavior of Anchor tag
    $("a.js-modal-btn").click(function (event) {
        return false;
    });

    //Click to scroll to next section
    $('.scrl-down').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500, 'linear');
    });

    //On click change footer menu active
    $(".footer-menu li").on("click", function () {
        $(".footer-menu li").removeClass("active");
        $(this).addClass("active");
    });

    //Back to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 900) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });
    $(".back-to-top").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
    });

    //Loadmore
    $(function () {
        $(".blogs-load").slice(0, 9).show();
        $(".all-blogs").on('click', function (e) {
            e.preventDefault();
            $(".blogs-load:hidden").slice(0, 3).slideDown();
        });
    });



});