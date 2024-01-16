import {generateElement} from './generateElement.js';
document.addEventListener("DOMContentLoaded", function (){
  const body = document.querySelector("body");
  const header = generateElement("header", "header", body,);
  const github = generateElement("div", "github", header, "Github");
  const h = generateElement("h1", "title", header, "Hangman");
  const main = generateElement("main", "main", body);
  const hangpic = generateElement("section", "pic-block", main);
  const pictures = [
    "./images/hangman.jpeg",
  ]
  const picture = generateElement("img", "img1", hangpic,"" ,pictures[0]);
  const quiz = generateElement("section", "quiz-block", main);
  const word = generateElement("div", "word-block", quiz, "word");
  const definition = generateElement("div", "def-block", quiz, "definition");
  const fails = generateElement("div", "fails-block", quiz, "Incorrect answers:")
  const keyboard = generateElement("section", "keyboard-block", main, "Keyboard");
  const keys = [];
  for (let i = 65; i <= 90; i += 1) {
    const key = String.fromCharCode(i);
    const letter = generateElement("div", "key", keyboard, key);
    keys.push(letter);
    letter.addEventListener ('click', () => {
      toogleKey(letter.textContent.toLowerCase());
      console.log(letter.textContent);
    })
  }

  document.addEventListener("keydown", (elem) => {
    const downKey = elem.key.toLowerCase();
    if (/^[a-z]$/.test(downKey)) {
      console.log(downKey);
      toogleKey(downKey);
    }
  });

  let hideWord = "";
  let secretWord = "";
  async function defBase() {
    const response = await fetch("./base.json");
    const data = await response.json();
    let indexRandom = Math.floor(Math.random() * data.length);
    secretWord = data[indexRandom].secret;
    hideWord = secretWord.replace (/./g, "_");
    word.textContent = hideWord;
    definition.textContent = data[indexRandom].definition;
    console.log(secretWord);
    return secretWord;
  }

  let failsCount = 0;
  function toogleLetter(letter) {
    if (secretWord.includes(letter)) {
      for (let i = 0; i < secretWord.length; i += 1) {
        if (secretWord[i] == letter) {
          hideWord = hideWord.substring (0, i) + letter + hideWord.substring (i + 1);
        }
      }
      word.textContent = hideWord;
    } else {
      failsCount += 1;
      console.log(failsCount,'fails');
      failsCounter(failsCount);
    } 
  };

  function failsCounter(f) {
    fails.textContent = `Incorrect answers: ${f} / 6`
  }
  function toogleKey (letter) {
    for (let i = 0; i < keys.length; i += 1) {
      
    if (keys[i].textContent.toLowerCase() == letter) {
          // console.log(keys[i], letter);
          if (keys[i].classList.contains("chosen")) {
            return;
          }
          toogleLetter(letter);
          keys[i].classList.add("chosen");
          break;
        }
    }
  }

  defBase();
  failsCounter(0);
});