// helper functions
let l = console.log;
$(document).on("click","a[href='#']",function (e) {
    e.preventDefault();
});


// hash navigation - BEGIN
let defaultHashRoute = "#/home";
//defaultHashRoute = "#/example/sdfdsf-ertter";
//defaultHashRoute = "#/game/retrtyr-345354";

//let possibleTabs = ["profile", "resume", "portfolio", "contact", "blog"];
function hashHasRoute() {
    return (location.hash != "" && location.hash.indexOf("#/") == 0 && location.hash != "#/");
}
function updateHashRoute(hashRoute, replace) {
    if (replace) {
        window.history.replaceState({}, document.title, hashRoute);
        $(window).trigger("hashchange");
    } else location.href = hashRoute;
}
$(window).bind("hashchange", function (e) {
    l("hash changed to: " + location.hash);

    if (!hashHasRoute()) {
        updateHashRoute(defaultHashRoute, true);
        return;
    } // hash shouldn't be empty AND should start with #/ AND shouldn't be exactly "#/"

    let hashRoute = location.hash;
    let hashSegments = hashRoute.substr(2).split('/');
    l("hash segments:", hashSegments);

    rootDiv.empty();
    if (hashSegments.length > 1) { // advanced content (with js & css)

    } else { // static basic content
        $.get('content/' + hashSegments[0] + '.html').then(function (result) {
            $(result).appendTo(rootDiv);
        }, function (err) {
            l(err);
        });
    }

});
// hash navigation - END


// document ready - BEGIN
let rootDiv;
$(function () {
    l("jQuery doc ready");
    rootDiv = $("div#right-content-div");
    $(window).trigger("hashchange"); // trigger here (bc hashchange event needs rootDiv ready)
});
// document ready - END