$(function() {
    var $mode = [
        $("main .ranking-table .mode-0"),
        $("main .ranking-table .mode-1"),
        $("main .ranking-table .mode-2"),
        $("main .ranking-table .mode-3"),
        $("main .ranking-table .mode-4"),
        $("main .ranking-table .mode-5"),
        $("main .ranking-table .mode-6"),
        $("main .ranking-table .mode-7"),
        $("main .ranking-table .mode-8")
    ];
    var $img = [
        $(".mode .std"),
        $(".mode .taiko"),
        $(".mode .catch"),
        $(".mode .mania")
    ]
    var $imghov = [
        $(".mode .std:hover"),
        $(".mode .taiko:hover"),
        $(".mode .catch:hover"),
        $(".mode .mania:hover")
    ]
    var $sp = [
        $(".special .classic"),
        $(".special .relax"),
        $(".special .auto-pilot")
    ]
    var $sphov = [
        $(".special .classic:hover"),
        $(".special .relax:hover"),
        $(".special .auto-pilot:hover")
    ]
    var $select = $("main .selection ul li");
    const mode = ["std", "taiko", "catch", "mania"],
        sp = ["classic", "relax", "auto-pilot"];
    let m = 0, s = 0;

    $img[0].css({
        "filter": "invert(" + 0 + "%)",
        "opacity": 100 + "%"
    });
    $sp[0].css({
        "border-bottom": 2 + "px solid #fdfdfd",
        "filter": "invert(" + 0 + "%)",
        "opacity": 100 + "%"
    });
    for (let i = 1; i < $mode.length; i++) {
        $mode[i].css("display", "none");
    }

    $select.click(function() {
        for (let el of mode) {
            if ($(this).hasClass(el)) {
                m = mode.indexOf(el);
                for (let j = 0; j < $img.length; j++) {
                    if (j === m) {
                        $img[j].css({
                            "filter": "invert(" + 0 + "%)",
                            "opacity": 100 + "%"
                        });
                    }
                    else {
                        $img[j].css({
                            "filter": "invert(" + 30 + "%)",
                            "opacity": 95 + "%"
                        });
                    }
                }
                if (m === 3) {
                    $sp[0].css("display", "");
                    for (let i = 1; i < $sp.length; i++) {
                        $sp[i].css("display", "none");
                    }
                }
                else if (m !== 0) {
                    for (let i = 0; i < $sp.length - 1; i++) {
                        $sp[i].css("display", "");
                    }
                    $sp[2].css("display", "none");
                }
                else {
                    for (let i = 0; i < $sp.length; i++) {
                        $sp[i].css("display", "");
                    }
                }
            }
        }
        for (let el of sp) {
            if ($(this).hasClass(el)) {
                s = sp.indexOf(el);
                for (let j = 0; j < $sp.length; j++) {
                    if (j === s) {
                        $sp[j].css({
                            "border-bottom": 2 + "px solid #fdfdfd",
                            "filter": "invert(" + 0 + "%)",
                            "opacity": 100 + "%"
                        });
                    }
                    else {
                        $sp[j].css({
                            "border-bottom": "unset",
                            "filter": "invert(" + 30 + "%)",
                            "opacity": 95 + "%"
                        });
                    }
                    if (s === 1) {
                        for (let i = 0; i < $img.length - 1; i++) {
                            $img[i].css({
                                "display": "",
                                "pading": 10 + "px"
                            });
                        }
                        $img[3].css({
                            "display": "none",
                            "pading": 0
                        });
                    }
                    else if (s === 2) {
                        $img[0].css({
                            "display": "",
                            "pading": 10 + "px"
                        });
                        for (let i = 1; i < $img.length; i++) {
                            $img[i].css({
                                "display": "none",
                                "pading": 0
                            });
                        }
                    }
                    else {
                        for (let i = 0; i < $img.length; i++) {
                            $img[i].css({
                                "display": "",
                                "pading": 10 + "px"
                            });
                        }
                    }
                }
            }
        }
        for (let i = 0; i < $mode.length; i++) {
            if (i === s * 4 + m) {
                $mode[i].css("display", "");
            }
            else {
                $mode[i].css("display", "none");
            }
        }
    });
});