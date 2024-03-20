var b=Object.defineProperty;var B=(s,t,e)=>t in s?b(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var i=(s,t,e)=>(B(s,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();class o{constructor(t){i(this,"element");this.element=this.generateElement(t)}getElement(){return this.element}appendElement(t){if(!this.element)return;let e;t instanceof o?e=t.getElement():e=t,e&&this.element.append(e)}appendChildren(t){t.forEach(e=>{this.appendElement(e)})}generateElement({tag:t,className:e,content:a,attributes:n,event:r,eventCallback:c}){const u=document.createElement(t);return this.element=u,e&&u.classList.add(e),a&&(u.textContent=a),n&&Object.keys(n).forEach(p=>{u.setAttribute(p,n[p])}),r&&c&&u.addEventListener(r,c),u}}class E{constructor(){i(this,"wrap");const t=new o({tag:"div",className:"page-wrap"});this.wrap=t.getElement()}getWrap(){return this.wrap}cleanWrap(){this.wrap.innerHTML=""}}class w{constructor(t,e){i(this,"inputField");const a=new o({tag:"input",className:t,attributes:{required:""},event:"input",eventCallback:e});this.inputField=a.getElement()}getElement(){return this.inputField}}class N{constructor(t,e){i(this,"label");const a=new o({tag:"label",className:t,content:e});this.label=a.getElement()}getLabel(){return this.label}}function d(s,t){let e="";return t>s.length?e=`Minimum ${t} letters`:/^[A-Z]/.test(s[0])?/^[A-Za-z-]+$/.test(s)?e="ok":e="Only English alphabet letters or the hyphen":e="The first letter must be uppercase",e}class h{constructor(t,e,a,n){i(this,"block");i(this,"NameLabel");i(this,"NameInput");i(this,"errorInput");const r=new o({tag:"div",className:t,nameLength:a,event:"input",eventCallback:n});this.block=r.getElement(),this.NameLabel=new N(`${t.trim()}Label`,e),this.NameInput=new w(`${t.trim()}Input`,()=>this.validateForm(this.NameInput.getElement().value,a)),this.errorInput=new o({tag:"span",className:"inputError"}).getElement(),r.appendChildren([this.NameLabel.getLabel(),this.NameInput.getElement(),this.errorInput])}getBlock(){return this.block}validateForm(t,e){d(t,e)!=="ok"?(this.block.classList.remove("valid"),this.errorInput.textContent=`${d(t,e)}`):(this.block.classList.add("valid"),this.errorInput.textContent="")}}class m{constructor(t,e,a,n){i(this,"button");const r=new o({tag:"button",className:t,content:e,attributes:a,event:"click",eventCallback:n});this.button=r.getElement()}getButton(){return this.button}}function k(s,t,e){s.preventDefault();const a={name:t,surname:e};localStorage.setItem("ksarisePuzzleSession",JSON.stringify(a)),g()}class v{constructor(){i(this,"form");i(this,"firstNameBlock");i(this,"lastNameBlock");i(this,"loginBtn");const t=new o({tag:"form",className:"loginForm"});this.form=t.getElement(),this.firstNameBlock=new h("firstName","First Name",3,()=>this.unblockButton()),this.lastNameBlock=new h("lastName","Last Name",4,()=>this.unblockButton()),this.loginBtn=new m("loginBtn","Login",{disabled:"true",type:"submit"},()=>{}),console.log(this.loginBtn),t.appendChildren([this.firstNameBlock.getBlock(),this.lastNameBlock.getBlock(),this.loginBtn.getButton()]),this.form.addEventListener("submit",e=>k(e,this.firstNameBlock.NameInput.getElement().value,this.lastNameBlock.NameInput.getElement().value))}getForm(){return this.form}unblockButton(){this.loginBtn.getButton().disabled=!(this.firstNameBlock.getBlock().classList.contains("valid")&&this.lastNameBlock.getBlock().classList.contains("valid"))}}const f=()=>{localStorage.removeItem("ksarisePuzzleSession"),g()};class L{constructor(){i(this,"head");const t=new o({tag:"header",className:"header"});this.head=t.getElement();const e=new m("logout-btn","Log Out",{type:"button"},()=>f());e.getButton().addEventListener("click",f),this.head.appendChild(e.getButton())}getHeader(){return this.head}}const y="Embark on a linguistic adventure with our captivating puzzle game, inspired by Lingualeo. Explore diverse challenges, unlock vocabulary, and master languages with every engaging twist and turn.";class I{constructor(){i(this,"start");const t=new o({tag:"main",className:"start-page"}),e=new o({tag:"h1",className:"start-title",content:"RSS - Puzzle"}),a=new o({tag:"div",className:"start-description",content:y}),n=new m("start-btn","Start",{type:"button"},()=>{});t.appendChildren([e.getElement(),a.getElement(),n.getButton()]),this.start=t.getElement()}getStart(){return this.start}}const S=document.body,l=new E;function g(){if(l.cleanWrap(),S.appendChild(l.getWrap()),localStorage.getItem("ksarisePuzzleSession")){l.cleanWrap();const s=new L,t=new I;l.getWrap().appendChild(s.getHeader()),l.getWrap().appendChild(t.getStart())}else{l.cleanWrap();const s=new v;l.getWrap().appendChild(s.getForm())}}g();
