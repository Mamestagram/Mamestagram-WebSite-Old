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

let scaleWidth, leftPos, idx;
$(window).on("resize", function() {
    scaleWidth = ($(".subscription ul .prices .price-bar .weeks-scale").width() + 10) / $(".subscription ul .prices .price-bar .weeks-scale li").length;
    leftPos = scaleWidth * idx;
    console.log(scaleWidth, leftPos, idx);
    if (idx > 0 && idx < $(".subscription ul .prices .price-bar .weeks-scale li").length - 1) {
        leftPos += scaleWidth / 2 - 5
    }
    else if (idx > 0) {
        leftPos = $(".subscription ul .prices .price-bar .weeks-scale").width();
    }
    $(".subscription ul .prices .price-bar").css({
        "--scaleWidth": `${scaleWidth}px`,
        "--leftPos": `${leftPos}px`,
        "--pickPos": `${leftPos - 4}px`
    });
});

$(function() {
    $("main .contents .functions-list :not(.toggle-btn) .paid").addClass("hide");
    $("main .language ul .en").addClass("selected");
    $("main .ja").addClass("hide-lang");
    $(".subscription .purchase a img").addClass("glow");

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

    scaleWidth = ($(".subscription ul .prices .price-bar .weeks-scale").width() + 10) / $(".subscription ul .prices .price-bar .weeks-scale li").length;
    leftPos = 0;
    idx = 0;
    $(".subscription ul .prices .price-bar").css({
        "--scaleWidth": `${scaleWidth}px`,
        "--leftPos": `${leftPos}px`,
        "--pickPos": `${leftPos - 4}px`
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

    $("main").on("click", ".subscription ul .prices .price-bar .weeks-scale li", function() {
        idx = $(this).index();
        leftPos = scaleWidth * idx;
        if (idx > 0 && idx < $(".subscription ul .prices .price-bar .weeks-scale li").length - 1) {
            leftPos += scaleWidth / 2 - 5
        }
        else if (idx > 0) {
            leftPos = $(".subscription ul .prices .price-bar .weeks-scale").width();
        }
        $(".subscription ul .prices .price-bar .weeks-scale li").removeClass("selected");
        $(this).addClass("selected");
        $(".subscription ul .prices .price-bar").css({
            "--leftPos": `${leftPos}px`,
            "--pickPos": `${leftPos - 4}px`
        });
        $(".subscription ul .prices .price-bar .color .tooltip-element .tooltip .price").text($(this).find(".price").text());
        $(".subscription ul .prices .price-bar .color .tooltip-element .tooltip .weeks.en").text($(this).find(".weeks.en").text());
        $(".subscription ul .prices .price-bar .color .tooltip-element .tooltip .discount.en").text($(this).find(".discount.en").text());
        $(".subscription ul .prices .price-bar .color .tooltip-element .tooltip .weeks.ja").text($(this).find(".weeks.ja").text());
        $(".subscription ul .prices .price-bar .color .tooltip-element .tooltip .discount.ja").text($(this).find(".discount.ja").text());
        $(".subscription ul .prices .price-bar div.weeks input").val(idx + 4);
    });

    $("main").on("input", ".subscription ul .prices .price-bar div.weeks input", function() {
        const reg = /[^0-9]+/
        if (!reg.test($(this).val())) {
            idx = Math.max(4, Math.min(48, $(this).val())) - 1;
            leftPos = scaleWidth * idx;
            if (idx > 0 && idx < $(".subscription ul .prices .price-bar .weeks-scale li").length - 1) {
                leftPos += scaleWidth / 2 - 5
            }
            else if (idx > 0) {
                leftPos = $(".subscription ul .prices .price-bar .weeks-scale").width();
            }
            $(".subscription ul .prices .price-bar .weeks-scale li").removeClass("selected");
            $(".subscription ul .prices .price-bar .weeks-scale li").eq(idx).addClass("selected");
            $(".subscription ul .prices .price-bar").css({
                "--leftPos": `${leftPos}px`,
                "--pickPos": `${leftPos - 4}px`
            });
            $(".subscription ul .prices .price-bar .color .tooltip-element .tooltip .price").text($(".subscription ul .prices .price-bar .weeks-scale li").eq(idx).find(".price").text());
            $(".subscription ul .prices .price-bar .color .tooltip-element .tooltip .weeks.en").text($(".subscription ul .prices .price-bar .weeks-scale li").eq(idx).find(".weeks.en").text());
            $(".subscription ul .prices .price-bar .color .tooltip-element .tooltip .discount.en").text($(".subscription ul .prices .price-bar .weeks-scale li").eq(idx).find(".discount.en").text());
            $(".subscription ul .prices .price-bar .color .tooltip-element .tooltip .weeks.ja").text($(".subscription ul .prices .price-bar .weeks-scale li").eq(idx).find(".weeks.ja").text());
            $(".subscription ul .prices .price-bar .color .tooltip-element .tooltip .discount.ja").text($(".subscription ul .prices .price-bar .weeks-scale li").eq(idx).find(".discount.ja").text());
        }
    });

    let time = 0;
    setInterval(function() {
        if (++time % 3 === 0) {
            if ($(".subscription .purchase a img").hasClass("glow")) {
                $(".subscription .purchase a img").removeClass("glow");
                $(".subscription .purchase a img").addClass("fade");
            }
            else {
                $(".subscription .purchase a img").removeClass("fade");
                $(".subscription .purchase a img").addClass("glow");
            }
            time = 0;
        }
    }, 1000);
});