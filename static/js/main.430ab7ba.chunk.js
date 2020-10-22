(this["webpackJsonphooks-app"]=this["webpackJsonphooks-app"]||[]).push([[0],[,,,,,,,,function(e,t,n){e.exports=n(22)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(6),c=n.n(l),o=(n(13),n(14),function(e){return r.a.createElement("div",{className:"card"},e.children)}),i=n(3),u=n(1),s=n(7),m={isLoading:!1,error:null,requestType:null,data:null,extraDetail:null},d=function(e,t){switch(t.type){case"SEND":return{isLoading:!0,error:null,data:null,extraDetail:null,requestType:t.reqType};case"RESPONSE":return Object(i.a)(Object(i.a)({},e),{},{isLoading:!1,error:null,data:t.responseData,extraDetail:t.extraData});case"ERROR":return{isLoading:!1,error:t.errorMessage};case"CLEAR":return m;default:throw new Error("Soemthing went wrong")}},E=function(){var e=Object(a.useReducer)(d,m),t=Object(u.a)(e,2),n=t[0],r=t[1],l=Object(a.useCallback)((function(){return r({type:"CLEAR"})}),[]),c=Object(a.useCallback)((function(e,t,n,a,l){r({type:"SEND",reqType:l}),fetch(e,{method:t,body:n,headers:{"Content-Type":"appication/json"}}).then((function(e){return e.json()})).then((function(e){r({type:"RESPONSE",responseData:e,extraData:a})})).catch((function(e){r({type:"ERROR",errorMessage:"Something went wrong!"})}))}),[]);return{isLoading:n.isLoading,error:n.error,data:n.data,requestType:n.requestType,extraDetail:n.extraDetail,sendHttpRequest:c,clearError:l}},f=(n(15),r.a.memo((function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"backdrop",onClick:e.onClose}),r.a.createElement("div",{className:"error-modal"},r.a.createElement("h2",null,"An Error Occurred!"),r.a.createElement("p",null,e.children),r.a.createElement("div",{className:"error-modal__actions"},r.a.createElement("button",{type:"button",onClick:e.onClose},"Okay"))))}))),p=(n(16),function(){return r.a.createElement("div",{className:"lds-ring"},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null))}),b=(n(17),r.a.memo((function(e){var t=Object(a.useState)(""),n=Object(u.a)(t,2),l=n[0],c=n[1],i=Object(a.useState)(""),s=Object(u.a)(i,2),m=s[0],d=s[1];return r.a.createElement("section",{className:"ingredient-form"},r.a.createElement(o,null,r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.addItem({name:l,quantity:m})}},r.a.createElement("div",{className:"form-control"},r.a.createElement("label",{htmlFor:"title"},"NAME"),r.a.createElement("input",{type:"text",id:"title",value:l,name:"title",onChange:function(e){return c(e.target.value)}})),r.a.createElement("div",{className:"form-control"},r.a.createElement("label",{htmlFor:"Quantity"},"QUANTITY"),r.a.createElement("input",{type:"number",id:"Quantity",value:m,name:"Quantity",onChange:function(e){return d(e.target.value)}})),r.a.createElement("div",{className:"ingredient-form__actions"},r.a.createElement("button",{type:"submit"},"Add Item"),e.isLoading&&r.a.createElement(p,null)))))}))),h=(n(18),function(e){return r.a.createElement("section",{className:"ingredient-list"},r.a.createElement("h2",null,"Added Items"),r.a.createElement("ul",null,e.items.map((function(t){return r.a.createElement("li",{key:t.id,onClick:e.removeItem.bind(void 0,t.id)},r.a.createElement("span",null,t.name),r.a.createElement("span",null,t.quantity,"x"))}))))}),g=(n(19),r.a.memo((function(e){var t=e.setSearchResult,n=Object(a.useState)(""),l=Object(u.a)(n,2),c=l[0],i=l[1],s=Object(a.useRef)();return Object(a.useEffect)((function(){var e=setTimeout((function(){if(c===s.current.value){var e=0===c.length?"":'?orderBy="name"&equalTo="'.concat(c,'"');fetch("https://biller-app-d0f61.firebaseio.com/shoppinglist.json"+e).then((function(e){return e.json()})).then((function(e){var n=[];for(var a in e)n.push({id:a,name:e[a].name,quantity:e[a].quantity});t(n)}))}}),500);return function(){return clearTimeout(e)}}),[c,t]),r.a.createElement("section",{className:"search"},r.a.createElement(o,null,r.a.createElement("div",{className:"search-input"},r.a.createElement("label",null,"Filter by Title"),r.a.createElement("input",{type:"text",ref:s,value:c,onChange:function(e){return i(e.target.value)}}))))}))),v=function(e,t){switch(t.type){case"SET":return t.items;case"ADD":return[].concat(Object(s.a)(e),[t.newItem]);case"DEL":return e.filter((function(e){return e.id!==t.deleteId}));default:throw new Error("Soemthing went wrong")}},y=function(){var e=Object(a.useReducer)(v,[]),t=Object(u.a)(e,2),n=t[0],l=t[1],c=E(),o=c.isLoading,s=c.error,m=c.data,d=c.requestType,p=c.extraDetail,y=c.sendHttpRequest,O=c.clearError;Object(a.useEffect)((function(){o||s||("DELETE"===d?l({type:"DEL",deleteId:p}):"ADD"===d&&l({type:"ADD",newItem:Object(i.a)({id:m.name},p)}))}),[o,s,d,p,m]);var j=Object(a.useCallback)((function(e){y("https://biller-app-d0f61.firebaseio.com/shoppinglist.json","POST",JSON.stringify(e),e,"ADD")}),[y]),D=Object(a.useCallback)((function(e){y("https://biller-app-d0f61.firebaseio.com/shoppinglist/".concat(e,".json"),"delete",null,e,"DELETE")}),[y]),N=Object(a.useCallback)((function(e){l({type:"SET",items:e})}),[]),C=Object(a.useMemo)((function(){return r.a.createElement(h,{items:n,removeItem:D})}),[n,D]);return r.a.createElement("div",{className:"App"},s&&r.a.createElement(f,{onClose:O},s),r.a.createElement(b,{addItem:j,isLoading:o}),r.a.createElement("section",null,r.a.createElement(g,{setSearchResult:N}),C))},O=r.a.createContext({isLoggedIn:!1,logInAction:function(){}}),j=function(e){var t=Object(a.useState)(!1),n=Object(u.a)(t,2),l=n[0],c=n[1];return r.a.createElement(O.Provider,{value:{isLoggedIn:l,logInAction:function(){c(!0)}}},e.children)},D=(n(20),function(e){var t=Object(a.useContext)(O);return r.a.createElement("div",{className:"auth"},r.a.createElement(o,null,r.a.createElement("h2",null,"You are not authenticated!"),r.a.createElement("p",null,"Please log in to continue."),r.a.createElement("button",{onClick:t.logInAction},"Log In")))}),N=(n(21),function(e){var t=Object(a.useContext)(O),n=r.a.createElement(D,null);return t.isLoggedIn&&(n=r.a.createElement(y,null)),r.a.createElement(a.Fragment,null,r.a.createElement("section",{className:"header-section"},r.a.createElement(o,null,r.a.createElement("h2",null,"Add to Shopping List "))),n)});c.a.render(r.a.createElement(j,null,r.a.createElement(N,null)),document.getElementById("root"))}],[[8,1,2]]]);
//# sourceMappingURL=main.430ab7ba.chunk.js.map