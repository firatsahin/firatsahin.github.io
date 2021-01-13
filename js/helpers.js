// helper functions
let l = console.log;
$(document).on("click","a[href='#']",function (e) {
    e.preventDefault();
});

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function printf(html, appendToElm) {
    let theDiv = null;
    if (appendToElm.hasClass('printf-div'))
        theDiv = appendToElm.append(html); // add to existing printf div
    else
        theDiv = $("<div>").addClass('printf-div').html(html).appendTo(appendToElm); // create new printf div
    return theDiv;
}