$(window).on("load scroll", function() {
    var $scroll = $(this).scrollTop();
    var $width = $("body").width();

    if ($width > 1232 && $scroll > 100) {
        $("header").addClass("animated");
        $(".link-form").css({
            "top": 65 + "px",
            "right": 15 + "px",
        });
    }
    else {
        $("header").removeClass("animated");
        if ($width > 1232){
            $(".link-form").css({
                "top": 75 + "px",
                "right": 162 + "px",
            });
        }
    }
});

$(function() {
    $(".mobile").hide();
    $("body").click(function(e) {
        var $form = $(".link-form");

        //ユーザーボタンクリック時
        if (!$(e.target).closest("header .username").length && !$(e.target).closest($form).length) {
            $form.removeClass("show").slideUp(100);
        }
        else if ($(e.target).closest($form).length) {
            $form.show();
        }
        else {
            if ($form.hasClass("show")) {
                $form.removeClass("show").slideUp(100);
            }
            else {
                $form.addClass("show").slideDown(100);
            }
        }

        if ($("body").width() <= 1232) {
            //ユーザーボタンクリック時（スマホ）
            if (!$(e.target).closest(".mobile .username").length && !$(e.target).closest($form).length) {
                //処理なし
            }
            else if ($(e.target).closest($form).length) {
                $form.show();
            }
            else {
                $form.slideDown(100);
                $(".mobile").removeClass("show").slideUp(100);
                $("header .arrow").removeClass("fa-chevron-up up").addClass("fa-chevron-down down");
            }

            //矢印クリック時（スマホ）
            if (!$(e.target).closest("header .arrow").length && !$(e.target).closest(".mobile").length) {
                $(".mobile").removeClass("show").slideUp(100);
                $("header .arrow").removeClass("fa-chevron-up up").addClass("fa-chevron-down down");
            }
            else if ($(e.target).closest(".mobile").length) {
                $(".mobile").show();
            }
            else {
                if ($(".mobile").hasClass("show")) {
                    $(".mobile").removeClass("show").slideUp(100);
                    $("header .arrow").removeClass("fa-chevron-up up").addClass("fa-chevron-down down");
                }
                else {
                    $(".mobile").addClass("show").slideDown(100);
                    $("header .arrow").removeClass("fa-chevron-down down").addClass("fa-chevron-up up");
                }
            }
        }
    });
});