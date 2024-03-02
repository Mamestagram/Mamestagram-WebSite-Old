$(function() {
    var $menu = $(".ranking .wrap .flex .selection .special .menu-title");
    var $dropdown = $(".ranking .wrap .flex .selection .special .dropdown");
    const audioElement = document.querySelector("audio");
    var $audio = document.getElementById("preview");
    var $play = document.getElementById("play-audio");
    var $btn = $(".map-info .contents .box .link button");
    var $icon = $(".map-info .contents .box .link button i");
    var $td = $(".ranking .wrap .flex .selection .special .ts");
    var $mods = $(".ranking .wrap .mods-selection li");
    let time = 0, stop = true;

    setInterval(function() {
        if ($("body").width() <= 1232 && $("body").width() > 767) {
            var amt = $(".ranking .wrap .mods-selection ul li").length - 1;
            const wid = Math.min(540, 30 + 38 * amt);
            $(".ranking .wrap .mods-selection ul").css("width", `${wid}px`);
        }
        else {
            $(".ranking .wrap .mods-selection ul").css("width", "");
        }
    });

    audioElement.volume = 0.5;

    setInterval(function() {
        if (stop) {
            return;
        }
        if (++time >= 1000) {
            stop = true;
            time = 0;
            $btn.removeClass("play");
            $btn.addClass("pause");
            $icon.removeClass("fa-solid fa-pause");
            $icon.addClass("fa-solid fa-play");
        }
    }, 10);

    $play.addEventListener("click", function() {
        if ($btn.hasClass("play")) {
            stop = true;
            $btn.removeClass("play");
            $btn.addClass("pause");
            $icon.removeClass("fa-solid fa-pause");
            $icon.addClass("fa-solid fa-play");
            $audio.pause();
        }
        else if ($btn.hasClass("pause")) {
            stop = false;
            $btn.removeClass("pause");
            $btn.addClass("play");
            $icon.removeClass("fa-solid fa-play");
            $icon.addClass("fa-solid fa-pause");
            $audio.play();
        }
    });

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

    $td.click(function() {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
        }
        else {
            $(this).addClass("selected");
        }
    });

    $mods.click(function() {
        if ($(this).children("button").hasClass("selected")) {
            $(this).children("button").removeClass("selected");
        }
        else {
            $(this).children("button").addClass("selected");
        }
    });
});