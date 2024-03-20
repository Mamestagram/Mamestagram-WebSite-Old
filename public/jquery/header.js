$(window).on("load scroll", function() {
    var $scroll = $(this).scrollTop();
    var $width = $("body").width();

    if ($width > 1232 && $scroll > $("header").height()) {
        $("header").addClass("animated");
        $(".link-form").css({
            "top": 65 + "px",
            "right": 10 + "px",
        });
    }
    else {
        $("header").removeClass("animated");
        if ($width > 1232){
            $(".link-form").css({
                "top": 84 + "px",
                "right": 125 + "px",
            });
        }
    }
});

$(function() {
    $(".mobile").hide();
    $("body").click(function(e) {
        var $form = $(".link-form");
        var $search = $(".search-form");

        //ユーザーボタンクリック時
        if (!$(e.target).closest("header .avatar").length && !$(e.target).closest($form).length) {
            $form.removeClass("show").slideUp(200);
        }
        else if ($(e.target).closest($form).length) {
            $form.show();
        }
        else {
            if ($form.hasClass("show")) {
                $form.removeClass("show").slideUp(200);
            }
            else {
                $form.addClass("show").slideDown(200);
            }
        }

        if ($("body").width() <= 1232) {
            //ユーザーボタンクリック時（スマホ）
            if (!$(e.target).closest(".mobile .avatar").length && !$(e.target).closest($form).length) {
                //処理なし
            }
            else if ($(e.target).closest($form).length) {
                $form.show();
            }
            else {
                $form.slideDown(200);
                $(".mobile").removeClass("show").slideUp(200);
                $("header .arrow").removeClass("fa-chevron-up up").addClass("fa-chevron-down down");
            }

            //矢印クリック時（スマホ）
            if (!$(e.target).closest("header .arrow").length && !$(e.target).closest(".mobile").length) {
                $(".mobile").removeClass("show").slideUp(200);
                $("header .arrow").removeClass("fa-chevron-up up").addClass("fa-chevron-down down");
            }
            else if ($(e.target).closest(".mobile").length) {
                $(".mobile").show();
            }
            else {
                if ($(".mobile").hasClass("show")) {
                    $(".mobile").removeClass("show").slideUp(200);
                    $("header .arrow").removeClass("fa-chevron-up up").addClass("fa-chevron-down down");
                }
                else {
                    $(".mobile").addClass("show").slideDown(200);
                    $("header .arrow").removeClass("fa-chevron-down down").addClass("fa-chevron-up up");
                }
            }
        }

        //検索ボタンクリック時
        if (!$(e.target).closest("header .pc .search, header .search-mobile").length && !$(e.target).closest(".search-form .searchbox").length) {
            $search.removeClass("show").fadeOut(200);
        }
        else if ($(e.target).closest($search).length) {
            $search.show();
        }
        else {
            if ($search.hasClass("show")) {
                $search.removeClass("show").fadeOut(200);
            }
            else {
                $search.addClass("show").fadeIn(200);
            }
        }
    });
});