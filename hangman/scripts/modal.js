import {generateElement} from './generateElement.js';
const body = document.querySelector("body");
export  const modalOver = generateElement("div", "modal-over", body);
export  const modalBlock =  generateElement("div", "modal-block", modalOver);
export  const modalText = generateElement("div", "modal-text", modalBlock,"");
export  const modalWord = generateElement("div", "modal-word", modalBlock, "");
export  const modalButton = generateElement("div", "modal-button", modalBlock,"Again");
export function toggleModal(guessed) {
  modalOver.classList.toggle("visible");
  modalBlock.classList.toggle("visible");
  modalWord.textContent = guessed;
}
export function closeModal() {
  modalOver.classList.remove("visible");
  modalBlock.classList.remove("visible");
}