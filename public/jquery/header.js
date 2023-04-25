$(function() {
    $("body").click(function(e) {
        var $form = $(".login-form, .link-form");
        var $mobile = $(".header-mobile");
        var $arrow = $(".header .arrow");
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
        if (!$(e.target).closest(".header .arrow").length && !$(e.target).closest($mobile).length) {
            $mobile.removeClass("show");
            $mobile.slideUp(100);
        }
        else if ($(e.target).closest($mobile).length) {
            $mobile.show();
        }
        else {
            if ($mobile.hasClass("show")) {
                $mobile.removeClass("show");
                $mobile.slideUp(100);
            }
            else {
                $mobile.addClass("show");
                $mobile.slideDown(100);
            }
        }
    });
});