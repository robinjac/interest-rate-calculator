var l=Object.create;var t=Object.defineProperty;var s=Object.getOwnPropertyDescriptor;var c=Object.getOwnPropertyNames;var f=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty;var h=e=>t(e,"__esModule",{value:!0});var d=(e,n,a)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of c(n))!p.call(e,r)&&r!=="default"&&t(e,r,{get:()=>n[r],enumerable:!(a=s(n,r))||a.enumerable});return e},i=e=>d(h(t(e!=null?l(f(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);var o=i(require("fs")),m=i(require("path")),g=process.argv.filter(e=>e!=="--experimental-modules")[2],S=(0,m.join)(__dirname,"branch.json");(0,o.writeFileSync)(S,JSON.stringify({name:g,date:new Date().toLocaleString()},null,2));
