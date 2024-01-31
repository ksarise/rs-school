import { generateElement } from "./generateElement.js";
const body = document.body;
const wrap = generateElement("div", "page-wrap", body, "wrap");
const header = generateElement("header", "header", wrap, "header");
const main = generateElement("main", "main", wrap, "main");
const mainContainer = generateElement("section","main-container", main, "main-container");
const matrix = generateElement("div", "matrix", mainContainer);

for (let i = 0; i < 5; i += 1) {
  const row = generateElement("div", "row", matrix);
  for (let j = 0; j < 5; j += 1) {
    const cell = generateElement("div", "gram", row, "#");
    cell.addEventListener('click', () => {
      cell.classList.toggle('black');
    })
  }
}
const matrix2 = [[1,0,0], [1,0,1], [0,1,1]];
//hor must be 1112
//vert must be 212

const horHints = [];
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
  horHints.push(temp);
}

const vertHints = [];
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
  vertHints.push(temp);
}
const horHintsPanel = generateElement("div", "horHintsPanel", mainContainer);
const vertHintsPanel = generateElement("div", "vertHintsPanel", mainContainer);
for (let i = 0; i < matrix2.length; i += 1){
    const hHint = generateElement("div", "hHint", horHintsPanel, horHints[i].toString());
}
for (let i = 0; i < matrix2.length; i += 1){
  const vHint = generateElement("div", "vHint", vertHintsPanel, vertHints[i].toString());
}