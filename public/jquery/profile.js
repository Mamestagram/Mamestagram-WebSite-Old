$(function() {
    // "show more"をクリックしたとき
    $("main .show-more").click(function() {
        var $selection, $nextbtn, amt = 50;

        while (!$(this).hasClass(`to${amt}`)) {
            amt += 50;
        }
        if ($(this).hasClass("bp")) {
            $selection = $("main .bestpp");
            $nextbtn = $(`main .bp.to${amt + 50}`);
        }
        else if ($(this).hasClass("mp")) {
            $selection = $("main .mostplays");
            $nextbtn = $(`main .mp.to${amt + 50}`);
        }
        else if ($(this).hasClass("rp")) {
            $selection = $("main .recentplays");
            $nextbtn = $(`main .rp.to${amt + 50}`);
        }

        console.log(amt);
        $selection.css("max-height", 60 * amt + 38);
        $(this).hide();
        $nextbtn.show();
    });

    $("main .verified").hover(function() {
        $(this).hide();
        $("main .verified-hover").show();
    });

    // "Show all"をクリックしたとき
    $("main .recentplays .all").click(function() {
        $(this).css({
            "filter": `invert(${0}%)`,
            "opacity": 1
        });
        $("main .recentplays .passed").css({
            "filter": "",
            "opacity": ""
        });
        if ($("body").width() > 767) {
            $("main .recentplays").css("max-height", `${338}px`);
            $("main .recentplays .data").show();
            $("main .recentplays .data-passed").hide();
        }
        else {
            $("main .recentplays").css("max-height", `${450}px`);
            $("main .recentplays .data-mobile").show();
            $("main .recentplays .data-mobile-passed").hide();
        }
        $("main .rp.to50").show();
        $("main .rp.nof").hide();
    });

    // "Only passed"をクリックしたとき
    $("main .recentplays .passed").click(function() {
        $(this).css({
            "filter": `invert(${0}%)`,
            "opacity": 1
        });
        $("main .recentplays .all").css({
            "filter": "",
            "opacity": ""
        });
        if ($("body").width() > 767) {
            $("main .recentplays").css("max-height", `${338}px`);
            $("main .recentplays .data").hide();
            $("main .recentplays .data-passed").show();
        }
        else {
            $("main .recentplays").css("max-height", `${450}px`);
            $("main .recentplays .data-mobile").hide();
            $("main .recentplays .data-mobile-passed").show();
        }
        $("main .rp").hide();
        $("main .rp.nof.to50").show();
    });
});