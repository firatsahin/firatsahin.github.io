(this["webpackJsonpfrt-sample-react-app-01"]=this["webpackJsonpfrt-sample-react-app-01"]||[]).push([[7],{44:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var l=n(14),r=function(e){document.title=(e?e+" | ":"")+l.a.seoTitle}},45:function(e,t,n){"use strict";function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],l=!0,r=!1,a=void 0;try{for(var o,c=e[Symbol.iterator]();!(l=(o=c.next()).done)&&(n.push(o.value),!t||n.length!==t);l=!0);}catch(u){r=!0,a=u}finally{try{l||null==c.return||c.return()}finally{if(r)throw a}}return n}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.d(t,"a",(function(){return l}))},52:function(e,t,n){"use strict";n.r(t);var l=n(45),r=n(0),a=n.n(r),o=n(44),c=n(1),u=n(12),i=n(25);t.default=function(){var e,t,n=Object(r.useState)(!1),s=Object(l.a)(n,2),d=s[0],f=s[1],m=Object(u.d)((function(e){return e.todos.todos})),p=Object(u.c)(),E=Object(c.f)(),h=E.id?"detail":"list";return console.log(E,h),"detail"===h&&(t=m.find((function(e){return e.id===(parseInt(E.id)||-1)})),console.log("todo detail:",t)),Object(r.useEffect)((function(){return console.log("use effect > set"),Object(o.a)("Todos"),0===m.length&&(f(!0),fetch("https://jsonplaceholder.typicode.com/todos").then((function(e){return e.ok?e.json():Promise.reject(e)})).then((function(e){p({type:i.a,payload:{todos:e}})})).catch((function(e){console.log(e)})).finally((function(){console.log("request stopped (success or fail)"),f(!1)}))),function(){console.log("use effect > unset"),Object(o.a)(null)}}),[]),a.a.createElement(a.a.Fragment,null,d?a.a.createElement("div",null,"Getting todos from API..."):a.a.createElement(a.a.Fragment,null,"list"===h&&a.a.createElement(a.a.Fragment,null,a.a.createElement("h2",null,"Todos (",m.length,")"),m.length>0?a.a.createElement("table",{style:{width:"100%",borderSpacing:3}},a.a.createElement("thead",null,a.a.createElement("tr",{style:{textAlign:"left"}},a.a.createElement("th",null,"#"),a.a.createElement("th",null,"Title"),a.a.createElement("th",null,"User"),a.a.createElement("th",null,"Status"))),a.a.createElement("tbody",null,m.map((function(e){return a.a.createElement("tr",{key:e.id,style:{backgroundColor:e.completed?"#beffbe":"#ffd5c5"}},a.a.createElement("td",null,e.id),a.a.createElement("td",null,a.a.createElement("a",{href:"#/todo/"+e.id,style:{color:"dodgerblue"}},e.title)),a.a.createElement("td",null,e.userId),a.a.createElement("td",{style:{color:e.completed?"green":"red"}},e.completed?"COMPLETED":"ONGOING"))})))):null),"detail"===h&&a.a.createElement(a.a.Fragment,null,a.a.createElement("h2",null,"Todo #",null===(e=t)||void 0===e?void 0:e.id),a.a.createElement("code",null,a.a.createElement("pre",null,JSON.stringify(t,null,2))))))}}}]);
//# sourceMappingURL=7.e62a1d63.chunk.js.map