$(function() {
    $("body").click(function(e) {
        var $form = $(".login-form, .link-form");
        var $mobile = $(".header-mobile");
        var $arrow = $(".header .arrow button");

        //ログインボタンクリック時
        if (!$(e.target).closest(".login, .playername").length && !$(e.target).closest(".login-form").length) {
            $form.removeClass("show");
            $form.slideUp(100);
        }
        else if ($(e.target).closest(".login-form").length) {
            $form.show();
        }
        else {
            if ($form.hasClass("show")) {
                $form.removeClass("show");
                $form.slideUp(100);
            }
            else {
                $form.addClass("show");
                $form.slideDown(100);
            }
        }

        //矢印クリック時
        if (!$(e.target).closest(".header .arrow").length && !$(e.target).closest($mobile).length) {
            $mobile.removeClass("show");
            $mobile.slideUp(100);
            $arrow.css({
                "top": "0",
                "bottom": "5px",
                "border-top": "3px solid #fdfdfd",
                "border-right": "3px solid #fdfdfd",
                "transform": "rotate(135deg)"
            });
        }
        else if ($(e.target).closest($mobile).length) {
            $mobile.show();
        }
        else {
            if ($mobile.hasClass("show")) {
                $mobile.removeClass("show");
                $mobile.slideUp(100);
                $arrow.css({
                    "top": "0",
                    "bottom": "5px",
                    "border-top": "3px solid #fdfdfd",
                    "border-right": "3px solid #fdfdfd",
                    "transform": "rotate(135deg)"
                });
            }
            else {
                $mobile.addClass("show");
                $mobile.slideDown(100);
                $arrow.css({
                    "top": "5px",
                    "bottom": "0",
                    "border-top": "3px solid #c1b7df",
                    "border-right": "3px solid #c1b7df",
                    "transform": "rotate(315deg)"
                });
            }
        }
    });
});