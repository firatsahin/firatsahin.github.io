(this["webpackJsonpfrt-sample-react-app-01"]=this["webpackJsonpfrt-sample-react-app-01"]||[]).push([[6],{44:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(14),a=function(e){document.title=(e?e+" | ":"")+r.a.seoTitle}},45:function(e,t,n){"use strict";function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],r=!0,a=!1,l=void 0;try{for(var c,o=e[Symbol.iterator]();!(r=(c=o.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(i){a=!0,l=i}finally{try{r||null==o.return||o.return()}finally{if(a)throw l}}return n}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.d(t,"a",(function(){return r}))},55:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),l=function e(t){var n=t.title,r=t.paragraph,l=t.color,c=t.isFirst,o=void 0!==c&&c;return console.log(n,r,l,o),a.a.createElement("aside",null,a.a.createElement("h2",null,n),a.a.createElement("p",{style:{color:l}},r),!0===o?a.a.createElement(e,{title:"My Title Inner",paragraph:"This my inner paragraph.",color:"green"}):null)},c=function(e){var t=e.count,n=e.decreaseFn,r=e.increaseFn;return a.a.createElement("div",{style:{marginBottom:8}},a.a.createElement("button",{onClick:n},"-"),a.a.createElement("span",{style:{padding:"0px 6px"}},t," post",1!==t?"s":""),a.a.createElement("button",{onClick:r},"+"))},o=function(e){var t=e.count,n=e.decreaseFn,r=e.increaseFn;return a.a.createElement("div",{style:{marginBottom:8}},a.a.createElement("button",{onClick:n},"-"),a.a.createElement("span",{style:{padding:"0px 6px"}},t," comment",1!==t?"s":""),a.a.createElement("button",{onClick:r},"+"))},i=n(45),u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=function(){var n=Object(r.useState)(t<0?0:t>10?10:t),l=Object(i.a)(n,2),c=l[0],o=l[1];return a.a.createElement(e,{count:c,decreaseFn:function(){c>0&&o(c-1)},increaseFn:function(){c<10&&o(c+1)}})};return n},s=n(44);t.default=function(){Object(r.useEffect)((function(){return console.log("useEffect() 1 set"),Object(s.a)("Functional Component (with TS)"),function(){console.log("useEffect() 1 unset"),Object(s.a)(null)}}));var e=u(c),t=u(c,3),n=u(o),i=u(o,8);return a.a.createElement(a.a.Fragment,null,a.a.createElement(l,{title:"My Title",paragraph:"This is my paragraph.",color:"red",isFirst:!0}),a.a.createElement("br",null),a.a.createElement("h2",null,"HOC Examples Below (State & Events Used in HOC)"),a.a.createElement(e,null),a.a.createElement(n,null),a.a.createElement(t,null),a.a.createElement(i,null))}}}]);
//# sourceMappingURL=6.2b74045c.chunk.js.map