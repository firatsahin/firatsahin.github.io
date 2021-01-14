// hash navigation - BEGIN
let hashNav = {
    defaultRoute: "#/home",
    hashHasRoute: () => {
        return (location.hash != "" && location.hash.indexOf("#/") == 0 && location.hash != "#/"); // hash shouldn't be empty AND should start with #/ AND shouldn't be exactly "#/"
    },
    getHashSegments: () => {
        if (!hashNav.hashHasRoute()) return [];
        let hashSegments = location.hash.substr(2).split('/');
        for (let i = 0; i < hashSegments.length; i++) { // eliminate empty segments
            if (!hashSegments[i]) {
                hashSegments.splice(i, 1);
                i--;
            }
        }
        return hashSegments;
    },
    updateHashRoute: (hashRoute, replace) => {
        if (replace) {
            window.history.replaceState({}, document.title, hashRoute);
            $(window).trigger("hashchange");
        } else location.href = hashRoute;
    }
};

$(window).bind("hashchange", function (e) {
    l("hash changed to: " + location.hash);

    let hashSegments = hashNav.getHashSegments();
    l("hash segments:", hashSegments);

    if (hashSegments.length === 0) { // if nothing in hash, push the default hash route
        hashNav.updateHashRoute(hashNav.defaultRoute, true);
        return;
    }

    $("body").removeClass('side-menu-open'); // close left menu on route change
    $("div#left-side-menu-div .left-menu-subgroup ul li a").removeClass('active').filter(function () { // add active class to current route
        //l($(this).prop('href'), $(this).attr('href'), location.hash);
        return ($(this).attr('href') === location.hash);
    }).addClass('active');

    // clear previous module events / data etc.
    if (typeof moduleOn === 'function') moduleOn = null;
    if (typeof moduleOff === 'function') {
        setTimeout(moduleOff); // advantage of setTimeout here: [if moduleOff crashes inside, hash nav still works fine] (async task)
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
                    if (typeof moduleOn === 'function') setTimeout(moduleOn); // advantage of setTimeout here: [if moduleOn crashes inside, hash nav still works fine] (async task)
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