import {generateElement} from './generateElement.js';
const body = document.body;
export  const modalOver = generateElement("div", "modal-over", body);
export  const modalBlock =  generateElement("div", "modal-block", modalOver);
export  const modalButton = generateElement("div", "modal-button", modalBlock, "x");
export  const modalContent =  generateElement("div", "modal-content", modalBlock);
export  const modalText = generateElement("div", "modal-text", modalBlock,"");
export  const modalTime = generateElement("div", "modal-time", modalBlock, "");

export let isOpen = false;
export function openModal() {
  modalOver.classList.add("visible");
  modalBlock.classList.add("visible");
  modalContent.classList.add("visible");
  isOpen = true;
}
export function closeModal() {
  modalOver.classList.remove("visible");
  modalBlock.classList.remove("visible");
  modalText.innerHTML = "";
  modalTime.innerHTML = "";
  modalContent.innerHTML = "";
  isOpen = false;
}