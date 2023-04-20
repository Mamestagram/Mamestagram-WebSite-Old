$(function() {
    $("body").click(function(e) {
        var $form = $(".login-form");
        if (!$(e.target).closest(".login").length && !$(e.target).closest(".login-form").length) {
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
    });
});