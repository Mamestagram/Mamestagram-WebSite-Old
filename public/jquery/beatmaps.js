$(function() {
    var $menu = $(".ranking .wrap .flex .selection .special .menu-title");
    var $dropdown = $(".ranking .wrap .flex .selection .special .dropdown");
    const audioElement = document.querySelector("audio");
    var $audio = document.getElementById("preview");
    var $play = document.getElementById("play-audio");
    var $btn = $(".map-info .contents .box .link button");
    var $icon = $(".map-info .contents .box .link button i");
    var $mods = $(".ranking .wrap .mods-selection li");
    let time = 0, stop = true;

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
        console.log(time);
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

    $mods.click(function() {
        $(this).children("button").addClass("clicked");
    });
});