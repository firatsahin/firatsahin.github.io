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

    let hashSegments = location.hash.substr(2).split('/');
    for (let i = 0; i < hashSegments.length; i++) { // eliminate empty segments
        if (!hashSegments[i]) {
            hashSegments.splice(i, 1);
            i--;
        }
    }
    l("hash segments:", hashSegments);

    if (hashSegments.length === 0) return;

    // clear previous module events / data etc.
    if (typeof moduleOn === 'function') moduleOn = null;
    if (typeof moduleOff === 'function') {
        moduleOff();
        moduleOff = null;
    }

    rootDiv.empty();
    if (hashSegments.length > 1) { // advanced content (with js & css)
        if (hashSegments[0] === 'module') {
            $.get('content/module/' + hashSegments[1] + '/' + hashSegments[1] + '.html?_=' + Date.now()).then(function (result) {
                $(result).appendTo(rootDiv); // append html
                $("<link/>", { // append css
                    rel: "stylesheet",
                    type: "text/css",
                    href: 'content/module/' + hashSegments[1] + '/css/' + hashSegments[1] + '.css?_=' + Date.now()
                }).appendTo(rootDiv);
                $.getScript('content/module/' + hashSegments[1] + '/js/' + hashSegments[1] + '.js', function () {
                    //setTimeout(moduleOn,10);
                    moduleOn();
                }); // append js
            }, function (err) {
                l(err);
            });
        }
    } else { // static basic content
        $.get('content/' + hashSegments[0] + '.html?_=' + Date.now()).then(function (result) {
            $(result).appendTo(rootDiv); // append html
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