$(function() {
    const audioElement = document.querySelector("audio");
    var $audio = document.getElementById("preview");
    var $play = document.getElementById("play-audio");
    var $btn = $(".map-info .contents .box .link button");
    var $icon = $(".map-info .contents .box .link button i");
    let time = 0, stop = true;

    audioElement.volume = 0.5;

    const timer = setInterval(function() {
        if (stop) {
            return;
        }
        else if (++time >= 1000) {
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
});