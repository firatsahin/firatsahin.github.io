(this["webpackJsonpfrt-sample-react-app-01"]=this["webpackJsonpfrt-sample-react-app-01"]||[]).push([[0],{11:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return r}));var a="topNavMenu/ADD_NEW",o="topNavMenu/REMOVE_LAST",r="topNavMenu/LOG_ME_IN"},14:function(e,t,n){"use strict";t.a={seoTitle:"Firat's Sample React App",siteOwner:"Firat",footerText:"Copyright Text",navItems:[{text:"Home",toLink:"/"},{text:"Boards",toLink:"/boards"},{text:"Missing Page",toLink:"/missing-page"},{text:"Func. Comp. (JS)",toLink:"/function-component"},{text:"My Algo Trader",toLink:"/my-algo-trader"},{text:"M.A.T. (Back-Test)",toLink:"/my-algo-trader-backtest"},{text:"Func. Comp. (TS)",toLink:"/function-component-with-ts"},{text:"Todos",toLink:"/todos"}]}},25:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a="todos/SET_TODOS"},28:function(e,t,n){e.exports=n(43)},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},41:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(17),c=n.n(r),u=(n(33),n(2)),s=n(3),i=n(5),l=n(4),p=n(6),m=(n(34),n(35),n(10)),h=function(e){function t(){return Object(u.a)(this,t),Object(i.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(m.b,{to:this.props.navItem.toLink,isActive:function(t,n){return!(!t||!t.isExact)||(!(!n.pathname.startsWith("/todo/")||"/todos"!==e.props.navItem.toLink)||n.pathname===e.props.navItem.toLink)},className:"nav-item",activeClassName:"active"},this.props.navItem.text)}}]),t}(o.a.Component),d=n(11),f=(n(41),n(12)),b=function(e){function t(){return Object(u.a)(this,t),Object(i.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{id:"header-navigation"},this.props.navItems.map((function(e,t){return o.a.createElement(h,{navItem:e,key:t})})),this.props.navItems.length<this.props.maxNavItems?o.a.createElement("button",{onClick:function(){return e.props.addNew("NEW","/new")},style:{marginLeft:5}},"+"):null,this.props.navItems.length>0?o.a.createElement("button",{onClick:this.props.removeLast,style:{marginLeft:10}},"-"):null,o.a.createElement("span",{style:{marginLeft:8}},"(",this.props.navItems.length," ",this.props.attrProp,1!==this.props.navItems.length?"s":"",")"))}}]),t}(o.a.Component),v=Object(f.b)((function(e){return{navItems:e.topNav.items,maxNavItems:e.topNav.maxItemsAllowed}}),(function(e){return{addNew:function(t,n){return e({type:d.a,payload:{newMenuText:t,newToLink:n}})},removeLast:function(){return e({type:d.c})}}}))(b),g="userAuth/LOG_ME_IN",E="userAuth/REQ_ENDED",O=function(e){function t(){return Object(u.a)(this,t),Object(i.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"makeRequest",value:function(){var e=this;console.log("request started"),this.props.startRequest(),setTimeout((function(){console.log("request ended"),e.props.logMeIn("Firat")}),1500)}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:this.props.userAuth.isAuthenticated?"has-auth":"no-auth"},"running"!==this.props.userAuth.reqState?o.a.createElement(o.a.Fragment,null,o.a.createElement("span",null,"Welcome, ",o.a.createElement("b",null,this.props.userAuth.isAuthenticated?this.props.userAuth.userName:"Guest"),"! "),this.props.userAuth.isAuthenticated?o.a.createElement(m.b,{to:"#",onClick:this.props.logMeOut,style:{color:"dodgerblue"}},"Logout"):o.a.createElement(m.b,{to:"#",onClick:this.makeRequest.bind(this),style:{color:"dodgerblue"}},"Login")):o.a.createElement("span",null,"Logging in...")))}}]),t}(a.Component),y=Object(f.b)((function(e){return{userAuth:e.userAuth}}),(function(e){return{logMeIn:function(t){return e({type:g,payload:{userName:t}})},logMeOut:function(){return e({type:"userAuth/LOG_ME_OUT"})},startRequest:function(){return e({type:"userAuth/REQ_STARTED"})},endRequest:function(){return e({type:E})}}}))(O),j=function(e){function t(){return Object(u.a)(this,t),Object(i.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("header",{style:{backgroundColor:"#ffe595"}},o.a.createElement("div",{style:{float:"right"}},o.a.createElement(y,null)),o.a.createElement("h3",{style:{marginTop:0}},this.props.siteOwner,"'s Sample React App"),o.a.createElement(v,{attrProp:"top menu"}))}}]),t}(a.Component),k=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(i.a)(this,Object(l.a)(t).call(this,e))).ftText=n.props.footerText+" | "+(new Date).getFullYear(),n.styles={footerRoot:{backgroundColor:"#8bc34a"}},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("footer",{style:this.styles.footerRoot},o.a.createElement("div",{style:{float:"left"}},this.ftText),o.a.createElement("div",{style:{float:"right"}},o.a.createElement(y,null)),o.a.createElement("div",{style:{clear:"both"}}))}}]),t}(o.a.Component),T=n(16),A=n(1),w=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(i.a)(this,Object(l.a)(t).call(this,e))).whatToDoChanged=n.whatToDoChanged.bind(Object(T.a)(n)),n.state={generalSettings:{whatToDo:"increment",testVal:23},boards:[{rows:6,cols:8},{rows:7,cols:5}]},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"whatToDoChanged",value:function(e){this.setState((function(t){return t.generalSettings.whatToDo=e,t}))}},{key:"render",value:function(){var e={Home:o.a.lazy((function(){return n.e(9).then(n.bind(null,50))})),Boards:o.a.lazy((function(){return n.e(4).then(n.bind(null,56))})),FunctionComponent:o.a.lazy((function(){return n.e(5).then(n.bind(null,51))})),MyAlgoTrader:o.a.lazy((function(){return n.e(3).then(n.bind(null,57))})),FunctionComponentTS:o.a.lazy((function(){return n.e(6).then(n.bind(null,55))})),Todos:o.a.lazy((function(){return n.e(7).then(n.bind(null,52))})),NotFound:o.a.lazy((function(){return n.e(8).then(n.bind(null,53))}))};return o.a.createElement("div",{id:"content-body"},o.a.createElement(a.Suspense,{fallback:o.a.createElement("div",null,"Loading...")},o.a.createElement(A.c,null,o.a.createElement(A.a,{path:"/",exact:!0,component:function(){return o.a.createElement(e.Home,{person:{name:"Firat"}})}}),o.a.createElement(A.a,{path:"/boards",component:e.Boards}),o.a.createElement(A.a,{path:"/function-component",component:function(){return o.a.createElement(e.FunctionComponent,{propVal:"prop value 1"})}}),o.a.createElement(A.a,{path:"/my-algo-trader",component:e.MyAlgoTrader}),o.a.createElement(A.a,{path:"/my-algo-trader-backtest",component:function(){return o.a.createElement(e.MyAlgoTrader,{backTesting:!0})}}),o.a.createElement(A.a,{path:"/function-component-with-ts",component:function(){return o.a.createElement(e.FunctionComponentTS,null)}}),o.a.createElement(A.a,{path:"/todos",component:function(){return o.a.createElement(e.Todos,null)}}),o.a.createElement(A.a,{path:"/todo/:id",component:function(){return o.a.createElement(e.Todos,null)}}),o.a.createElement(A.a,{path:"*",component:e.NotFound}))))}}]),t}(o.a.Component),L=n(14),x=function(e){function t(){return Object(u.a)(this,t),Object(i.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){console.log("App component did mount")}},{key:"render",value:function(){return o.a.createElement(m.a,null,o.a.createElement(j,{siteOwner:L.a.siteOwner}),o.a.createElement(w,null),o.a.createElement(k,{footerText:L.a.footerText}))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var N=n(18),C=n(21),I=n(9),M={maxItemsAllowed:10,items:L.a.navItems},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,t=arguments.length>1?arguments[1]:void 0;switch(console.log("topNav reducer here!",e,t),t.type){case d.a:return Object(I.a)({},e,{items:[].concat(Object(C.a)(e.items),[{text:t.payload.newMenuText||"Redux Added",toLink:t.payload.newToLink||"/redux-added"}])});case d.c:return e.items.pop(),Object(I.a)({},e,{items:Object(C.a)(e.items)});case d.b:return console.log("LOG_ME_IN (topNav reducer)"),e;default:return e}},_={isAuthenticated:!1,reqState:"stopped"},R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;switch(console.log("userAuth reducer here!",e,t),t.type){case g:return console.log("LOG_ME_IN (userAuth reducer)"),Object(I.a)({},e,{isAuthenticated:!0,userName:t.payload.userName,reqState:"stopped"});case"userAuth/LOG_ME_OUT":return _;case"userAuth/REQ_STARTED":return Object(I.a)({},e,{reqState:"running"});case E:return Object(I.a)({},e,{reqState:"stopped"});default:return e}},F=n(25),D={inProgress:!1,todos:[]},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;switch(console.log("todos reducer here!",e),t.type){case F.a:return Object(I.a)({},e,{todos:t.payload.todos});default:return e}},z=Object(N.a)({topNav:S,userAuth:R,todos:q}),G=Object(N.b)(z);c.a.render(o.a.createElement(f.a,{store:G},o.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[28,1,2]]]);
//# sourceMappingURL=main.d0155c9b.chunk.js.map