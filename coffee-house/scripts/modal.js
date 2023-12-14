import products from "../products.json" assert {type:"json"};

const menu = document.querySelector(".menu-grid");
const modal = document.querySelector(".modal-wrap");
const cup = document.querySelector(".cup");
const modalClose = document.querySelector(".modal-close-button");
menu.addEventListener("click", openModal);

modalClose.addEventListener("click", closeModal);

function openModal () {
    document.body.style.overflow = "hidden";
    modal.classList.remove("hidden");
}
function toggleModal () {
    document.body.classList.toggle("body-hidden");
    modal.classList.toggle("hidden");
}
function closeModal () {
    document.body.style.overflow = "";
    modal.classList.add("hidden");
  }