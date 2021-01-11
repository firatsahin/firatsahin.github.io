// hash navigation - BEGIN
let defaultHashRoute = "#/home";
function hashHasRoute() {
    return (location.hash != "" && location.hash.indexOf("#/") == 0 && location.hash != "#/"); // hash shouldn't be empty AND should start with #/ AND shouldn't be exactly "#/"
}
function getHashSegments() {
    if (!hashHasRoute()) return [];
    let hashSegments = location.hash.substr(2).split('/');
    for (let i = 0; i < hashSegments.length; i++) { // eliminate empty segments
        if (!hashSegments[i]) {
            hashSegments.splice(i, 1);
            i--;
        }
    }
    return hashSegments;
}
function updateHashRoute(hashRoute, replace) {
    if (replace) {
        window.history.replaceState({}, document.title, hashRoute);
        $(window).trigger("hashchange");
    } else location.href = hashRoute;
}
$(window).bind("hashchange", function (e) {
    l("hash changed to: " + location.hash);

    let hashSegments = getHashSegments();
    l("hash segments:", hashSegments);

    if (hashSegments.length === 0) { // if nothing in hash, push the default hash route
        updateHashRoute(defaultHashRoute, true);
        return;
    }

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
                }); // get & execute js
            }, function (err) {
                l(err);
            });
            tipsDiv.removeClass('hidden');
        }
    } else { // static basic content
        $.get('content/' + hashSegments[0] + '.html?_=' + Date.now()).then(function (result) {
            $(result).appendTo(rootDiv); // append html
        }, function (err) {
            l(err);
        });
        tipsDiv.addClass('hidden');
    }

});
// hash navigation - END


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
        let hashSegments = getHashSegments();
        if (hashSegments.length < 2) return;
        if (hashSegments[0] === 'module') {
            window.open("https://github.com/firatsahin/firatsahin.github.io/tree/main/content/module/" + hashSegments[1]);
        }
    });
});
// document ready - END