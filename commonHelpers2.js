import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as o}from"./assets/vendor-77e16229.js";const c=document.querySelector(".form");c.addEventListener("submit",m);function m(t){t.preventDefault();const i=t.target.querySelector('input[name="state"]:checked').value,s=Number(t.target.querySelector('input[name="delay"]').value);new Promise((e,r)=>{setTimeout(()=>{i==="fulfilled"?e(s):i==="rejected"&&r(s)},s)}).then(e=>{o.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{o.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,position:"topRight"})})}
//# sourceMappingURL=commonHelpers2.js.map
