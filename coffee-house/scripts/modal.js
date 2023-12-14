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
function createCup (products) {
    return products.map(
        ( {name, description, price, category, sizes, additives}, index) =>
        `<div class="modal-container">
        <div class="cup-img">
            <img id="modal-img" src="../../assets/images/menu/${category}-${index+1}.png" alt="">
        </div>
        <div class="modal-desc">
            <div class="modal-title">
                <h3 id="modal-title">${name}</h3>
                <p id="modal-description">${description}</p>
            </div>
            <div class="modal-size">
                <p>Size</p>
                <div class="menu-tabs">
                    <div class="tab-item active" id="size-small">
                        <div class="tab-icon">
                            <p>S</p>
                        </div>
                        <div class="tab-choice" id="size200">
                            200ml
                        </div>
                    </div>
                    <div class="tab-item" id="size-medium">
                        <div class="tab-icon">
                            <p>M</p>
                        </div>
                        <div class="tab-choice" id="size200">
                            200ml
                        </div>
                    </div>
                    <div class="tab-item" id="size-large">
                        <div class="tab-icon">
                            <p>L</p>
                        </div>
                        <div class="tab-choice" id="size200">
                            200ml
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-additives">
                <p>Additivies</p>
                <div class="menu-tabs">
                    <div class="tab-item" id="add1">
                        <div class="tab-icon">
                            <p>1</p>
                        </div>
                        <div class="tab-choice" id="addSugar">
                            Sugar
                        </div>
                    </div>
                    <div class="tab-item" id="add2">
                        <div class="tab-icon">
                            <p>2</p>
                        </div>
                        <div class="tab-choice" id="addCin">
                            Cinnamon
                        </div>
                    </div>
                    <div class="tab-item" id="add3">
                        <div class="tab-icon">
                            <p>3</p>
                        </div>
                        <div class="tab-choice" id="addSyrup">
                            Syrup
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-total">
                <h3>Total</h3>
                <h3 id="modal-price">${price}</h3>
            </div>`
    );
}