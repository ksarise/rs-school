import { generateElement } from "./generateElement.js";
const body = document.body;
const wrap = generateElement("div", "page-wrap", body, "wrap");
const header = generateElement("header", "header", wrap, "header");
const main = generateElement("main", "main", wrap, "main");
const mainContainer = generateElement("section","main-container", main, "main-container");
const matrix = generateElement("div", "matrix", mainContainer, "matrix");

for (let i = 0; i <= 5; i += 1) {
  const row = generateElement("div", "row", matrix);
  for (let j = 0; j < 5; j += 1) {
    generateElement("div", "gram", row, "#");
  }
}