(this["webpackJsonpgit-api"]=this["webpackJsonpgit-api"]||[]).push([[0],{22:function(e,t,n){},23:function(e,t,n){},24:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),s=n(16),i=n.n(s),r=(n(22),n(23),n(9)),o=(n(24),n(2)),l=n(10),u=n(1),j=function(e){var t=e.repo;return Object(u.jsx)(u.Fragment,{children:Object(u.jsx)("h2",{children:t.name})})},d=function(){var e=Object(c.useState)([]),t=Object(r.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)(""),i=Object(r.a)(s,2),d=i[0],b=i[1],h=Object(c.useState)(""),p=Object(r.a)(h,2),O=p[0],f=p[1],x=Object(c.useState)([]),m=Object(r.a)(x,2),g=m[0],v=m[1],C=function(e){v(e.target.value)};return Object(c.useEffect)((function(){var e;(e="bogdan",fetch("https://api.github.com/users/"+e).then((function(e){return e.json()}))).then((function(e){return fetch(e.repos_url).then((function(e){return e.json()})).then((function(e){return a(e)}))}))}),[]),n.sort((function(e,t){switch(O){case"date":return e.updated_at.localeCompare(t.updated_at);case"title":return e.name.localeCompare(t.name)}})),Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)(o.a,{path:"/",exact:!0,children:[Object(u.jsx)("h1",{className:"title",children:"List of Repositories"}),Object(u.jsx)("input",{type:"text",value:d,onChange:function(e){b(e.target.value)}}),Object(u.jsxs)("select",{value:O,onChange:function(e){f(e.target.value)},children:[Object(u.jsx)("option",{value:"",children:"choose filter"}),Object(u.jsx)("option",{value:"date",children:"by date uppdate"}),Object(u.jsx)("option",{value:"title",children:"by title"})]}),Object(u.jsx)("ul",{className:"list",children:n.filter((function(e){return e.name.toLowerCase().includes(d.toLocaleLowerCase())})).map((function(e){return Object(u.jsxs)("li",{children:[Object(u.jsxs)("div",{className:"autor-container",children:[Object(u.jsx)("p",{className:"autor",children:"Autor: ".concat(e.owner.login)}),Object(u.jsx)("img",{className:"photo",alt:"autor of repo",src:e.owner.avatar_url})]}),Object(u.jsx)(l.b,{value:e,onClick:C,className:"name",to:"/details",children:"Title: ".concat(e.name)}),Object(u.jsx)("p",{className:"details",children:"Details: ".concat(e.description)}),Object(u.jsx)("p",{className:"update",children:"Last uppdate: ".concat(e.updated_at)}),Object(u.jsx)("p",{className:"rating",children:"Rating: ".concat(e.size)})]},e.id)}))})]}),Object(u.jsx)(o.a,{path:"/details",children:Object(u.jsx)(j,{repo:g})})]})};var b=function(){return Object(u.jsx)("div",{className:"App",children:Object(u.jsx)(d,{})})},h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,32)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),c(e),a(e),s(e),i(e)}))};i.a.render(Object(u.jsx)(l.a,{children:Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(b,{})})}),document.getElementById("root")),h()}},[[31,1,2]]]);
//# sourceMappingURL=main.458f9c03.chunk.js.map