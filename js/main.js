// document ready - BEGIN
let rootDiv;
let tipsDiv;
$(function () {
    l("jQuery doc ready");

    // initial definitions
    rootDiv = $("div#right-content-div");
    tipsDiv = $("div#tips-div");

    $(window).trigger("hashchange"); // trigger here (bc hashchange event needs rootDiv ready)

    // Link: check the code > click event
    tipsDiv.find("a.lnk-check-the-code").click(function () {
        let hashSegments = hashNav.getHashSegments();
        if (hashSegments.length < 2) return;
        if (hashSegments[0] === 'module') {
            window.open("https://github.com/firatsahin/firatsahin.github.io/tree/main/content/module/" + hashSegments[1] + "/js/" + hashSegments[1] + ".js");
        }
    });

    // mobile > right-top Menu button click
    $("div#btn-mobile-menu-toggler").click(function () {
        $("body").addClass('side-menu-open');
    });
    // overlay click event
    $("#overlay").click(function () {
        $("body").removeClass('side-menu-open');
    })
});
// document ready - END