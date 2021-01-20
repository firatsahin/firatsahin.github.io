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
Array.prototype.shiftRight = function (num) { // good for small arrays, slow for big arrays
    if (!num) num = 1;
    for (let i = 0; i < num; i++) this.unshift(this.pop()); // shift right
};
Array.prototype.shiftLeft = function (num) { // good for small arrays, slow for big arrays
    if (!num) num = 1;
    for (let i = 0; i < num; i++) this.push(this.shift()); // shift left
};
Number.prototype.mod = function (n) { // to fix javascript's negative modulo bug
    return ((this % n) + n) % n;
};

// namespaced helper functions
let h = {
    upperLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowerLetters: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    getRandomInteger: (min, max) => {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    },
    getRandomString: (length) => {
        let str = '';
        for (let i = 0; i < length; i++) {
            str += h[i === 0 ? 'upperLetters' : 'lowerLetters'][h.getRandomInteger(0, h.upperLetters.length - 1)];
        }
        return str;
    },
    shiftArray: (arr, direction, num) => { // good for big arrays
        if (!direction) direction = 'left';
        if (!num) num = 1;
        let shiftedArray = [];
        for (let i = 0; i < arr.length; i++) {
            if (direction === 'left') shiftedArray.push(arr[(i + num).mod(arr.length)]);
            else if (direction === 'right') shiftedArray.push(arr[(i - num).mod(arr.length)]);
        }
        return shiftedArray;
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
    let diff = t2 - t1, metric = 'ms';
    if (diff >= 1000) {
        diff = parseFloat((diff / 1000).toFixed(2));
        metric = 's';
    }
    return (sameLine ? ' ' : '<br>') + '<span class="time-dif-span">in <span class="time-dif-inner-span">' + diff + metric + '</span></span>';
}
let colored = (html, color) => {
    if (!color) color = 'blue';
    html = html.toString();
    return '<span style="color: ' + color + '">' + (html ? html : '') + '</span>';
}