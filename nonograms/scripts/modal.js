import {generateElement} from './generateElement.js';
const body = document.body;
export  const modalOver = generateElement("div", "modal-over", body);
export  const modalBlock =  generateElement("div", "modal-block", modalOver);
export  const modalText = generateElement("div", "modal-text", modalBlock,"");
export  const modalWord = generateElement("div", "modal-word", modalBlock, "");
export  const modalButton = generateElement("div", "modal-button", modalBlock,"Play Again");
export let isOpen = false;
export function openModal() {
  modalOver.classList.add("visible");
  modalBlock.classList.add("visible");
  isOpen = true;
}
export function closeModal() {
  modalOver.classList.remove("visible");
  modalBlock.classList.remove("visible");
  isOpen = false;
}