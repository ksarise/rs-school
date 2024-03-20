var E=Object.defineProperty;var N=(n,e,t)=>e in n?E(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var l=(n,e,t)=>(N(n,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();class o{constructor(e){l(this,"element");this.element=this.generateElement(e)}getElement(){return this.element}appendElement(e){if(!this.element)return;let t;e instanceof o?t=e.getElement():t=e,t&&this.element.append(t)}appendChildren(e){e.forEach(t=>{this.appendElement(t)})}generateElement({tag:e,className:t,content:a,attributes:s,event:r,eventCallback:c}){const g=document.createElement(e);return this.element=g,t&&g.classList.add(t),a&&(g.textContent=a),s&&Object.keys(s).forEach(d=>{g.setAttribute(d,s[d])}),r&&c&&g.addEventListener(r,c),g}}class B{constructor(){l(this,"wrap");const e=new o({tag:"div",className:"page-wrap"});this.wrap=e.getElement()}getWrap(){return this.wrap}cleanWrap(){this.wrap.innerHTML=""}}class k{constructor(e,t){l(this,"inputField");const a=new o({tag:"input",className:e,attributes:{required:""},event:"input",eventCallback:t});this.inputField=a.getElement()}getElement(){return this.inputField}}class v{constructor(e,t){l(this,"label");const a=new o({tag:"label",className:e,content:t});this.label=a.getElement()}getLabel(){return this.label}}function p(n,e){let t="";return e>n.length?t=`Minimum ${e} letters`:/^[A-Z]/.test(n[0])?/^[A-Za-z-]+$/.test(n)?t="ok":t="Only English alphabet letters or the hyphen":t="The first letter must be uppercase",t}class h{constructor(e,t,a,s){l(this,"block");l(this,"NameLabel");l(this,"NameInput");l(this,"errorInput");const r=new o({tag:"div",className:e,nameLength:a,event:"input",eventCallback:s});this.block=r.getElement(),this.NameLabel=new v(`${e.trim()}Label`,t),this.NameInput=new k(`${e.trim()}Input`,()=>this.validateForm(this.NameInput.getElement().value,a)),this.errorInput=new o({tag:"span",className:"inputError"}).getElement(),r.appendChildren([this.NameLabel.getLabel(),this.NameInput.getElement(),this.errorInput])}getBlock(){return this.block}validateForm(e,t){p(e,t)!=="ok"?(this.block.classList.remove("valid"),this.errorInput.textContent=`${p(e,t)}`):(this.block.classList.add("valid"),this.errorInput.textContent="")}}class m{constructor(e,t,a,s){l(this,"button");const r=new o({tag:"button",className:e,content:t,attributes:a,event:"click",eventCallback:s});this.button=r.getElement()}getButton(){return this.button}}function L(n,e,t){n.preventDefault();const a={name:e,surname:t};localStorage.setItem("ksarisePuzzleSession",JSON.stringify(a)),u()}class P{constructor(){l(this,"form");l(this,"firstNameBlock");l(this,"lastNameBlock");l(this,"loginBtn");const e=new o({tag:"form",className:"loginForm"});this.form=e.getElement(),this.firstNameBlock=new h("firstName","First Name",3,()=>this.unblockButton()),this.lastNameBlock=new h("lastName","Last Name",4,()=>this.unblockButton()),this.loginBtn=new m("loginBtn","Login",{disabled:"true",type:"submit"},()=>{}),console.log(this.loginBtn),e.appendChildren([this.firstNameBlock.getBlock(),this.lastNameBlock.getBlock(),this.loginBtn.getButton()]),this.form.addEventListener("submit",t=>L(t,this.firstNameBlock.NameInput.getElement().value,this.lastNameBlock.NameInput.getElement().value))}getForm(){return this.form}unblockButton(){this.loginBtn.getButton().disabled=!(this.firstNameBlock.getBlock().classList.contains("valid")&&this.lastNameBlock.getBlock().classList.contains("valid"))}}const f=()=>{localStorage.removeItem("ksarisePuzzleSession"),u()};class w{constructor(){l(this,"head");const e=new o({tag:"header",className:"header"});this.head=e.getElement();const t=new m("logout-btn","Log Out",{type:"button"},()=>f());t.getButton().addEventListener("click",f),this.head.appendChild(t.getButton())}getHeader(){return this.head}}const y="Embark on a linguistic adventure with our captivating puzzle game, inspired by Lingualeo. Explore diverse challenges, unlock vocabulary, and master languages with every engaging twist and turn.";function C(){const n=localStorage.getItem("ksarisePuzzleSession");if(n){const e=JSON.parse(n);return`${e.name} ${e.surname}`}return"no local storage!"}const I=`Hello, ${C()} !`;function W(n){const e=n;let t=e.length,a;for(;t>0;)a=Math.floor(Math.random()*t),t-=1,[e[t],e[a]]=[e[a],e[t]];return e}function S(n,e,t){n.addEventListener("click",()=>{e.removeChild(n),t.appendChild(n)})}class G{constructor(e,t){l(this,"sentence");l(this,"wordContainer");this.sentence=e,this.wordContainer=t}renderWords(e,t){const a=this.sentence.split(" ");W(a).forEach(s=>{const r=new o({tag:"div",className:"word",content:s}).getElement();S(r,e,t),this.wordContainer.appendChild(r)})}}class z{constructor(){l(this,"gamePage");const e=new o({tag:"main",className:"game-page"}),t=new o({tag:"h1",className:"game-title",content:"Main Game Page"}),a=new o({tag:"div",className:"playground-block"}),s=new o({tag:"div",className:"source-block"});new G("Design Main Game Page with",s.getElement()).renderWords(s.getElement(),a.getElement()),e.appendChildren([t,a,s]),this.gamePage=e.getElement()}getGamePage(){return this.gamePage}}const b=new m("start-btn","Start",{type:"button"},()=>{});b.getButton().addEventListener("click",()=>{i.cleanWrap();const n=new z,e=new w;i.getWrap().appendChild(e.getHeader()),i.getWrap().appendChild(n.getGamePage())});class F{constructor(){l(this,"start");const e=new o({tag:"main",className:"start-page"}),t=new o({tag:"h2",className:"start-greeting",content:I}),a=new o({tag:"p",className:"start-welcome",content:"Welcome to"}),s=new o({tag:"h1",className:"start-title",content:"RSS - Puzzle"}),r=new o({tag:"div",className:"start-description",content:y});e.appendChildren([t.getElement(),a.getElement(),s.getElement(),r.getElement(),b.getButton()]),this.start=e.getElement()}getStart(){return this.start}}const O=document.body,i=new B;O.appendChild(i.getWrap());function u(){if(i.cleanWrap(),localStorage.getItem("ksarisePuzzleSession")){i.cleanWrap();const n=new w,e=new F;i.getWrap().appendChild(n.getHeader()),i.getWrap().appendChild(e.getStart())}else{i.cleanWrap();const n=new P;i.getWrap().appendChild(n.getForm())}}u();