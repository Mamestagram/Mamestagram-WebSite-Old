$(function() {
    $("body").click(function(e) {
        var $form = $(".link-form");
        var $mobile = $(".mobile");

        //ユーザーボタンクリック時
        if (!$(e.target).closest("header .playername").length && !$(e.target).closest($form).length) {
            $form.removeClass("show");
            $form.slideUp(100);
        }
        else if ($(e.target).closest($form).length) {
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

        if ($("body").width() <= 1180) {
            //ユーザーボタンクリック時（スマホ）
            if (!$(e.target).closest(".mobile .playername").length && !$(e.target).closest($form).length) {
                //処理なし
            }
            else if ($(e.target).closest($form).length) {
                $form.show();
            }
            else {
                $form.slideDown(100);
                $mobile.removeClass("show");
                $mobile.slideUp(100);
                $(".standard .down").show();
                $(".standard .up").hide();
            }

            //矢印クリック時（スマホ）
            if (!$(e.target).closest("header .arrow").length && !$(e.target).closest($mobile).length) {
                $mobile.removeClass("show");
                $mobile.slideUp(100);
                $(".standard .down").show();
                $(".standard .up").hide();
            }
            else if ($(e.target).closest($mobile).length) {
                $mobile.show();
            }
            else {
                if ($mobile.hasClass("show")) {
                    $mobile.removeClass("show");
                    $mobile.slideUp(100);
                    $(".standard .down").show();
                    $(".standard .up").hide();
                }
                else {
                    $mobile.addClass("show");
                    $mobile.slideDown(100);
                    $(".standard .down").hide();
                    $(".standard .up").show();
                }
            }
        }
    });
});

$(window).on("load scroll", function() {

});