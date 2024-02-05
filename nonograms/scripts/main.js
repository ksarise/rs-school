import { generateElement } from "./generateElement.js";
import data from "../base.json" assert { type: "json" };
import {openModal, modalText, modalTime, modalButton, isOpen, closeModal} from './modal.js';
const body = document.body;
const wrap = generateElement("div", "page-wrap", body, "wrap");
const header = generateElement("header", "header", wrap, "header");
const resetButton = generateElement("button", "reset-button", header, "Reset");
const resumeButton = generateElement("button", "resume-button", header, "Resume Game");
const saveButton = generateElement("button", "save-button", header, "Save Game");
const solutionButton = generateElement("button", "solution-button", header, "Solution");
const winnersButton = generateElement("button", "winners-button", header, "Winners");
const themeContainer = generateElement("div", "theme-container", header, "theme");
const themeInput = generateElement("input", "theme-input", themeContainer, "",'theme-mode', "checkbox");
const themeLabel = generateElement("label", "theme-label", themeContainer, "", false, false, 'theme-mode');
const main = generateElement("main", "main", wrap, "main");
const mainContainer = generateElement("section","main-container", main);
const picturesPanel = generateElement("div", "pictures-panel", mainContainer);
const stopWatchContainer = generateElement("div", "stop-watch-container", mainContainer);
const stopWatch = generateElement("div", "stop-watch", stopWatchContainer, "00:00");
const matrixContainer = generateElement("section","matrix-container", main);
const matrix = generateElement("div", "matrix", matrixContainer);
const horHintsPanel = generateElement("div", "horHintsPanel", matrixContainer);
const vertHintsPanel = generateElement("div", "vertHintsPanel", matrixContainer);

//sound effects and music
const sound0 =  new Audio("../assets/sounds/nani.mp3");
const sound1 =  new Audio("../assets/sounds/flute-alto.mp3");
const sound2 =  new Audio("../assets/sounds/gong-hit.mp3");
const sound3 =  new Audio("../assets/sounds/noti-3.mp3");
const sound4 =  new Audio("../assets/sounds/swing-bells.mp3");
const sound5 =  new Audio("../assets/sounds/temple-kyoto.mp3");
const sound6 =  new Audio("../assets/sounds/tower.mp3");
//switch theme mode
themeContainer.addEventListener("click", () => {
  if (themeInput.checked) {
    wrap.classList.add("dark-theme");
  } else {
    wrap.classList.remove("dark-theme");
  }
})

//example matrix
const picture2 = [[1,0,0,1,1], [1,0,1,0,1], [0,1,1,0,0], [0,1,1,1,1], [0,1,1,0,1]];
let u = 0;
let checkArray;
let crossArray;
let winList;
// console.log('import', data[u].id);

function dataToPicture(y) {
  // console.log('datatopicture', y, data[y].matrix);
  // const id2 =  data[y].id;
  const picture =  data[y].matrix;
  // console.log('picture',picture, 'id');
  return picture;
}
//create panel for game choose
function createPicturePanel () {
  for (let i = 0; i < data.length; i += 1) {
    const pictureBlock = generateElement("div", "picture-block", picturesPanel,data[i].name);
    const pictureImg = generateElement("img", "picture-img", pictureBlock );
    pictureImg.src = data[i].img;
    pictureImg.addEventListener('click', () => startGame(i));
  }
}

createPicturePanel();

//create stop-watch timer 
let seconds = 0;
function formatTime (sec) {
  const minutes = Math.floor(sec / 60); 
  stopWatch.textContent = `${minutes.toString().padStart(2, "0")}:${(sec % 60).toString().padStart(2, "0")}`;
}
function swTimer () {
  seconds += 1;
  formatTime(seconds);
  // console.log('seconds', seconds);
}

let swInterval;
let isSWTimerStarted = false;
function startSWTimer () {
  if (!isSWTimerStarted) {
    isSWTimerStarted = true;
    swInterval= setInterval(swTimer, 1000);
  }
}


//create cells
function createCells(y){
  let picture = dataToPicture(y);
  // console.log('prepic cells',y, picture[0][0])
  let count = 0;
  const len = picture.reduce((count, row) => count + row.length, 0);
  checkArray = Array.from({ length: len }, (item) => 0);
  crossArray = Array.from({ length: len }, (item) => 0);
  for (let i = 0; i < picture.length; i += 1) {
    const row = generateElement("div", "row", matrix);
    for (let j = 0; j < picture[i].length; j += 1) {
      const cell = generateElement("div", "gram", row, picture[i][j].toString(), count.toString());
      count += 1;
      cell.addEventListener('click', () => {
        checkCell(cell, checkArray, picture, Number(cell.id));
        console.log("black", Number(cell.id), checkArray);
        
        startSWTimer();
        console.log(isSWTimerStarted, 'seconds',seconds);
      })
      cell.addEventListener("contextmenu", () => {
        setCross(cell, crossArray, Number(cell.id));
        console.log('cross', Number(cell.id), crossArray);
        
        
      });
    }
  }
}

//set up a cross 

function setCross (cell, arr0, id) {
  console.log('crossid',id);
  event.preventDefault();
  startSWTimer();
  if (!cell.classList.contains('black') && !cell.classList.contains('cross')) {
    arr0[id] = 1;
    cell.classList.add('cross');
    sound4.play();
  } else if (cell.classList.contains('cross')) {
    cell.classList.remove('cross');
    arr0[id] = 0;
  } else {
    cell.classList.remove('black');
    cell.classList.add('cross');
    arr0[id] = 1;
    sound4.play();
  }
  // console.log(arr0);
}


//check identity to picture
function checkCell (cell, arr1, arr2, id) {
  if (!cell.classList.contains('black') && !cell.classList.contains('cross')) {
    arr1[id] = 1;
    cell.classList.add('black');
    sound5.play();
    checkWin(arr2, arr1);
  } else if (cell.classList.contains('cross')) {
    cell.classList.remove('cross');
  } else {
    arr1[id] = 0;
    cell.classList.remove('black');
    sound0.play();
  }
  console.log('check', arr1);
}


//check condition for win
function checkWin(arr1, arr2) {
  let equal = (arr1.flat().every((value, index) => value == arr2[index]));
  if (equal) {
    clearInterval(swInterval);
    openModal();
    saveWin ();
    modalText.textContent = "WIN";
    modalTime.textContent = `Great! You have solved the nonogram in ${seconds} seconds!`;
    sound3.play();
  } else {
    

  }
  console.log('matrix', equal, arr1.flat());
}


//save win game to results
function saveWin () {
  console.log('param', data[u].name, seconds, winList);
  const isWinList = localStorage.getItem("ksariseWinList");
  console.log(isWinList, typeof isWinList);
  if (isWinList) {
    const newWinList = JSON.parse(isWinList);
    newWinList.push({pic: data[u].name, time: seconds});
    console.log('parse push', newWinList);
    newWinList.slice(-5);
    newWinList.sort((a, b) => a.time - b.time);
    localStorage.setItem("ksariseWinList", JSON.stringify(newWinList));
  } else {
    winList = [{pic: data[u].name, time: seconds},];
    localStorage.setItem("ksariseWinList", JSON.stringify(winList));
  }
}


//high-score list
winnersButton.addEventListener('click', winnersList);
function winnersList () {
  const stringSavedWinList = localStorage.getItem("ksariseWinList");
  const savedWinList = JSON.parse(stringSavedWinList);
  console.log(savedWinList);
  const highscore = generateElement("div", "hs", header);
  savedWinList.forEach((list, index) => {
    const highscoreItem = generateElement("div", "hsItem", highscore, list.pic+list.time);
    console.log(highscoreItem, list.pic);
  })
  console.log(JSON.parse(stringSavedWinList),  typeof savedWinList);
}


//create clues
function createClues (y) {
  let picture = dataToPicture(y);
  console.log('prepic clues', y, picture[0][0])
  //compute values for vertical clues
  const vertHints = [];
  for (let i = 0; i < picture.length; i += 1) {
    const temp = []
    let accI = 0;
    for (let j = 0; j < picture[i].length; j += 1) {
        if (picture[i][j] === 1) {
            accI += 1;
        } else if ( accI >0) {
            temp.push(accI);
            accI = 0;
        }     
    }
    if (accI > 0 ) {
      temp.push(accI);
    }
    vertHints.push(temp);
  }

  //compute values for horizontal clues
  const horHints = [];
  for (let j = 0; j < picture.length; j += 1) {
    const temp = []
    let accJ = 0;
    for (let i = 0; i < picture[j].length; i += 1) {
        if (picture[i][j] === 1) {
            accJ += 1;
        } else if ( accJ >0) {
            temp.push(accJ);
            accJ = 0;
        }     
    }
    if (accJ > 0 ) {
      temp.push(accJ);
    }
    horHints.push(temp);
  }

  //create horizontal clues
  

  for (let i = 0; i < picture.length; i += 1){
    const hHintRow = generateElement("div", "hHintRow", horHintsPanel);
    horHints[i].forEach((element) => {
      const hHint = generateElement("div", "hHint", hHintRow, element.toString());
    })
  }

  //create vertical clues
  
  for (let i = 0; i < picture.length; i += 1){
    const vHintRow = generateElement("div", "vHintRow", vertHintsPanel);
    vertHints[i].forEach((element) => {
      const vHint = generateElement("div", "vHint", vHintRow, element.toString());
    })
  }
}


//game state controls

function startGame(a) {
  clearInterval(swInterval);
  stopWatch.textContent = "00:00";
  isSWTimerStarted = false;
  closeModal();
  cleanCells();
  cleanMatrix();
  console.log('start',a);
  dataToPicture(a);
  createCells(a);
  createClues(a);
  u = a;
}

startGame(u);


//reset button
resetButton.addEventListener('click', () => {
  console.log('c',checkArray);
  console.log('x',crossArray);
  checkArray = [];
  crossArray = [];
  clearInterval(swInterval);
  seconds = 0;
  stopWatch.textContent = "00:00";
  isSWTimerStarted = false;
  const grams = document.querySelectorAll(".gram");
  sound2.play();
  grams.forEach((gram) => {
    gram.classList.remove("black");
    gram.classList.remove("cross");
  });
});


//save button 
saveButton.addEventListener('click', () => {
  localStorage.setItem("ksarisePictureId", u);
  localStorage.setItem("ksariseTime", seconds);
  localStorage.setItem("ksariseCheckArray", checkArray);
  localStorage.setItem("ksariseCrossArray", crossArray);
});


//resume button
resumeButton.addEventListener('click', () => {
  startGame(localStorage.getItem("ksarisePictureId"));
  checkArray = Array.from(localStorage.getItem("ksariseCheckArray").split(',').map(Number));
  crossArray = Array.from(localStorage.getItem("ksariseCrossArray").split(',').map(Number));
  seconds = Number(localStorage.getItem("ksariseTime"));
  formatTime(seconds);
  isSWTimerStarted = false;
  const grams = document.querySelectorAll(".gram");
  console.log('blackpic', checkArray);
  console.log('crosspic', crossArray);
  grams.forEach((gram) => {
    checkArray.forEach((value, index) => {
      if (value == 1 && Number(gram.id) === index) {
        gram.classList.add("black");
      }
    });
    crossArray.forEach((value, index) => {
      if (value == 1 && Number(gram.id) === index) {
        gram.classList.add("cross");
      }
    });
  });
})

//solution button 
solutionButton.addEventListener('click', () => addSolution(u));
function addSolution (currIndex)  {
  console.log('curr', currIndex);
  clearInterval(swInterval);
  let picture = dataToPicture(currIndex);
  const grams = document.querySelectorAll(".gram");
  sound1.play();
  grams.forEach((gram) => {
    gram.classList.remove("black");
    picture.flat().forEach((value, index) => {
      if (value === 1 && Number(gram.id) === index) {
        gram.classList.add("black");
      }
    });
    gram.style.pointerEvents = "none";
  });
  
}

//modal close
modalButton.addEventListener('click', () => startGame(u));


//clean matrix
function cleanMatrix () {
  matrix.replaceChildren();
  vertHintsPanel.replaceChildren();
  horHintsPanel.replaceChildren();
}
//clean filled cells
function cleanCells () {
  const cells = document.querySelectorAll(".black");
  cells.forEach((cell) => {
    cell.classList.remove("black");
  });
}
