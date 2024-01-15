import {generateElement} from './generateElement.js';
document.addEventListener("DOMContentLoaded", function (){
  const body = document.querySelector("body");
  const header = generateElement("header", "header", body, "header");
  const h = generateElement("h1", "title", header, "Hangman");
  const main = generateElement("main", "main", body);
  const hangpic = generateElement("section", "pic-block", main);
  const pictures = [
    "./images/hangman.jpeg",
  ]
  const picture = generateElement("img", "img1", hangpic,"" ,pictures[0]);
  const quiz = generateElement("section", "quiz-block", main);
  const quest = generateElement("div", "quest-block", quiz, "quest");
  const definition = generateElement("div", "def-block", quiz, "definition");
  const fails = generateElement("div", "fails-block", quiz, "Incorrect answers:")
  const keyboard = generateElement("section", "keyboard-block", main, "Keyboard");



});