$(function() {
    var $jp = $("main .language .jp");
    var $en = $("main .language .en");

    $(".eng").css("display", "");
    $(".jpn").css("display", "none");
    $en.css({
        "color": "#e0d6b8",
        "text-decoration": "underline"
    });
    $jp.css({
        "color": "#d9cc8b",
        "text-decoration": ""
    });
    /*
    $(".eng").css("display", "none");
    $(".jpn").css("display", "");
    $en.css({
        "color": "#d9cc8b",
        "text-decoration": ""
    });
    $jp.css({
        "color": "#e0d6b8",
        "text-decoration": "underline"
    });
    */

    $en.click(function() {
        $(".eng").css("display", "");
        $(".jpn").css("display", "none");
        $en.css({
            "color": "#e0d6b8",
            "text-decoration": "underline"
        });
        $jp.css({
            "color": "#d9cc8b",
            "text-decoration": ""
        });
    });

    $jp.click(function() {
        $(".eng").css("display", "none");
        $(".jpn").css("display", "");
        $en.css({
            "color": "#d9cc8b",
            "text-decoration": ""
        });
        $jp.css({
            "color": "#e0d6b8",
            "text-decoration": "underline"
        });
    });
});