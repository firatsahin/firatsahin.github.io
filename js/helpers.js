// helper functions
let l = console.log;
$(document).on("click","a[href='#']",function (e) {
    e.preventDefault();
});

// prototype additions
Array.prototype.swap = function (indexA, indexB) {
    let temp = this[indexA];
    this[indexA] = this[indexB];
    this[indexB] = temp;
};
Number.prototype.mod = function (n) { // to fix javascript's negative modulo bug
    return ((this % n) + n) % n;
};

// namespaced helper functions
let h = {
    getRandomInteger: (min, max) => {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }
};

// global helper functions
let printf = (html, appendToElm) => {
    let theDiv = null;
    if (appendToElm.hasClass('printf-div'))
        theDiv = appendToElm.append(html); // add to existing printf div
    else
        theDiv = $("<div>").addClass('printf-div').html(html).appendTo(appendToElm); // create new printf div
    return theDiv;
}
let getTimeDifHtml = (t1, t2, sameLine) => {
    return (sameLine ? ' ' : '<br>') + '<span class="time-dif-span">in <span class="time-dif-inner-span">' + (t2 - t1) + 'ms</span></span>';
}