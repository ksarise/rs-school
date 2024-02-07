import { generateElement } from "./generateElement.js";
import data from "../base.json" assert { type: "json" };
import {openModal, modalText, modalTime, modalButton, modalContent, closeModal} from './modal.js';

const BODY = document.body;
const wrap = generateElement("div", "page-wrap", BODY);
const header = generateElement("header", "header", wrap);
const GITLINK = generateElement("a", "git-link", header);
const GITLOGO = generateElement("img", "github-mark", GITLINK);
GITLOGO.src = "assets/icons/github-mark.svg"
const HEADING = generateElement("h1", "title", header, "NONOGRAMS");
const themeContainer = generateElement("div", "theme-container", header);
const themeInput = generateElement("input", "theme-input", themeContainer, "",'theme-mode', "checkbox");
const themeLabel = generateElement("label", "theme-label", themeContainer, "", false, false, 'theme-mode');
const THEME_LIGHT = generateElement("img", "theme-light", themeLabel);
THEME_LIGHT.src = "assets/icons/power.svg";
const THEME_DARK = generateElement("img", "theme-dark", themeLabel);
THEME_DARK.src = "assets/icons/moon.svg";
const main = generateElement("main", "main", wrap);
const levelPanel = generateElement("div", "level-panel", main);
const levelPanelImg = generateElement("img", "level-panel-img", levelPanel);
levelPanelImg.src = "assets/icons/matrix.svg";
const winnersButton = generateElement("div", "winners-button", main);
const winnersButtonImg = generateElement("img", "winners-button-img", winnersButton);
winnersButtonImg.src = "assets/icons/podium.svg";
const mainContainer = generateElement("section","main-container", main);
const picturesPanel = generateElement("div", "pictures-panel", mainContainer);
picturesPanel.classList.add("hide");
const SETTINGS_CONTAINER = generateElement("section", "settings-container", main);
const GAME_CONTAINER = generateElement("section", "game-container", main);
const MATRIX_NAME = generateElement("p", "matrix-name", GAME_CONTAINER);
const stopWatchContainer = generateElement("div", "stop-watch-container", GAME_CONTAINER);
const stopWatch = generateElement("div", "stop-watch", stopWatchContainer, "00:00");
const matrixContainer = generateElement("section","matrix-container", main);
const MUTE_BUTTON = generateElement("div", "mute-button", SETTINGS_CONTAINER, "mute");
const resetButton = generateElement("div", "reset-button", SETTINGS_CONTAINER, "Reset");
const randomButton = generateElement("div", "random-button", SETTINGS_CONTAINER, "Random");
const resumeButton = generateElement("div", "resume-button", SETTINGS_CONTAINER, "Resume");
const saveButton = generateElement("div", "save-button", SETTINGS_CONTAINER, "Save");
const solutionButton = generateElement("div", "solution-button", SETTINGS_CONTAINER, "Solution");

const matrix = generateElement("div", "matrix", matrixContainer);
const horHintsPanel = generateElement("div", "horHintsPanel", matrixContainer);
const vertHintsPanel = generateElement("div", "vertHintsPanel", matrixContainer);

//sound effects and music
const SOUNDS = [
  new Audio("assets/sounds/nani.mp3"),
  new Audio("assets/sounds/flute-alto.mp3"),
  new Audio("assets/sounds/gong-hit.mp3"),
  new Audio("assets/sounds/noti-3.mp3"),
  new Audio("assets/sounds/swing-bells.mp3"),
  new Audio("assets/sounds/temple-kyoto.mp3"),
  new Audio("assets/sounds/click.mp3"),
  new Audio("assets/sounds/shuffle.mp3")
];

let isMuted = false;
//mute all audio
MUTE_BUTTON.addEventListener('click', () => {
  SOUNDS[6].playbackRate = 1.5;
  SOUNDS[6].play();
  if (!isMuted) {
    isMuted = true;
    SOUNDS.forEach((sound) => sound.muted = true)
    MUTE_BUTTON.classList.add("muted");
  } else {
    isMuted = false;
    SOUNDS.forEach((sound) => sound.muted = false)
    MUTE_BUTTON.classList.remove("muted");
  }
})


//switch theme mode
BODY.classList.add("light");
themeInput.checked = false;
themeContainer.addEventListener("click", () => {
  SOUNDS[6].playbackRate = 1.5;
  SOUNDS[6].play();
  if (themeInput.checked) {
    BODY.classList.remove("light");
    BODY.classList.add("dark");
  } else {
    BODY.classList.remove("dark");
    BODY.classList.add("light");
  }
})

//example matrix
const picture2 = [[1,0,0,1,1], [1,0,1,0,1], [0,1,1,0,0], [0,1,1,1,1], [0,1,1,0,1]];
let currentPictureIndex = 0;
let checkArray;
let crossArray;
let winList;
let isWin = false;
let isSaved = false;;
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
    pictureLevelPanel.classList.add("hide-panel");
    pictureLevelPanel.classList.add("hide-level");
    const pictureLevelId = generateElement("div", "picture-level-id", pictureLevelPanel, (l * 5).toString(),l.toString());
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].level === l) {
        const pictureBlock = generateElement("div", "picture-block", pictureLevelPanel);
        pictureBlock.classList.add(`block${l.toString()}`);
        pictureBlock.classList.add("hide-block");
        const pictureName = generateElement("div", "picture-name", pictureBlock, data[i].name);
        const pictureImg = generateElement("img", "picture-img", pictureBlock,"", l.toString());
        pictureImg.src = data[i].img;
        pictureImg.addEventListener('click', (e) => {
          SOUNDS[6].playbackRate = 1.5;
          SOUNDS[6].play();
          startGame(i);
          togglePanel();
          console.log(e.target);
          togglePanelContent(e.target);
        });
      }
    }
  }
  const pictureLevelIds = document.querySelectorAll(".picture-level-id");
  console.log(pictureLevelIds);
  pictureLevelIds.forEach((element) =>
    element.addEventListener('click', () => togglePanelContent(element)));
  function togglePanelContent(element) {
    SOUNDS[6].playbackRate = 1.5;
    SOUNDS[6].play();
    const levelPanels = document.querySelectorAll(".picture-level-panel");
    levelPanels[Number(element.id)-1].classList.toggle("hide-panel");
    const pictureBlocks = document.querySelectorAll(`.block${element.id}`);
    console.log(pictureBlocks);
    pictureBlocks.forEach((block) => block.classList.toggle("hide-block"));
    }
  //panel open button
  levelPanel.addEventListener('click', togglePanel);

  function togglePanel() {
    SOUNDS[6].playbackRate = 1.5;
    SOUNDS[6].play();
    picturesPanel.classList.toggle("hide");
    const levelPanels = document.querySelectorAll(".picture-level-panel");
    levelPanels.forEach((panel) => panel.classList.toggle("hide-level"));
    levelPanel.classList.toggle("open");
    
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
    SOUNDS[4].playbackRate = 6;
    SOUNDS[4].play();
  } else if (cell.classList.contains('cross')) {
    cell.classList.remove('cross');
    SOUNDS[0].playbackRate = 3;
    SOUNDS[0].play();
    crossArr[id] = 0;
  } else {
    cell.classList.remove('black');
    cell.classList.add('cross');
    crossArr[id] = 1;
    SOUNDS[4].playbackRate = 6;
    SOUNDS[4].play();
  }
  // console.log(arr0);
}


//check identity to picture
function checkCell (cell, checkArr, initArr, id) {
  if (!cell.classList.contains('black') && !cell.classList.contains('cross')) {
    checkArr[id] = 1;
    cell.classList.add('black');
    SOUNDS[5].playbackRate = 7;
    SOUNDS[5].play();
    checkWin(initArr, checkArr);
  } else if (cell.classList.contains('cross')) {
    cell.classList.remove('cross');
  } else {
    checkArr[id] = 0;
    cell.classList.remove('black');
    SOUNDS[0].playbackRate = 3;
    SOUNDS[0].play();
  }
  console.log('check', checkArr);
}


//check condition for win
function checkWin(initArr, checkArr) {
  let equal = (initArr.flat().every((value, index) => value == checkArr[index]));
  if (equal) {
    isWin = true;
    const grams = document.querySelectorAll(".gram");
    grams.forEach((gram) => {
      gram.style.pointerEvents = "none";
    });
    clearInterval(swInterval);
    openModal();
    saveWin ();
    
    modalText.textContent = "WIN";
    modalTime.textContent = `Great! You have solved the nonogram in ${seconds} seconds!`;
    SOUNDS[3].play();
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
    newWinList.push({pic: data[currentPictureIndex].name, level: data[currentPictureIndex].level, time: seconds});
    console.log('parse push', newWinList);
    const slicedWinList = newWinList.slice(-5);
    const newSortedWinList = slicedWinList.sort((a, b) => a.time - b.time);
    localStorage.setItem("ksariseWinList", JSON.stringify(newSortedWinList));
  } else {
    winList = [{pic: data[currentPictureIndex].name, level: data[currentPictureIndex].level, time: seconds},];
    localStorage.setItem("ksariseWinList", JSON.stringify(winList));
  }
}


//high-score list
winnersButton.addEventListener('click', winnersList);
function winnersList () {
  SOUNDS[5].playbackRate = 7;
  SOUNDS[5].play();
  const stringSavedWinList = localStorage.getItem("ksariseWinList");
  const savedWinList = JSON.parse(stringSavedWinList);
  console.log(savedWinList);
  openModal();
  const highscore = generateElement("div", "highscore", modalContent,"Last 5 Wins:");
  if(stringSavedWinList) {
    savedWinList.forEach((list, index) => {
      const highscoreItem = generateElement("div", "highscore-item", highscore);
      const highscoreId = generateElement("div", "highscore-id", highscoreItem , index.toString())
      const highscoreLevel = generateElement("div", "highscore-level", highscoreItem , `level ${(list.level).toString()}`);
      const highscoreItemName = generateElement("div", "highscore-name", highscoreItem , list.pic);
      const highscoreTime = generateElement("div", "highscore-time", highscoreItem , `${(list.time).toString()}sec`);
    });
  }
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
      if (data[picId].level === 2) {
        hHint.classList.add("medium");
      } else if (data[picId].level === 3) {
        hHint.classList.add("small");
      }
    })
  }

  //create vertical clues
  
  for (let i = 0; i < picture.length; i += 1){
    const vHintRow = generateElement("div", "vHintRow", vertHintsPanel);
    vertHints[i].forEach((element) => {
      const vHint = generateElement("div", "vHint", vHintRow, element.toString());
      if (data[picId].level === 2) {
        vHint.classList.add("medium");
      } else if (data[picId].level === 3) {
        vHint.classList.add("small");
      }
    })
  }
}


//game state controls

function startGame(picId) {
  clearInterval(swInterval);
  stopWatch.textContent = "00:00";
  isSWTimerStarted = false;
  isWin = false;
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
  SOUNDS[2].play();
  grams.forEach((gram) => {
    gram.classList.remove("black");
    gram.classList.remove("cross");
  });
});


//random button 
randomButton.addEventListener('click', () => {
  SOUNDS[7].play();
  let indexRandom = Math.floor(Math.random() * data.length);
  startGame(indexRandom);

});


//save button 
saveButton.addEventListener('click', () => {
  SOUNDS[6].playbackRate = 1.5;
  SOUNDS[6].play();
  isSaved = true;
  localStorage.setItem("ksarisePictureId", currentPictureIndex);
  localStorage.setItem("ksariseTime", seconds);
  localStorage.setItem("ksariseCheckArray", checkArray);
  localStorage.setItem("ksariseCrossArray", crossArray);
});


//resume button
resumeButton.addEventListener('click', () => {
  SOUNDS[6].playbackRate = 1.5;
  SOUNDS[6].play();
  if (localStorage.getItem("ksarisePictureId")) {
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
  }
})

//solution button 
solutionButton.addEventListener('click', () => addSolution(currentPictureIndex));
function addSolution (currIndex)  {
  console.log('curr', currIndex);
  clearInterval(swInterval);
  let picture = dataToPicture(currIndex);
  const grams = document.querySelectorAll(".gram");
  SOUNDS[1].play();
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

modalButton.addEventListener('click', () => {
  SOUNDS[6].playbackRate = 1.5;
  SOUNDS[6].play();
  if (isWin) {
    startGame(currentPictureIndex);
  } else {
    closeModal();
  }
});



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
