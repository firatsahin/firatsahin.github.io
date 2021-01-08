let l = console.log;

$(document).on("click","a[href='#']",function (e) {
    e.preventDefault();
});

// document ready - BEGIN
$(function () {
    l("doc ready");
});
// document ready - END