import { generateElement } from "./generateElement.js";
const body = document.body;
const wrap = generateElement("div", "page-wrap", body, "wrap");
const header = generateElement("header", "header", wrap, "header");
const restartButton = generateElement("button", "restart", header, "restart");
const themeContainer = generateElement("div", "theme-container", header, "theme");
const themeInput = generateElement("input", "theme-input", themeContainer, "",'theme-mode', "checkbox");
const themeLabel = generateElement("label", "theme-label", themeContainer, "", false, false, 'theme-mode');
const main = generateElement("main", "main", wrap, "main");
const mainContainer = generateElement("section","main-container", main, );
const matrix = generateElement("div", "matrix", mainContainer);
const horHintsPanel = generateElement("div", "horHintsPanel", mainContainer);
const vertHintsPanel = generateElement("div", "vertHintsPanel", mainContainer);

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

//fetch matrix from json
async function picBase() {
  try {
    const response = await fetch("./base.json");
    const data = await response.json();
    let indexRandom = Math.floor(Math.random() * data.length);
    console.log(data.length, indexRandom);
    // console.log(indexRandom, data[indexRandom].matrix);
    let picture =  data[indexRandom].matrix;
    return picture;
  } 
  catch (error) {
    console.log('Fetch error: ', error);
  }
};

(async () => {
  let picture = await picBase();


//create cells
function createCells(){
  let count = 0;
  const len = picture.reduce((count, row) => count + row.length, 0);
  let checkArray = Array.from({ length: len }, (item) => 0);
  for (let i = 0; i < picture.length; i += 1) {
    const row = generateElement("div", "row", matrix);
    for (let j = 0; j < picture[i].length; j += 1) {
      const cell = generateElement("div", "gram", row, picture[i][j].toString(), count);
      count += 1;
      cell.addEventListener('click', () => {
        checkCell(cell, checkArray, picture, Number(cell.id));
        // checkWin(picture, checkArray);
      })
    }
  }
}

//check identity to picture
function checkCell (cell, arr1, arr2, id) {
  if (!cell.classList.contains('black')) {
    arr1[id] = 1;
    cell.classList.add('black');
    checkWin(arr2, arr1);
  } else {
    arr1[id] = 0;
    cell.classList.remove('black');
  }
  console.log('check', arr1);
}

//check condition for win
function checkWin(arr1, arr2) {
  let equal = (arr1.flat().every((value, index) => value == arr2[index]));
  if (equal) {
    console.log("win!");
  } else {
    console.log('more');
  }
  console.log('matrix', equal, arr1.flat());
}

 function createClues () {
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
function startGame() {
  cleanCells();
  cleanMatrix();
  picBase();
  createCells();
  createClues();
}

startGame();

restartButton.addEventListener('click', () => {
  startGame();
});

function cleanMatrix () {
  matrix.replaceChildren();
  vertHintsPanel.replaceChildren();
  horHintsPanel.replaceChildren();
}

function cleanCells () {
  const cells = document.querySelectorAll(".black");
  cells.forEach((cell) => {
    cell.classList.remove("black");
  });
}
})();