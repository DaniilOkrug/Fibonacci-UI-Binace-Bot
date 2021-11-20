(()=>{"use strict";var e={apiKey:"1123"},t=["XRPUSDTPERP","ADAUSDTPERP","DASHUSDTPERP","ATOMUSDTPERP"],n=["ADAUSDTPERP","DASHUSDTPERP","ATOMUSDTPERP"],r=[{symbol:"BTCUSDT",levelCount:1,levels:[{level:"0.1",amount:"10",takeProfit:"0.2",stopLoss:"0.13"}]},{symbol:"ETHUSDT",levelCount:2,levels:[{level:"0.1",amount:"10",takeProfit:"0.2",stopLoss:"0.13"},{level:"0.5",amount:"20",takeProfit:"0.3",stopLoss:"0.56"}]}],i=[{symbol:"BTCUSDT",levelCount:1,levels:[{level:"0.1",amount:"10",takeProfit:"0.2",stopLoss:"0.13"}]}],o={symbol:"ETHUSDT",template:"",waitSignal:!0,cycleDuration:100,delay:1,price1:61238182,price2:312793719,levelCount:2,levels:[{level:"0.1",amount:"10",takeProfit:"0.2",stopLoss:"0.13"},{level:"0.5",amount:"20",takeProfit:"0.3",stopLoss:"0.56"}]},a=[{name:"Default",waitSignal:!1,cycleDuration:100,delay:1,price1:61238182,price2:312793719,levelCount:2,levels:[{level:"0.1",amount:"10",takeProfit:"0.2",stopLoss:"0.13"},{level:"0.5",amount:"20",takeProfit:"0.3",stopLoss:"0.56"}]},{name:"My",waitSignal:!1,cycleDuration:5,delay:.5,price1:12.5,price2:15,levelCount:3,levels:[{level:"0.1",amount:"10",takeProfit:"0.2",stopLoss:"0.13"},{level:"0.5",amount:"20",takeProfit:"0.3",stopLoss:"0.56"},{level:"0.7",amount:"45",takeProfit:"0.36",stopLoss:"0.35"}]}];function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t,n){return function(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}(e,u(e,t,"set"),n),n}function u(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}var s=new WeakMap,d=function(){function e(t){var n,r,i;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),i={writable:!0,value:{symbol:"",template:"",waitSignal:!1,cycleDuration:0,delay:0,price1:0,price2:0,levelCount:0,levels:[]}},function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(n=this,r=s),r.set(n,i),c(this,s,t)}var t,n;return t=e,(n=[{key:"current",get:function(){return function(e,t){return t.get?t.get.call(e):t.value}(this,u(this,s,"get"))}},{key:"update",set:function(e){c(this,s,e)}}])&&l(t.prototype,n),e}();function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t,n){return function(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}(e,y(e,t,"set"),n),n}function y(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}var f=new WeakMap,m=function(){function e(t){var n,r,i;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),i={writable:!0,value:[]},function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(n=this,r=f),r.set(n,i),p(this,f,t)}var t,n;return t=e,(n=[{key:"current",get:function(){return function(e,t){return t.get?t.get.call(e):t.value}(this,y(this,f,"get"))}},{key:"update",set:function(e){p(this,f,e)}}])&&v(t.prototype,n),e}();function S(e){return'\n    <li class="list-group-item">\n        <div class="d-flex justify-content-between align-items-center">\n            <span class="align-middle">'.concat(e,'</span>\n            <div class="btn-group">\n                <button name="').concat(e,'" type="button" class="settings-orders btn btn-sm btn-primary mx-4" data-bs-toggle="modal"\n                    data-bs-target="#pairSettings">Настройка</button>\n                <button name="').concat(e,'" type="button" class="close-orders btn btn-sm btn-warning">Закрыть сделки</button>\n            </div>\n        </div>\n    </li>')}function b(e,t,n,r){return'\n    <div class="row">\n        <div class="col">\n            <div class="input-group mb-3">\n                <input id="profit" type="number" class="form-control" value="'.concat(t,'" aria-label="profit"\n                    aria-describedby="profit">\n            </div>\n        </div>\n        <div class="col">\n            <div class="input-group mb-3">\n                <input id="fibo-level" type="number" class="form-control" value="').concat(e,'" min="0" aria-label="Fibo level"\n                    aria-describedby="Fibo level">\n            </div>\n        </div>\n        <div class="col">\n            <div class="input-group mb-3">\n                <input id="takeprofit" type="number" class="form-control" value="').concat(n,'" min="0" aria-label="takeprofit"\n                    aria-describedby="takeprofit">\n            </div>\n        </div>\n        <div class="col">\n            <div class="input-group mb-3">\n                <input id="stoploss" type="number" class="form-control" value="').concat(r,'" min="0" aria-label="stoploss"\n                    aria-describedby="stoploss">\n            </div>\n        </div>\n    </div>')}function g(e,t){return'<option value="'.concat(e,'">').concat(t,"</option>")}function w(e,t,n){if(!t.every((function(t){return t.name!=e.name})))return alert("Такое имя темплейта уже существует"),!1;if(L({name:e.name,cycleDuration:e.cycleDuration,waitSignal:e.waitSignal,delay:e.delay,price1:e.price1,price2:e.price2,levelCount:e.levelCount,fiboContainer:e.fiboContainer})){for(var r=[],i=0;i<e.fiboContainer.childElementCount;i++){var o=e.fiboContainer.children[i],a={level:o.querySelector("#fibo-level").value,amount:o.querySelector("#profit").value,takeProfit:o.querySelector("#takeprofit").value,stopLoss:o.querySelector("#stoploss").value};r[i]=a}return e.levels=r,delete e.fiboContainer,console.log(e),e=JSON.stringify(e),console.log("Send POST request to "+n),!0}}function q(e,t,n){if(!L({cycleDuration:e.cycleDuration,waitSignal:e.waitSignal,delay:e.delay,price1:e.price1,price2:e.price2,levelCount:e.levelCount,fiboContainer:e.fiboContainer}))return!1;for(var r=[],i=0;i<e.fiboContainer.childElementCount;i++){var o=e.fiboContainer.children[i],a={level:o.querySelector("#fibo-level").value,amount:o.querySelector("#profit").value,takeProfit:o.querySelector("#takeprofit").value,stopLoss:o.querySelector("#stoploss").value};r[i]=a}e.levels=r,delete e.fiboContainer;var l=function(e,t){var n=e,r="";return t.forEach((function(e){if(e.waitSignal==n.waitSignal&&e.cycleDuration==n.cycleDuration&&e.delay==n.delay&&e.price1==n.price1&&e.price2==n.price2&&e.levelCount==n.levelCount)for(var t=0;t<e.levels.length;t++){var i=e.levels[t],o=n.levels[t];i.level==o.level&&i.amount==o.amount&&i.takeProfit==o.takeProfit&&i.stopLoss==o.stopLoss&&(r=e.name)}})),r}(e,t);return e.template=l,console.log(e),e=JSON.stringify(e),console.log("Send POST request to "+n),!0}function P(e,t){var n=document.querySelector("#pairSettings #cycle-duration"),r=document.querySelector("#pairSettings #waitSignal"),i=document.querySelector("#pairSettings #cycle-delay"),o=document.querySelector("#pairSettings #price1-fibo"),a=document.querySelector("#pairSettings #price2-fibo"),l=document.querySelector("#pairSettings div.fibo-container"),c=document.querySelector("#pairSettings #orders-number");t&&C(e.template),r.checked=e.waitSignal,n.value=e.cycleDuration,i.value=e.delay,o.value=e.price1,a.value=e.price2,c.value=e.levelCount,e.waitSignal?n.disabled=!0:n.disabled=!1,l.innerHTML="",e.levels.forEach((function(e){l.insertAdjacentHTML("beforeend",b(e.level,e.amount,e.takeProfit,e.stopLoss))}))}function k(e,t,n){e.innerHTML="";for(var r=0;r<n;r++){var i;if((null===(i=t.levels)||void 0===i?void 0:i.length)>r){var o=t.levels[r];e.insertAdjacentHTML("beforeend",b(o.level,o.amount,o.takeProfit,o.stopLoss))}else e.insertAdjacentHTML("beforeend",'\n    <div class="row">\n        <div class="col">\n            <div class="input-group mb-3">\n                <input id="profit" type="number" class="form-control" aria-label="profit"\n                    aria-describedby="profit">\n            </div>\n        </div>\n        <div class="col">\n            <div class="input-group mb-3">\n                <input id="fibo-level" type="number" class="form-control" min="0" aria-label="Fibo level"\n                    aria-describedby="Fibo level">\n            </div>\n        </div>\n        <div class="col">\n            <div class="input-group mb-3">\n                <input id="takeprofit" type="number" class="form-control" min="0" aria-label="takeprofit"\n                    aria-describedby="takeprofit">\n            </div>\n        </div>\n        <div class="col">\n            <div class="input-group mb-3">\n                <input id="stoploss" type="number" class="form-control" min="0" aria-label="stoploss"\n                    aria-describedby="stoploss">\n            </div>\n        </div>\n    </div>')}}function h(e,t){e.innerHTML='\n        <option value="none">Пустой</option>\n        ';for(var n=0;n<t.length;n++)e.insertAdjacentHTML("beforeend",g(n,t[n].name))}function T(e,t){e.innerHTML="";for(var n=0;n<t.length;n++)e.insertAdjacentHTML("beforeend",(r=n,i=t[n],'<option value="'.concat(r,'">').concat(i,"</option>")));var r,i}function L(e){var t=e.fiboContainer;return""==(null==e?void 0:e.name)?(alert("Назавние темплейта не задано!"),!1):(""==e.cycleDuration||e.cycleDuration<0)&&0==e.waitSignal?(alert("Неверное продолжительность цикла"),!1):""==e.delay||e.delay<0?(alert("Неверное задержка"),!1):""==e.price1||e.price1<0?(alert("Неверное цена 1"),!1):""==e.price2||e.price2<0?(alert("Неверное цена 2"),!1):""==e.levelCount||e.levelCount<1?(alert("Неверное количество ордеров"),!1):E(t.querySelectorAll("#profit")).every((function(e){return""!=e.value}))?E(t.querySelectorAll("#fibo-level")).every((function(e){return""!=e.value&&e.value>0}))?E(t.querySelectorAll("#takeprofit")).every((function(e){return""!=e.value}))?!!E(t.querySelectorAll("#stoploss")).every((function(e){return""!=e.value}))||(alert("StopLoss задан неврено"),!1):(alert("TakeProfit задан неврено"),!1):(alert("Один из уровней срабатывания задан неверно"),!1):(alert("Один из объемов профита не задан"),!1)}function C(e){var t=document.querySelector("#pairSettings #pair-template");if(""==e)t.options[1].selected=!0;else for(var n=0;n<t.options.length;n++)if(t.options[n].text==e){t.options[n].selected=!0;break}}function E(e){return Array.prototype.slice.call(e)}function D(e){var t=new XMLHttpRequest;if(t.open("GET",URL+e,!1),t.send(),200==t.status)return t.responseText;alert(t.status+": "+t.statusText)}document.addEventListener("DOMContentLoaded",(function(){var l=new d,c=new m(a),u=document.querySelector("div.activePairs ul.list-group"),s=document.querySelector("div.newPair #available-pairs"),v=document.querySelector("div.newPair #pair-template"),p=document.querySelector("#pairSettings #pair-template"),y=document.getElementById("api-key-active"),f=e;y.innerHTML=f.apiKey,document.querySelector("#connectAPI #connect").addEventListener("click",(function(){var e=document.querySelector("#connectAPI #api-key"),t=document.querySelector("#connectAPI #secret-key");""!=e.value&&""!=t.value?(!function(e,t){var n=new XMLHttpRequest;if(n.open("GET",URL,!1),n.setRequestHeader("Content-Type","connectApi"),n.send(e),200==n.status)return n.responseText;alert(n.status+": "+n.statusText)}({key:e.value,secret:t.value}),JSON.parse(D("api"))):alert("Ключи не заданы")}));var L=r;u.innerHTML="",L.length>0&&L.forEach((function(e){u.insertAdjacentHTML("beforeend",S(e.symbol))})),document.querySelectorAll("div.activePairs button.close-orders").forEach((function(e){e.addEventListener("click",(function(){console.log("Request to closeOrders?symbol=".concat(e.name));var t=i;u.innerHTML="",t.length>0&&t.forEach((function(e){u.insertAdjacentHTML("beforeend",S(e.symbol))}))}))}));var C=t;T(s,C),document.querySelectorAll("button.settings-orders").forEach((function(e){e.addEventListener("click",(function(){l.update=o,document.querySelector("#pairSettings span.pair").innerHTML=l.current.symbol,P(l.current,!0)}))})),h(p,c.current),p.addEventListener("change",(function(){for(var e=document.querySelector("#pairSettings #pair-template"),t={},n=0;n<c.current.length;n++)if(e.selectedOptions[0].text==c.current[n].name){t=c.current[n];break}switch(l.update=o,p.selectedOptions[0].value){case"none":!function(){var e=document.querySelector("#pairSettings #cycle-duration"),t=document.querySelector("#pairSettings #waitSignal"),n=document.querySelector("#pairSettings #cycle-delay"),r=document.querySelector("#pairSettings #price1-fibo"),i=document.querySelector("#pairSettings #price2-fibo"),o=document.querySelector("#pairSettings div.fibo-container"),a=document.querySelector("#pairSettings #orders-number");t.checked=!1,e.value="",n.value="",r.value="",i.value="",a.value="",e.disabled=!1,o.innerHTML=""}();break;case"default":P(l.current);break;default:P(t)}}));var E=document.querySelector("#pairSettings #waitSignal"),A=document.querySelector("#pairSettings #cycle-duration");E.addEventListener("click",(function(){E.checked?A.disabled=!0:A.disabled=!1}));var M=document.querySelector("#pairSettings #orders-number");document.querySelector("#pairSettings button.choose-orders-number").addEventListener("click",(function(){var e=M.value;k(document.querySelector("#pairSettings div.fibo-container"),l.current,e)})),document.querySelector("#pairSettings button.saveTemplate").addEventListener("click",(function(){var e=document.querySelector("#pairSettings input.template-name"),t=document.querySelector("#pairSettings #cycle-duration"),n=document.querySelector("#pairSettings #waitSignal"),r=document.querySelector("#pairSettings #cycle-delay"),i=document.querySelector("#pairSettings #price1-fibo"),o=document.querySelector("#pairSettings #price2-fibo"),l=document.querySelector("#pairSettings div.fibo-container"),u=document.querySelector("#pairSettings #orders-number");w({name:e.value,waitSignal:n.checked,cycleDuration:t.value,delay:r.value,price1:i.value,price2:o.value,levelCount:u.value,fiboContainer:l},c.current,"newTemplate")&&(c.update=a,function(e,t){e.innerHTML='\n        <option value="none">Пустой</option>\n        <option value="default">Настройки пары</option>\n        ';for(var n=0;n<t.length;n++)e.insertAdjacentHTML("beforeend",g(n,t[n].name))}(v,c.current),h(p,c.current))})),document.querySelector("#pairSettings #save").addEventListener("click",(function(){var e=document.querySelector("#pairSettings span.pair"),t=document.querySelector("#pairSettings #cycle-duration"),n=document.querySelector("#pairSettings #waitSignal"),r=document.querySelector("#pairSettings #cycle-delay"),i=document.querySelector("#pairSettings #price1-fibo"),o=document.querySelector("#pairSettings #price2-fibo"),a=document.querySelector("#pairSettings div.fibo-container"),l=document.querySelector("#pairSettings #orders-number");q({symbol:e.innerText,template:"",waitSignal:n.checked,cycleDuration:t.value,delay:r.value,price1:i.value,price2:o.value,levelCount:l.value,fiboContainer:a},c.current,"settingsUpdate")})),h(v,c.current),v.addEventListener("change",(function(){for(var e=document.querySelector("div.newPair #pair-template"),t={},n=0;n<c.current.length;n++)if(e.selectedOptions[0].text==c.current[n].name){t=c.current[n];break}"none"===v.selectedOptions[0].value?function(){var e=document.querySelector("div.newPair #cycle-duration"),t=document.querySelector("div.newPair #waitSignal"),n=document.querySelector("div.newPair #cycle-delay"),r=document.querySelector("div.newPair #price1-fibo"),i=document.querySelector("div.newPair #price2-fibo"),o=document.querySelector("div.newPair div.fibo-container"),a=document.querySelector("div.newPair #orders-number");t.checked=!1,e.value="",n.value="",r.value="",i.value="",a.value="",e.disabled=!1,o.innerHTML=""}():function(e,t){var n=document.querySelector("div.newPair #cycle-duration"),r=document.querySelector("div.newPair #waitSignal"),i=document.querySelector("div.newPair #cycle-delay"),o=document.querySelector("div.newPair #price1-fibo"),a=document.querySelector("div.newPair #price2-fibo"),l=document.querySelector("div.newPair div.fibo-container"),c=document.querySelector("div.newPair #orders-number");r.checked=e.waitSignal,n.value=e.cycleDuration,i.value=e.delay,o.value=e.price1,a.value=e.price2,c.value=e.levelCount,e.waitSignal?n.disabled=!0:n.disabled=!1,l.innerHTML="",e.levels.forEach((function(e){l.insertAdjacentHTML("beforeend",b(e.level,e.amount,e.takeProfit,e.stopLoss))}))}(t)}));var H=document.querySelector("div.newPair #waitSignal"),O=document.querySelector("div.newPair #cycle-duration");H.addEventListener("click",(function(){H.checked?O.disabled=!0:O.disabled=!1}));var j=document.querySelector("div.newPair #orders-number");document.querySelector("div.newPair button.choose-orders-number").addEventListener("click",(function(){var e=j.value;k(document.querySelector("div.newPair div.fibo-container"),{},e)})),document.querySelector("div.newPair button.saveTemplate").addEventListener("click",(function(){var e=document.querySelector("div.newPair input.template-name"),t=document.querySelector("div.newPair #cycle-duration"),n=document.querySelector("div.newPair #waitSignal"),r=document.querySelector("div.newPair #cycle-delay"),i=document.querySelector("div.newPair #price1-fibo"),o=document.querySelector("div.newPair #price2-fibo"),l=document.querySelector("div.newPair div.fibo-container"),u=document.querySelector("div.newPair #orders-number");w({name:e.value,waitSignal:n.checked,cycleDuration:t.value,delay:r.value,price1:i.value,price2:o.value,levelCount:u.value,fiboContainer:l},c.current,"newTemplate")&&(c.update=a,h(v,c.current),h(p,c.current))})),document.querySelector("div.newPair #addNewPair").addEventListener("click",(function(){var e=document.querySelector("div.newPair #available-pairs"),t=document.querySelector("div.newPair #cycle-duration"),r=document.querySelector("div.newPair #waitSignal"),i=document.querySelector("div.newPair #cycle-delay"),o=document.querySelector("div.newPair #price1-fibo"),a=document.querySelector("div.newPair #price2-fibo"),l=document.querySelector("div.newPair div.fibo-container"),u=document.querySelector("div.newPair #orders-number");q({symbol:e.selectedOptions[0].text,template:"",waitSignal:r.checked,cycleDuration:t.value,delay:i.value,price1:o.value,price2:a.value,levelCount:u.value,fiboContainer:l},c.current,"newPair")&&T(s,C=n)})),document.querySelector("div.actions #close-orders-all").addEventListener("click",(function(){confirm("Вы уверены, что хотите закрыть все сделки?")&&D("closeAll")}))}))})();