$(function() {
    var $menu = $(".special .menu-title");
    var $dropdown = $(".special .dropdown");

    $menu.click(function() {
        if ($dropdown.hasClass("show")) {
            $dropdown.fadeOut(300);
            $dropdown.removeClass("show");
        }
        else {
            $dropdown.fadeIn(300);
            $dropdown.addClass("show");
        }
    });
});