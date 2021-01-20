moduleOn = () => {
    let moduleRoot = rootDiv.find(">div");
    l("module on called");

    let pageLog = (html) => {
        $("<div>").html(html).prependTo("#console-root");
    };

    $("#js-to-execute").val('let a = 23;\n' +
        'a *= 3;\n' +
        'l("Hi!", "a:", a);\n' +
        'pageLog("a=" + a + " Thanks!");');

    $("#execute-js").click(function () {
        eval($("#js-to-execute").val());
    });
}

moduleOff = () => {
    l("module off called");
}

l("module on-off events loaded");