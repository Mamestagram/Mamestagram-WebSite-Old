$(window).resize(function() {
    if ($("body").width() <= 1232) {
        var $table = $("main .member .member-table");
        let wid = $table.width();
        wid -= 3 + 30 + 10 + $("main .member .member-table .data .country").eq(0).width() + $("main .member .member-table .data .acc").eq(0).width() + $("main .member .member-table .data .plays").eq(0).width() + $("main .member .member-table .data .pp").eq(0).width();
        $("main .member .member-table .data .username").css("width", `${wid}px`);
    }

    if ($("body").width() <= 767) {
        let hei = 35;
        for (let i = 0; i < Math.min(5, $("main .bestpp div .data-mobile").length); i++) {
            hei += $("main .bestpp div .data-mobile").eq(i).height() + 5;
        }
        hei = Math.max(452, hei);
        $("main .bestpp").css("max-height", `${hei}px`);
        hei = 35;
        for (let i = 0; i < Math.min(5, $("main .recentplays div .data-mobile-passed").length); i++) {
            hei += $("main .recentplays div .data-mobile-passed").eq(i).height() + 5;
        }
        hei = Math.max(452, hei);
        $("main .recentplays").css("max-height", `${hei}px`);
        $("main .recentplays .data-mobile").hide();
        $("main .recentplays .data-mobile-passed").show();
    }
    else {
        $("main .bestpp, main .mostplays, main .recentplays").css({
            "min-height": "",
            "max-height": ""
        });
    }
    $("main .show-more.bp").each(function(i) {
        if (i === 0) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
    $("main .show-more.mp").each(function(i) {
        if (i === 0) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
    $("main .show-more.rp").each(function(i) {
        if (i === 0) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
});

$(function() {
    let rs = "passed";
    if ($("body").width() <= 1232) {
        var $table = $("main .member .member-table");
        var $data = $("main .member .member-table .data").eq(0);
        let wid = $table.width();
        wid -= 3 + 30 + 10 + $data.children(".country").width() + $data.children(".acc").width() + $data.children(".plays").width() + $data.children(".pp").width();
        $("main .member .member-table .data .username").css("width", `${wid}px`);
    }

    if ($("body").width() <= 767) {
        let hei = 35;
        for (let i = 0; i < Math.min(5, $("main .bestpp div .data-mobile").length); i++) {
            hei += $("main .bestpp div .data-mobile").eq(i).height() + 5;
        }
        hei = Math.max(452, hei);
        $("main .bestpp").css({
            "min-height": `${hei}px`,
            "max-height": `${hei}px`
        });
        hei = 35;
        for (let i = 0; i < Math.min(5, $("main .recentplays div .data-mobile-passed").length); i++) {
            hei += $("main .recentplays div .data-mobile-passed").eq(i).height() + 5;
        }
        hei = Math.max(452, hei);
        $("main .recentplays").css({
            "min-height": `${hei}px`,
            "max-height": `${hei}px`
        });
    }

    // relationshipクリック
    $("body").click(function(e) {
        var $button = $("main .player-banner .relationship span");
        var $list = $("main .player-banner .relationship .list");
        var $wrap = $("main .player-banner .relationship .list .wrap");
        var $close = $("main .player-banner .relationship .list .wrap h1 .fa-xmark");
        var $relationshipList;

        //ユーザーボタンクリック時
        if (!$(e.target).closest($button).length && !$(e.target).closest($wrap).length) {
            $list.removeClass("show");
        }
        else if ($(e.target).closest($wrap).length) {
            if ($(e.target).closest($close).length) {
                $list.removeClass("show");
            }
        }
        else {
            if ($(e.target).closest("main .player-banner .relationship .mutual").length) {
                $relationshipList = $("main .player-banner .relationship .mutual-list");
            }
            else if ($(e.target).closest("main .player-banner .relationship .following").length) {
                $relationshipList = $("main .player-banner .relationship .following-list");
            }
            else if ($(e.target).closest("main .player-banner .relationship .followers").length) {
                $relationshipList = $("main .player-banner .relationship .followers-list");
            }
            if ($relationshipList.hasClass("show")) {
                $relationshipList.removeClass("show");
            }
            else {
                $relationshipList.addClass("show");
            }
        }
    });

    // specialクリック
    var $menu = $("main .player-banner .selection .special .menu-title");
    var $dropdown = $("main .player-banner .selection .special .dropdown");
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

    // me!のeditボタンクリック
    $("main .me .edit-button").click(function() {
        const textarea = document.getElementById("me-editor");
        $(this).hide();
        $("main .me .contents .bbcode-profile").hide();
        $("main .me .contents form").show();
        textarea.focus();
    });
    $("main .me .contents .edit-me").click(function() {
        $("main .me .contents .bbcode-profile").hide();
        $("main .me .contents form").show();
    });

    // spoilerboxのnameクリック
    var $boxName = $("main .me .contents .spoilerbox p");
    $boxName.click(function() {
        if ($(this).hasClass("down")) {
            $(this).removeClass("down");
            $("main .me .contents .spoilerbox div").eq($boxName.index(this)).removeClass("show-content");
        }
        else {
            $(this).addClass("down");
            $("main .me .contents .spoilerbox div").eq($boxName.index(this)).addClass("show-content");
        }
    });

    // bbコードツールボタンのクリック
    $("main .me .contents form .editor .bb-button p").click(function() {
        const textarea = document.getElementById("me-editor");
        textarea.focus();
        let insertText, cursorOffset;
        switch ($(this).attr("class")) {
            case "heading":
                insertText = "[heading][/heading]";
                cursorOffset = 9;
                break;
            case "bold":
                insertText = "[b][/b]";
                cursorOffset = 3;
                break;
            case "italic":
                insertText = "[i][/i]";
                cursorOffset = 3;
                break;
            case "underline":
                insertText = "[u][/u]";
                cursorOffset = 3;
                break;
            case "strike":
                insertText = "[s][/s]";
                cursorOffset = 3;
                break;
            case "color":
                insertText = `[color=][/color]`;
                cursorOffset = 8;
                break;
            case "spoiler-text":
                insertText = "[spoiler][/spoiler]";
                cursorOffset = 9;
                break;
            case "center":
                insertText = "[center][/center]";
                cursorOffset = 8;
                break;
            case "spoilerbox":
                insertText = `[box=][/box]`;
                cursorOffset = 6;
                break;
            case "list":
                insertText = "[list]\n";
                insertText += "[*]\n";
                insertText += "[/list]";
                cursorOffset = 10;
                break;
            case "num-list":
                insertText = `[list=dec]\n`;
                insertText += "[*]\n";
                insertText += "[/list]";
                cursorOffset = 14;
                break;
            case "quote":
                insertText = `[quote=][/quote]`;
                cursorOffset = 8;
                break;
            case "image":
                insertText = "[img][/img]";
                cursorOffset = 5;
                break;
            case "url":
                insertText = `[url=][/url]`;
                cursorOffset = 6;
                break;
            case "profile":
                insertText = `[profile=][/profile]`;
                cursorOffset = 10;
                break;
            case "code":
                insertText = "[c][/c]";
                cursorOffset = 3;
                break;
        }
        const cursorPos = textarea.selectionStart;
        const nextCursorPos = cursorPos + cursorOffset;
        const textBefore = textarea.value.substring(0, cursorPos);
        const textAfter = textarea.value.substring(cursorPos);
        textarea.value = textBefore + insertText + textAfter;
        textarea.setSelectionRange(nextCursorPos, nextCursorPos);
    });

    // "font size"のオプションをクリック
    var $fontsize = $("main .me .contents form .editor .bb-button .size")
    $fontsize.change(function() {
        const textarea = document.getElementById("me-editor");
        textarea.focus();
        let insertText, cursorOffset;
        switch ($(this).val()) {
            case "tiny":
                insertText = `[size=50][/size]`;
                cursorOffset = 15;
                break;
            case "small":
                insertText = `[size=85][/size]`;
                cursorOffset = 15;
                break;
            case "normal":
                insertText = `[size=100][/size]`;
                cursorOffset = 16;
                break;
            case "large":
                insertText = `[size=150][/size]`;
                cursorOffset = 16;
                break;
        }
        $(this).val("title");
        const cursorPos = textarea.selectionStart;
        const nextCursorPos = cursorPos + cursorOffset;
        const textBefore = textarea.value.substring(0, cursorPos);
        const textAfter = textarea.value.substring(cursorPos);
        textarea.value = textBefore + insertText + textAfter;
        textarea.setSelectionRange(nextCursorPos, nextCursorPos);
    });

    // "show more"をクリックしたとき
    $("main .show-more").click(function() {
        var $selection, $nextbtn, $subject;
        let hei, amt = 50;

        while (!$(this).hasClass(`to${amt}`)) {
            amt += 50;
        }
        if ($(this).hasClass("bp")) {
            $selection = $("main .bestpp");
            $nextbtn = $(`main .bp.to${amt + 50}`);
            $subject = $("main .bestpp div .data-mobile");
        }
        else if ($(this).hasClass("mp")) {
            $selection = $("main .mostplays");
            $nextbtn = $(`main .mp.to${amt + 50}`);
        }
        else if ($(this).hasClass("rp")) {
            $selection = $("main .recentplays");
            $nextbtn = $(`main .rp${$(this).hasClass("nof") ? ".nof" : ""}.to${amt + 50}`);
            $subject = $(`main .recentplays div .data-mobile${rs === "passed" ? "-passed" : ""}`);
        }
        if ($("body").width() <= 767) {
            hei = 35;
            if ($subject !== undefined) {
                for (let i = 0; i < Math.min(amt, $subject.length); i++) {
                    hei += $subject.eq(i).height() + 5;
                }
            }
            else {
                hei += 59 * amt;
            }
        }
        else {
            hei = 50 + 60 * amt;
        }
        $selection.css("max-height", `${hei}px`);
        $(this).hide();
        $nextbtn.show();
    });

    $("main .verified").hover(function() {
        $(this).hide();
        $("main .verified-hover").show();
    });

    // "Show all"をクリックしたとき
    $("main .recentplays .all").click(function() {
        rs = "all";
        $("main .recentplays div .nothing").show();
        $("main .recentplays div .nothing-passed").hide();
        $(this).css({
            "filter": `invert(${0}%)`,
            "opacity": 1
        });
        $("main .recentplays .passed").css({
            "filter": "",
            "opacity": ""
        });
        if ($("body").width() > 767) {
            $("main .recentplays").css("max-height", `${350}px`);
            $("main .recentplays .data").show();
            $("main .recentplays .data-passed").hide();
        }
        else {
            let hei = 35;
            for (let i = 0; i < Math.min(5, $("main .recentplays div .data-mobile").length); i++) {
                hei += $("main .recentplays div .data-mobile").eq(i).height() + 5;
            }
            hei = Math.max(452, hei);
            $("main .recentplays").css({
                "min-height": `${hei}px`,
                "max-height": `${hei}px`
            });
            $("main .recentplays .data-mobile").show();
            $("main .recentplays .data-mobile-passed").hide();
        }
        $("main .rp.to50").show();
        $("main .rp.nof").hide();
    });

    // "Only passed"をクリックしたとき
    $("main .recentplays .passed").click(function() {
        rs = "passed";
        $(this).css({
            "filter": `invert(${0}%)`,
            "opacity": 1
        });
        $("main .recentplays .all").css({
            "filter": "",
            "opacity": ""
        });
        $("main .recentplays div .nothing").hide();
        $("main .recentplays div .nothing-passed").show();
        if ($("body").width() > 767) {
            $("main .recentplays").css("max-height", `${350}px`);
            $("main .recentplays .data").hide();
            $("main .recentplays .data-passed").show();
        }
        else {
            let hei = 35;
            for (let i = 0; i < Math.min(5, $("main .recentplays div .data-mobile-passed").length); i++) {
                hei += $("main .recentplays div .data-mobile-passed").eq(i).height() + 5;
            }
            hei = Math.max(452, hei);
            $("main .recentplays").css({
                "min-height": `${hei}px`,
                "max-height": `${hei}px`
            });
            $("main .recentplays .data-mobile").hide();
            $("main .recentplays .data-mobile-passed").show();
        }
        $("main .rp").hide();
        $("main .rp.nof.to50").show();
    });
});