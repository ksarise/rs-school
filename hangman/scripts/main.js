import {generateElement} from './generateElement.js';
document.addEventListener("DOMContentLoaded", function (){
 const body = document.querySelector("body");
 const header = generateElement("div", "header", body, "header");
 const h = generateElement("h1", "title", header, "Hangman");
 const picture = generateElement("img", "img1", header);

});