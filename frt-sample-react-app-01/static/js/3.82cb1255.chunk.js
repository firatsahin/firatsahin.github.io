(this["webpackJsonpfrt-sample-react-app-01"]=this["webpackJsonpfrt-sample-react-app-01"]||[]).push([[3],{48:function(e,t,n){e.exports=n(49)},49:function(e,t,n){var a=function(e){"use strict";var t=Object.prototype,n=t.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},r=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",o=a.toStringTag||"@@toStringTag";function l(e,t,n,a){var r=t&&t.prototype instanceof u?t:u,i=Object.create(r.prototype),o=new C(a||[]);return i._invoke=function(e,t,n){var a="suspendedStart";return function(r,i){if("executing"===a)throw new Error("Generator is already running");if("completed"===a){if("throw"===r)throw i;return B()}for(n.method=r,n.arg=i;;){var o=n.delegate;if(o){var l=b(o,n);if(l){if(l===s)continue;return l}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===a)throw a="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a="executing";var u=c(e,t,n);if("normal"===u.type){if(a=n.done?"completed":"suspendedYield",u.arg===s)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(a="completed",n.method="throw",n.arg=u.arg)}}}(e,n,o),i}function c(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(a){return{type:"throw",arg:a}}}e.wrap=l;var s={};function u(){}function h(){}function p(){}var m={};m[r]=function(){return this};var y=Object.getPrototypeOf,d=y&&y(y(k([])));d&&d!==t&&n.call(d,r)&&(m=d);var f=p.prototype=u.prototype=Object.create(m);function g(e){["next","throw","return"].forEach((function(t){e[t]=function(e){return this._invoke(t,e)}}))}function v(e){var t;this._invoke=function(a,r){function i(){return new Promise((function(t,i){!function t(a,r,i,o){var l=c(e[a],e,r);if("throw"!==l.type){var s=l.arg,u=s.value;return u&&"object"===typeof u&&n.call(u,"__await")?Promise.resolve(u.__await).then((function(e){t("next",e,i,o)}),(function(e){t("throw",e,i,o)})):Promise.resolve(u).then((function(e){s.value=e,i(s)}),(function(e){return t("throw",e,i,o)}))}o(l.arg)}(a,r,t,i)}))}return t=t?t.then(i,i):i()}}function b(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,b(e,t),"throw"===t.method))return s;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var a=c(n,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,s;var r=a.arg;return r?r.done?(t[e.resultName]=r.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,s):r:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,s)}function S(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function E(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function C(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(S,this),this.reset(!0)}function k(e){if(e){var t=e[r];if(t)return t.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var a=-1,i=function t(){for(;++a<e.length;)if(n.call(e,a))return t.value=e[a],t.done=!1,t;return t.value=void 0,t.done=!0,t};return i.next=i}}return{next:B}}function B(){return{value:void 0,done:!0}}return h.prototype=f.constructor=p,p.constructor=h,p[o]=h.displayName="GeneratorFunction",e.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===h||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,o in e||(e[o]="GeneratorFunction")),e.prototype=Object.create(f),e},e.awrap=function(e){return{__await:e}},g(v.prototype),v.prototype[i]=function(){return this},e.AsyncIterator=v,e.async=function(t,n,a,r){var i=new v(l(t,n,a,r));return e.isGeneratorFunction(n)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},g(f),f[o]="Generator",f[r]=function(){return this},f.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var a=t.pop();if(a in e)return n.value=a,n.done=!1,n}return n.done=!0,n}},e.values=k,C.prototype={constructor:C,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function a(n,a){return o.type="throw",o.arg=e,t.next=n,a&&(t.method="next",t.arg=void 0),!!a}for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],o=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var l=n.call(i,"catchLoc"),c=n.call(i,"finallyLoc");if(l&&c){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(l){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(e,t){for(var a=this.tryEntries.length-1;a>=0;--a){var r=this.tryEntries[a];if(r.tryLoc<=this.prev&&n.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=e,o.arg=t,i?(this.method="next",this.next=i.finallyLoc,s):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),s},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),E(n),s}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var a=n.completion;if("throw"===a.type){var r=a.arg;E(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:k(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),s}},e}(e.exports);try{regeneratorRuntime=a}catch(r){Function("r","regeneratorRuntime = r")(a)}},55:function(e,t,n){"use strict";n.r(t);var a=n(12),r=n(48),i=n.n(r);function o(e,t,n,a,r,i,o){try{var l=e[i](o),c=l.value}catch(s){return void n(s)}l.done?t(c):Promise.resolve(c).then(a,r)}var l=n(3),c=n(4),s=n(6),u=n(5),h=n(7),p=n(0),m=n.n(p),y=n(18),d=m.a.lazy((function(){return n.e(4).then(n.bind(null,52))})),f=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={backTesting:e.backTesting||!1,baseCoin:"USDT",baseCoinBalance:100,commissionRate:.001,buySellColType:"auto",autoBuySellCheckFreq:10,autoBuySellMakeSureTimes:3,priceHistoryMaxLength:14,coins:[],coinsModalOpen:!1,myCoins:[]},n.interestedCoins=["TLM","XLMUP","WAN","XRPUP","BTC","ETH","LTC","BNB","XRP","ENJ","ETC","YFI","DOGE","EOSUP","BEAM","IOST","ADAUP"],n.klineTypes={last500kline:{each1min:["1m",500],each3min:["3m",500],each5min:["5m",500],each15min:["15m",500]},last1000kline:{each1min:["1m",1e3],each3min:["3m",1e3],each5min:["5m",1e3],each15min:["15m",1e3]},last24h:{each3min:["3m",480],each5min:["5m",288],each15min:["15m",96],each30min:["30m",48],each1h:["1h",24]},last7d:{each15min:["15m",672],each30min:["30m",336],each1h:["1h",168]}},n.klineTypeSelection="last24h.each15min",n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"addCoinToMyCoins",value:function(e){var t={coinName:e,symbol:e+this.state.baseCoin,isActive:!1,autoBuySell:!1,backTestRan:!1,initialPrice:null,priceHistory:[],RSI:50,buyCount:0,initialBudgetInBaseCoin:Math.floor((this.state.baseCoinBalance-this.state.baseCoinBalance*this.state.commissionRate)/this.interestedCoins.length),upperMarginTarget:4,lowerMarginTarget:-4};t.budgetInBaseCoin=t.initialBudgetInBaseCoin,this.state.myCoins.push(t),this.setState(this.state)}},{key:"initListeners",value:function(){var e=this;this.state.backTesting||(this.binanceWsConnection=new WebSocket("wss://stream.binance.com:9443/ws"),this.binanceWsConnection.onopen=function(){console.log("socket(binance) opened"),e.binanceWsConnection.send(JSON.stringify({method:"SUBSCRIBE",params:e.state.myCoins.map((function(e){return e.symbol.toLowerCase()+"@miniTicker"})),id:1}))},this.binanceWsConnection.addEventListener("message",(function(t){var n=JSON.parse(t.data);"24hrMiniTicker"===n.e&&(e.state.myCoins.forEach((function(t){t.symbol===n.s&&e.priceNMarginUpdates(t,n.c)})),e.setState(e.state))})),this.autoBuySellCheckInterval=setInterval((function(){console.log("autoBuySellCheck cycle called"),e.state.myCoins.forEach((function(t){return e.autoBuySellCheck(t)}))}),1e3*this.state.autoBuySellCheckFreq))}},{key:"priceNMarginUpdates",value:function(e,t){e.price=parseFloat(t),e.initialPrice||(e.initialPrice=e.price),e.priceHistory.push(e.price),e.priceHistory.length>this.state.priceHistoryMaxLength&&e.priceHistory.shift(),this.calculateRSI(e),e.isActive?(e.price>e.maxPriceSinceLastBuy&&(e.maxPriceSinceLastBuy=e.price),e.lowerMargin=e.price/e.maxPriceSinceLastBuy*100-100,e.budgetInBaseCoin=e.targetCoinAmount*e.price):(e.minPriceSinceLastSell||(e.minPriceSinceLastSell=e.price),e.price<e.minPriceSinceLastSell&&(e.minPriceSinceLastSell=e.price),e.upperMargin=e.price/e.minPriceSinceLastSell*100-100)}},{key:"priceNMarginUpdatesWithKline",value:function(e,t){if(e.price=parseFloat(t[4]),e.initialPrice||(e.initialPrice=e.price),e.priceHistory.push(e.price),e.priceHistory.length>this.state.priceHistoryMaxLength&&e.priceHistory.shift(),this.calculateRSI(e),e.isActive){var n=parseFloat(t[2]);n>e.maxPriceSinceLastBuy&&(e.maxPriceSinceLastBuy=n),e.lowerMargin=e.price/e.maxPriceSinceLastBuy*100-100}else{var a=parseFloat(t[3]);e.minPriceSinceLastSell||(e.minPriceSinceLastSell=e.price),a<e.minPriceSinceLastSell&&(e.minPriceSinceLastSell=a),e.upperMargin=e.price/e.minPriceSinceLastSell*100-100}}},{key:"calculateRSI",value:function(e){if(!(e.priceHistory.length<this.state.priceHistoryMaxLength)){for(var t=0,n=0,a=0;a<e.priceHistory.length-1;a++){var r=e.priceHistory[a+1]-e.priceHistory[a];r>0?t+=r:n+=Math.abs(r)}e.RSI=100-100/(1+t/n)}}},{key:"backTestStrategyFor",value:function(e){var t=this;if(!e.backTestRan){console.log("started back test for:",e);var n=this.klineTypeSelection.split("."),a=this.klineTypes[n[0]][n[1]];e.autoBuySell=!0,fetch("https://api.binance.com/api/v3/klines?symbol="+e.symbol+"&interval="+a[0]+"&limit="+a[1]).then((function(n){n.json().then((function(n){var a=function(){var r,l=(r=i.a.mark((function r(o){var l;return i.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!(o>n.length-1)){r.next=5;break}return e.backTestRan=!0,t.setState(t.state),console.log("back test completed!"),r.abrupt("return");case 5:l=n[o],t.priceNMarginUpdates(e,l[1]),t.autoBuySellCheck(e),a(o+1);case 9:case"end":return r.stop()}}),r)})),function(){var e=this,t=arguments;return new Promise((function(n,a){var i=r.apply(e,t);function l(e){o(i,n,a,l,c,"next",e)}function c(e){o(i,n,a,l,c,"throw",e)}l(void 0)}))});return function(e){return l.apply(this,arguments)}}();a(0)}))}))}}},{key:"surenessCheck",value:function(e,t){var n=!1;return"BUY"===t&&(n=!0),"SELL"===t&&(n=!0),n}},{key:"autoBuySellCheck",value:function(e){if(e.autoBuySell){var t=e.RSI<30?"buy":e.RSI>70?"sell":"";if(e.isActive){if(e.lowerMargin<e.lowerMarginTarget*("sell"===t?.7:"buy"===t?1.3:1))this.surenessCheck(e,"SELL")&&this.sell(e)}else if(e.upperMargin>e.upperMarginTarget*("buy"===t?.7:"sell"===t?1.3:1))this.surenessCheck(e,"BUY")&&this.buy(e)}}},{key:"autoBuySellCheckRSIBased",value:function(e){e.autoBuySell&&(e.isActive?e.RSI>70&&this.sell(e):e.RSI<30&&this.buy(e))}},{key:"buy",value:function(e){if(e.isActive)console.log("can't buy the bought!!");else if(e.price){var t=e.budgetInBaseCoin,n=t/(1+this.state.commissionRate);this.state.baseCoinBalance-t<0?console.log("Your wallet balance is not enough. Couldn't buy."):(e.isActive=!0,e.targetCoinAmount=parseFloat((n/e.price).toFixed(6)),0===e.buyCount&&(e.firstBuyPrice=e.price),e.buyCount++,e.lastBuyPrice=e.price,e.maxPriceSinceLastBuy=e.lastBuyPrice,e.upperMargin=0,e.budgetInBaseCoin=n,this.setState(Object(a.a)({},this.state,{baseCoinBalance:this.state.baseCoinBalance-t})))}else console.log("Price not ready yet. Couldn't buy.")}},{key:"sell",value:function(e){if(e.isActive){e.isActive=!1,e.lastSellPrice=e.price,e.minPriceSinceLastSell=e.lastSellPrice;var t=e.targetCoinAmount*e.price/(1+this.state.commissionRate);e.lowerMargin=0,e.budgetInBaseCoin=t,this.setState(Object(a.a)({},this.state,{baseCoinBalance:this.state.baseCoinBalance+t}))}else console.log("can't sell the sold!!")}},{key:"calculateTotalBalance",value:function(){var e=0;return this.state.myCoins.forEach((function(t){t.isActive&&(e+=t.targetCoinAmount*t.price)})),this.state.baseCoinBalance+e-e*this.state.commissionRate}},{key:"render",value:function(){var e=this;return m.a.createElement(m.a.Fragment,null,m.a.createElement("div",null,m.a.createElement("div",{style:{float:"left"}},m.a.createElement("div",null,"My Wallet Balance: ",m.a.createElement("b",null,parseFloat(this.state.baseCoinBalance).toFixed(4))," ",this.state.baseCoin),m.a.createElement("div",null,"My Total Balance: ",m.a.createElement("b",null,parseFloat(this.calculateTotalBalance()).toFixed(4))," ",this.state.baseCoin)),m.a.createElement("div",{style:{float:"right"}},m.a.createElement("div",{style:{display:this.state.backTesting?"inline-block":"none",marginRight:25}},m.a.createElement("b",null,"Back-Test Data:")," ",this.klineTypeSelection.split(".")[0],".",m.a.createElement("select",{value:this.klineTypeSelection,onChange:function(t){e.klineTypeSelection=t.target.value,e.setState(e.state)}},function(){var t=[];for(var n in e.klineTypes){for(var a in t.push(m.a.createElement("optgroup",{label:n,key:n})),e.klineTypes[n]){var r=n+"."+a;t.push(m.a.createElement("option",{value:r,key:r},a))}t.push(m.a.createElement("option",{disabled:!0,key:n+"seperator"},"-----------"))}return t}())),m.a.createElement("div",{style:{display:this.state.backTesting?"none":"inline-block",marginRight:25}},m.a.createElement("b",null,"Auto Buy/Sell Check:")," each",m.a.createElement("input",{type:"number",style:{width:40},value:this.state.autoBuySellCheckFreq,min:1,onChange:function(t){return e.setState(Object(a.a)({},e.state,{autoBuySellCheckFreq:parseInt(t.target.value)}))}}),"sec(s)",function(){var t,n,a=e.state.autoBuySellCheckFreq;return n=(a-=t=a%60)/60,m.a.createElement("span",{style:{marginLeft:8,fontSize:12,color:"blue"}},"(",(n>0?n+"m ":"")+t+"s",")")}()),m.a.createElement("button",{onClick:function(){return e.setState(Object(a.a)({},e.state,{coinsModalOpen:!0}))}},"Browse Coins")),m.a.createElement("div",{style:{clear:"both"}})),m.a.createElement("div",{style:{overflow:"hidden"}},[!0,!1].map((function(t){return m.a.createElement("div",{className:"myCoinsTableWrapper"+(t?"1":"2"),key:t},t?m.a.createElement("h4",{style:{color:"green"}},"Active Coins (we are IN)"):m.a.createElement("h4",{style:{color:"orange"}},"Passive Coins (we are OUT)"),m.a.createElement("table",{className:"myCoinsTable",style:{width:"100%"}},m.a.createElement("thead",null,m.a.createElement("tr",null,m.a.createElement("th",null,"Coin"),m.a.createElement("th",null,"Price",m.a.createElement("br",null),"(Live)"),m.a.createElement("th",null,"Price",m.a.createElement("br",null),"Chng %"),m.a.createElement("th",null,"Win",m.a.createElement("br",null),"Lose"),m.a.createElement("th",null,"Buy Price"),m.a.createElement("th",{hidden:!t},"Max Price"),m.a.createElement("th",{hidden:!t},"Lower",m.a.createElement("br",null),"Margin"),m.a.createElement("th",{hidden:t},"Sell Price"),m.a.createElement("th",{hidden:t},"Min Price"),m.a.createElement("th",{hidden:t},"Upper",m.a.createElement("br",null),"Margin"),m.a.createElement("th",null,"RSI-",e.state.priceHistoryMaxLength),m.a.createElement("th",null,"Buy/Sell\xa0\xa0",m.a.createElement("select",{value:e.state.buySellColType,onChange:function(t){e.setState(Object(a.a)({},e.state,{buySellColType:t.target.value}))}},m.a.createElement("option",{value:"auto"},"Auto"),m.a.createElement("option",{value:"manual"},"Manual")),m.a.createElement("input",{type:"checkbox",hidden:t,onChange:function(t){e.state.myCoins.forEach((function(e){return e.autoBuySell=t.target.checked})),e.setState(e.state)}})),m.a.createElement("th",{hidden:!e.state.backTesting},"Back Testing ",m.a.createElement("button",{onClick:function(){return e.state.myCoins.forEach((function(t){return e.backTestStrategyFor(t)}))}},"Back-Test All")),m.a.createElement("th",null,"Budget"))),e.state.myCoins.map((function(n,a){return n.isActive!==t?null:m.a.createElement("tbody",{key:a},m.a.createElement("tr",{className:n.isActive?"iam-in":n.autoBuySell?"iam-watching":""},m.a.createElement("td",null,n.isActive?n.targetCoinAmount:""," ",n.coinName),m.a.createElement("td",null,n.price||"N/A"),m.a.createElement("td",null,function(){var e=0;return n.initialPrice&&(e=100*(n.price/n.initialPrice-1)),m.a.createElement("span",{style:{color:e>0?"green":e<0?"red":""}},(e>0?"+":"")+e.toFixed(2),"%")}()),m.a.createElement("td",null,function(){var e=100*(n.budgetInBaseCoin/n.initialBudgetInBaseCoin-1);return m.a.createElement("span",{style:{color:e>0?"green":e<0?"red":""}},(e>0?"+":"")+e.toFixed(2),"%")}()),m.a.createElement("td",null,n.lastBuyPrice||"N/A",m.a.createElement("br",null),"Buys: (",n.buyCount,")"),m.a.createElement("td",{hidden:!t},n.maxPriceSinceLastBuy||"N/A"),m.a.createElement("td",{hidden:!t,style:{color:"red"}},void 0!==n.lowerMargin?parseFloat(n.lowerMargin).toFixed(2):"N/A"," / ",parseFloat(n.lowerMarginTarget).toFixed(2),m.a.createElement("div",{hidden:void 0===n.lowerMargin,style:{position:"relative"}},m.a.createElement("div",{style:{position:"absolute",width:n.lowerMargin/n.lowerMarginTarget*100+"%",height:10,backgroundColor:"red"}}))),m.a.createElement("td",{hidden:t},n.lastSellPrice||"N/A"),m.a.createElement("td",{hidden:t},n.minPriceSinceLastSell||"N/A"),m.a.createElement("td",{hidden:t,style:{color:"green"}},void 0!==n.upperMargin?"+"+parseFloat(n.upperMargin).toFixed(2):"N/A"," / ","+"+parseFloat(n.upperMarginTarget).toFixed(2),m.a.createElement("div",{hidden:void 0===n.upperMargin,style:{position:"relative"}},m.a.createElement("div",{style:{position:"absolute",width:n.upperMargin/n.upperMarginTarget*100+"%",height:10,backgroundColor:"green"}}))),m.a.createElement("td",{style:{color:n.RSI>70?"red":n.RSI<30?"green":""}},n.RSI.toFixed(2)," ",n.RSI>70?"(Sell)":n.RSI<30?"(Buy)":""),m.a.createElement("td",null,"auto"===e.state.buySellColType?m.a.createElement(m.a.Fragment,null,m.a.createElement("label",null,m.a.createElement("input",{type:"checkbox",checked:n.autoBuySell,onChange:function(t){n.autoBuySell=t.target.checked,e.setState(e.state)}}),"Auto Buy/Sell"),m.a.createElement("br",null),m.a.createElement("span",{style:{marginLeft:8}},"Buy/Sell Mrgns:\xa0",m.a.createElement("input",{type:"number",min:.2,max:99.8,step:.1,value:n.upperMarginTarget,onChange:function(t){n.upperMarginTarget=parseFloat(t.target.value),e.setState(e.state)},style:{width:40,backgroundColor:"lightgreen"}}),m.a.createElement("input",{type:"number",min:.2,max:99.8,step:.1,value:-n.lowerMarginTarget,onChange:function(t){n.lowerMarginTarget=-parseFloat(t.target.value),e.setState(e.state)},style:{width:40,backgroundColor:"orangered"}}))):m.a.createElement(m.a.Fragment,null,m.a.createElement("button",{hidden:t,onClick:function(){e.buy(n)}},"Buy"),m.a.createElement("button",{hidden:!t,onClick:function(){e.sell(n)}},"Sell"))),m.a.createElement("td",{hidden:!e.state.backTesting},m.a.createElement("button",{hidden:n.backTestRan,onClick:function(t){e.backTestStrategyFor(n)}},"Back-Test This Strategy")),m.a.createElement("td",null,m.a.createElement("input",{type:"number",min:.2,step:.1,disabled:n.firstBuyPrice,value:n.budgetInBaseCoin,onChange:function(t){n.budgetInBaseCoin=parseFloat(t.target.value),e.setState(e.state)},style:{width:40}}),e.state.baseCoin)))}))))})),m.a.createElement("div",{style:{clear:"both"}})),this.state.coinsModalOpen?m.a.createElement(p.Suspense,null,m.a.createElement(d,{modalOpen:this.state.coinsModalOpen,loadCoinsToState:function(t){return e.setState(Object(a.a)({},e.state,{coins:t}))},closeModalFn:function(){return e.setState(Object(a.a)({},e.state,{coinsModalOpen:!1}))},coins:this.state.coins,myCoins:this.state.myCoins})):null)}},{key:"componentDidMount",value:function(){var e=this;console.log("component did mount"),document.title="My Algo Trader | "+y.a.seoTitle,this.interestedCoins.forEach((function(t){return e.addCoinToMyCoins(t)})),this.initListeners()}},{key:"componentDidUpdate",value:function(){}},{key:"componentWillUnmount",value:function(){console.log("component will unmount"),this.binanceWsConnection&&this.binanceWsConnection.close(),clearInterval(this.autoBuySellCheckInterval)}}]),t}(p.Component);t.default=f}}]);
//# sourceMappingURL=3.82cb1255.chunk.js.map