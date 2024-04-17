$(window).resize(function() {
    if ($("body").width() <= 767) {
        $(".country ul li").css("transform", "");
    }
});

$(function() {
    var $menu = $(".special .menu-title");
    var $dropdown = $(".special .dropdown");

    setInterval(function() {
        let wid = $(".ranking-data").eq(0).width();
        if ($("body").width() <= 1232) {
            wid -= $(".ranking").eq(0).width() + $(".flag-icon").eq(0).width() + $(".acc").eq(0).width() + $(".playcount").eq(0).width() + $(".pp").eq(0).width();
            $(".name").css("width", `${wid}px`);
        }
    });

    if ($("body").width() <= 767) {
        $(".country ul li").css("transform", "");
    }

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