// helper functions
let l = console.log;
$(document).on("click","a[href='#']",function (e) {
    e.preventDefault();
});

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}