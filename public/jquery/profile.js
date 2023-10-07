$(function() {
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
});