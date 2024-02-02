$(function() {
    var $ja = $("main .language .ja");
    var $en = $("main .language .en");

    $(".eng").css("display", "");
    $(".jpn").css("display", "none");
    $en.css({
        "color": "#e0d6b8",
        "text-decoration": "underline"
    });
    $ja.css({
        "color": "#d9cc8b",
        "text-decoration": ""
    });

    $en.click(function() {
        $(".eng").css("display", "");
        $(".jpn").css("display", "none");
        $en.css({
            "color": "#e0d6b8",
            "text-decoration": "underline"
        });
        $ja.css({
            "color": "#d9cc8b",
            "text-decoration": ""
        });
    });

    $ja.click(function() {
        $(".eng").css("display", "none");
        $(".jpn").css("display", "");
        $en.css({
            "color": "#d9cc8b",
            "text-decoration": ""
        });
        $ja.css({
            "color": "#e0d6b8",
            "text-decoration": "underline"
        });
    });
});