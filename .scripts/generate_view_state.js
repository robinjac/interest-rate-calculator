var N=Object.create;var h=Object.defineProperty;var B=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var v=Object.getPrototypeOf,P=Object.prototype.hasOwnProperty;var A=t=>h(t,"__esModule",{value:!0});var C=(t,e,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of S(e))!P.call(t,r)&&r!=="default"&&h(t,r,{get:()=>e[r],enumerable:!(n=B(e,r))||n.enumerable});return t},d=t=>C(A(h(t!=null?N(v(t)):{},"default",t&&t.__esModule&&"default"in t?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var g=d(require("fs")),y=d(require("path"));var f=["master","develop","devel","development","main"],m=["main","release","feature","user","other"];var R=63;function T(t){return L(U(t)).substring(0,R)}function p(t){return T(t.toLowerCase())}function L(t){return t.replace(RegExp("^-*","g"),"").replace(RegExp("-*$","g"),"")}function U(t){return t.replace(RegExp("[^a-zA-Z0-9._]","g"),"-")}var o=new Map,M=[],u=[],D=[],c=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],E=[0,1,2,3,4,5,6,7,8,9],l=[...E.map(t=>t.toString()),...c,"-","/"],_={id:Date.now(),host_repository:i(10,c),projects:[]};function i(t,e){let n=[],r=e.length-1;for(let s=0;s<t;s++){let a=e[Math.round(Math.random()*r)];n.push(Math.random()>.5?a.toUpperCase():a)}return n.join("")}function w(t){let e=i(t,c).toUpperCase();return o.has(e)?w(t):(o.set(e,1),e+"-"+o.get(e))}function k(t){return o.has(t)?o.set(t,o.get(t)+1):o.set(t,1),t+"-"+o.get(t)}function b(){let t=i(4,c).toLowerCase();return u.includes(t)?b():(u.push(t),t)}function H(){let t=new Date(2012,0,1),e=new Date,n=new Date(t.getTime()+Math.random()*(e.getTime()-t.getTime())),r=n.getFullYear(),s=n.getMonth()+1,a=n.getDate(),$=n.getHours(),I=n.getMinutes();return`${r}-${s<10?`0${s}`:s}-${a<10?`0${a}`:a} ${$}:${I}`}function j(){let t=Math.round(Math.random()*99).toString()+"."+Math.round(Math.random()*99).toString()+"."+Math.round(Math.random()*999).toString();return D.includes(t)?j():(D.push(t),t)}function F(t){if(t==="main"){for(let e of f)if(!M.includes(e))return M.push(e),e}if(t==="user"||t==="feature"){let e=Array.from(o.keys()),n=e.length===0?w(2+Math.round(Math.random()*2))+"-":k(e[Math.round(Math.random()*(e.length-1))]),r=Math.random()>.5?n:"";if(t==="feature")return"feature/"+r+i(Math.round(10+Math.random()*10),l).toLowerCase();let s=Math.random()>.5||u.length===0?b():u[Math.round(Math.random()*(u.length-1))];return"user/"+s+"/"+r+i(Math.round(10+Math.random()*10),l).toLowerCase()}return t==="release"?"release/"+j():i(Math.round(5+Math.random()*10),l)}for(let t=0;t<5;t++){let e={main:[],user:[],release:[],feature:[],other:[]};for(let r=0;r<500;r++){let s=m[Math.round(Math.random()*(m.length-1))],a=F(s);e[s].push({name:a,slug:p(a),date:H()})}let n={name:i(10,c),repository:i(10,c),branches:e};_.projects.push(n)}var x="./src/daily-client/test/view_state.json";if(!g.default.existsSync(x)){let t=y.default.dirname(x);g.default.mkdirSync(t,{recursive:!0})}g.default.writeFileSync("./src/daily-client/test/view_state.json",JSON.stringify(_,null,4));
