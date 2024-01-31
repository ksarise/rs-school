import { generateElement } from "./generateElement.js";
const body = document.body;
const wrap = generateElement("div", "page-wrap", body, "wrap");
const header = generateElement("header", "header", wrap, "header");
const main = generateElement("main", "main", wrap, "main");
const mainContainer = generateElement("section","main-container", main, );
const matrix = generateElement("div", "matrix", mainContainer);

//example matrix
const matrix2 = [[1,0,0,1,1], [1,0,1,0,1], [0,1,1,0,0], [0,1,1,1,1], [0,1,1,0,1]];

//create cells
for (let i = 0; i < matrix2.length; i += 1) {
  const row = generateElement("div", "row", matrix);
  for (let j = 0; j < matrix2[i].length; j += 1) {
    const cell = generateElement("div", "gram", row, matrix2[i][j].toString());
    cell.addEventListener('click', () => {
      cell.classList.toggle('black');
    })
  }
}

//compute values for vertical clues
const vertHints = [];
for (let i = 0; i < matrix2.length; i += 1) {
  const temp = []
  let accI = 0;
  for (let j = 0; j < matrix2[i].length; j += 1) {
      if (matrix2[i][j] === 1) {
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
for (let j = 0; j < matrix2.length; j += 1) {
  const temp = []
  let accJ = 0;
  for (let i = 0; i < matrix2[j].length; i += 1) {
      if (matrix2[i][j] === 1) {
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
const horHintsPanel = generateElement("div", "horHintsPanel", mainContainer);

for (let i = 0; i < matrix2.length; i += 1){
  const hHintRow = generateElement("div", "hHintRow", horHintsPanel);
  horHints[i].forEach((element) => {
    const hHint = generateElement("div", "hHint", hHintRow, element.toString());
    console.log(element)
  })
}

//create vertical clues
const vertHintsPanel = generateElement("div", "vertHintsPanel", mainContainer);
for (let i = 0; i < matrix2.length; i += 1){
  const vHintRow = generateElement("div", "vHintRow", vertHintsPanel);
  vertHints[i].forEach((element) => {
    const vHint = generateElement("div", "vHint", vHintRow, element.toString());
    console.log(element)
  })
}