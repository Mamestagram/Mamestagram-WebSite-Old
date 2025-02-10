$(window).on("scroll", function() {
    let pos = new Array(3);
    for (let i = 0; i < $("main article section").length; i++) {
        pos[i] = $("main article section").eq(i).offset().top - 200;
    }
    for (let i = 0; i < $("main .menu ul li").length; i++) {
        if ($(window).scrollTop() >= pos[i]) {
            $("main .menu ul li").removeClass("act");
            $("main .menu ul li").eq(i).addClass("act");
        }
    }
});

$(function() {
    $("main .contents .functions-list :not(.toggle-btn) .paid").addClass("hide");
    $("main .language ul .en").addClass("selected");
    $("main .ja").addClass("hide-lang");
    $(".ko-fi .purchase a img").addClass("glow");

    $("main").on("click", ".language ul li", function() {
        $("main .language ul li").removeClass("selected");
        if ($(this).attr("class") === "btn-en") {
            $("main .en").removeClass("hide-lang");
            $("main .language ul .en").addClass("selected");
            $("main .ja").addClass("hide-lang");
        }
        else {
            $("main .ja").removeClass("hide-lang");
            $("main .language ul .ja").addClass("selected");
            $("main .en").addClass("hide-lang");
        }
    });

    $("main").on("click", ".contents .functions-list li .toggle-btn ul", function() {
        $(this).addClass("move");
        if ($(this).parent().parent().hasClass("free")) {
            $(this).parent().parent().removeClass("free");
            $(this).parent().parent().addClass("paid");
            $(this).parent().parent().children(".wrap").find(".paid").removeClass("hide");
            $(this).parent().parent().children(".wrap").find(".free").addClass("hide");
        }
        else {
            $(this).parent().parent().removeClass("paid");
            $(this).parent().parent().addClass("free");
            $(this).parent().parent().children(".wrap").find(".free").removeClass("hide");
            $(this).parent().parent().children(".wrap").find(".paid").addClass("hide");
        }
        setTimeout(function() {
            $(".contents .functions-list li .toggle-btn ul").removeClass("move");
        }, 60);
    });

    let time = 0;
    setInterval(function() {
        if (++time % 3 === 0) {
            if ($(".ko-fi .purchase a img").hasClass("glow")) {
                $(".ko-fi .purchase a img").removeClass("glow");
                $(".ko-fi .purchase a img").addClass("fade");
            }
            else {
                $(".ko-fi .purchase a img").removeClass("fade");
                $(".ko-fi .purchase a img").addClass("glow");
            }
            time = 0;
        }
    }, 1000);
});