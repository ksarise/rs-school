import { generateElement } from "./generateElement.js";
import data from "../base.json" assert { type: "json" };
import {openModal, modalText, modalTime, modalButton, modalContent, closeModal} from './modal.js';
const body = document.body;

// const highscoreItem = generateElement("div", "highscore-item", highscore);
// const highscoreId = generateElement("div", "highscore-id", highscoreItem );
// const highscoreItemName = generateElement("div", "highscore-name", highscoreItem);
// const highscoreTime = generateElement("div", "highscore-time", highscoreItem);
const wrap = generateElement("div", "page-wrap", body);
const header = generateElement("header", "header", wrap);
const GITLINK = generateElement("a", "git-link", header);
const GITLOGO = generateElement("img", "github-mark", GITLINK);
GITLOGO.src = "./assets/icons/github-mark.svg"
const HEADING = generateElement("h1", "title", header, "NONOGRAMS");
const themeContainer = generateElement("div", "theme-container", header);
const themeInput = generateElement("input", "theme-input", themeContainer, "",'theme-mode', "checkbox");
const themeLabel = generateElement("label", "theme-label", themeContainer, "", false, false, 'theme-mode');
const main = generateElement("main", "main", wrap);
const mainContainer = generateElement("section","main-container", main);
const picturesPanel = generateElement("div", "pictures-panel", mainContainer);
const SETTINGS_CONTAINER = generateElement("section", "settings-container", main);
const GAME_CONTAINER = generateElement("section", "game-container", main);
const MATRIX_NAME = generateElement("p", "matrix-name", GAME_CONTAINER);
const stopWatchContainer = generateElement("div", "stop-watch-container", GAME_CONTAINER);
const stopWatch = generateElement("div", "stop-watch", stopWatchContainer, "00:00");
const matrixContainer = generateElement("section","matrix-container", main);
const resetButton = generateElement("div", "reset-button", SETTINGS_CONTAINER, "Reset");
const randomButton = generateElement("div", "random-button", SETTINGS_CONTAINER, "Random");
const resumeButton = generateElement("div", "resume-button", SETTINGS_CONTAINER, "Resume Game");
const saveButton = generateElement("div", "save-button", SETTINGS_CONTAINER, "Save Game");
const solutionButton = generateElement("div", "solution-button", SETTINGS_CONTAINER, "Solution");
const winnersButton = generateElement("div", "winners-button", SETTINGS_CONTAINER, "Winners");
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
    body.classList.toggle("dark");
  }
})

//example matrix
const picture2 = [[1,0,0,1,1], [1,0,1,0,1], [0,1,1,0,0], [0,1,1,1,1], [0,1,1,0,1]];
let currentPictureIndex = 0;
let checkArray;
let crossArray;
let winList;
// console.log('import', data[currentPictureIndex].id);

function dataToPicture(picId) {
  // console.log('datatopicture', y, data[y].matrix);
  // const id2 =  data[y].id;
  const picture =  data[picId].matrix;
  // console.log('picture',picture, 'id');
  return picture;
}
//create panel for game choose
function createPicturePanel () {
  for (let l = 1; l <= 3; l += 1) {
    const pictureLevelPanel = generateElement("div", "picture-level-panel", picturesPanel);
    const pictureLevelId = generateElement("div", "picture-level-id", pictureLevelPanel, `level ${l.toString()}`);
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].level === l) {
        const pictureBlock = generateElement("div", "picture-block", pictureLevelPanel);
        const pictureName = generateElement("div", "picture-name", pictureBlock, data[i].name);
        const pictureImg = generateElement("img", "picture-img", pictureBlock );
        pictureImg.src = data[i].img;
        pictureImg.addEventListener('click', () => startGame(i));
      }
    }
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
function createCells(picId){
  MATRIX_NAME.textContent = data[picId].name;
  let picture = dataToPicture(picId);
  // console.log('prepic cells',y, picture[0][0])
  let count = 0;
  const len = picture.reduce((count, row) => count + row.length, 0);
  checkArray = Array.from({ length: len }, (item) => 0);
  crossArray = Array.from({ length: len }, (item) => 0);
  for (let i = 0; i < picture.length; i += 1) {
    const row = generateElement("div", "row", matrix);
    for (let j = 0; j < picture[i].length; j += 1) {
      const cell = generateElement("div", "gram", row, null, count.toString());
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

function setCross (cell, crossArr, id) {
  console.log('crossid',id);
  event.preventDefault();
  startSWTimer();
  if (!cell.classList.contains('black') && !cell.classList.contains('cross')) {
    crossArr[id] = 1;
    cell.classList.add('cross');
    sound4.play();
  } else if (cell.classList.contains('cross')) {
    cell.classList.remove('cross');
    crossArr[id] = 0;
  } else {
    cell.classList.remove('black');
    cell.classList.add('cross');
    crossArr[id] = 1;
    sound4.play();
  }
  // console.log(arr0);
}


//check identity to picture
function checkCell (cell, checkArr, initArr, id) {
  if (!cell.classList.contains('black') && !cell.classList.contains('cross')) {
    checkArr[id] = 1;
    cell.classList.add('black');
    sound5.play();
    checkWin(initArr, checkArr);
  } else if (cell.classList.contains('cross')) {
    cell.classList.remove('cross');
  } else {
    checkArr[id] = 0;
    cell.classList.remove('black');
    sound0.play();
  }
  console.log('check', checkArr);
}


//check condition for win
function checkWin(initArr, checkArr) {
  let equal = (initArr.flat().every((value, index) => value == checkArr[index]));
  if (equal) {
    clearInterval(swInterval);
    openModal();
    saveWin ();
    modalText.textContent = "WIN";
    modalTime.textContent = `Great! You have solved the nonogram in ${seconds} seconds!`;
    sound3.play();
  } else {
    

  }
  console.log('matrix', equal, initArr.flat());
}


//save win game to results
function saveWin () {
  console.log('param', data[currentPictureIndex].name, seconds, winList);
  const isWinList = localStorage.getItem("ksariseWinList");
  console.log(isWinList, typeof isWinList);
  if (isWinList) {
    const newWinList = JSON.parse(isWinList);
    newWinList.push({pic: data[currentPictureIndex].name, time: seconds});
    console.log('parse push', newWinList);
    const slicedWinList = newWinList.slice(-5);
    const newSortedWinList = slicedWinList.sort((a, b) => a.time - b.time);
    localStorage.setItem("ksariseWinList", JSON.stringify(newSortedWinList));
  } else {
    winList = [{pic: data[currentPictureIndex].name, time: seconds},];
    localStorage.setItem("ksariseWinList", JSON.stringify(winList));
  }
}


//high-score list
winnersButton.addEventListener('click', winnersList);
function winnersList () {
  const stringSavedWinList = localStorage.getItem("ksariseWinList");
  const savedWinList = JSON.parse(stringSavedWinList);
  console.log(savedWinList);
  openModal();
  const highscore = generateElement("div", "highscore", modalContent);
  savedWinList.forEach((list, index) => {
    const highscoreItem = generateElement("div", "highscore-item", highscore);
    const highscoreId = generateElement("div", "highscore-id", highscoreItem , index.toString())
    const highscoreItemName = generateElement("div", "highscore-name", highscoreItem , list.pic);
    const highscoreTime = generateElement("div", "highscore-time", highscoreItem , (list.time).toString());
    
  })
  console.log(JSON.parse(stringSavedWinList),  typeof savedWinList);
}


//create clues
function createClues (picId) {
  let picture = dataToPicture(picId);
  console.log('prepic clues', picId, picture[0][0])
  //compute values for vertical clues
  const vertHints = [];
  for (let i = 0; i < picture.length; i += 1) {
    const temp = []
    let accI = 0;
    for (let j = 0; j < picture[i].length; j += 1) {
        if (picture[j][i] === 1) {
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
        if (picture[j][i] === 1) {
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

function startGame(picId) {
  clearInterval(swInterval);
  stopWatch.textContent = "00:00";
  isSWTimerStarted = false;
  closeModal();
  cleanCells();
  cleanMatrix();
  console.log('start',picId);
  dataToPicture(picId);
  createCells(picId);
  createClues(picId);
  currentPictureIndex = picId;
}

startGame(currentPictureIndex);


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


//random button 
randomButton.addEventListener('click', () => {
  let indexRandom = Math.floor(Math.random() * data.length);
  startGame(indexRandom);

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
solutionButton.addEventListener('click', () => addSolution(currentPictureIndex));
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
modalButton.addEventListener('click', () => startGame(currentPictureIndex));


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
