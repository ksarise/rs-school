import products from "../products.json" assert {type:"json"};

const menu = document.querySelector(".menu-grid");
const modal = document.querySelector(".modal-wrap");
const cup = document.querySelector(".cup");
menu.addEventListener("click", openModal);


function openModal (e) {
    document.body.style.overflow = "hidden";
    modal.classList.remove("hidden");
    const tag = e.target.closest(".cup").dataset.name;
    console.log(tag,findTag(tag));
    modal.innerHTML=createCup(findTag(tag));
    const modalClose = document.querySelector(".modal-close-button");
    modalClose.addEventListener("click", closeModal);

}
function toggleModal () {
    document.body.classList.toggle("body-hidden");
    modal.classList.toggle("hidden");
}
function closeModal () {
    document.body.style.overflow = "";
    modal.classList.add("hidden");
}
function findTag (tag) {
    return products.find((product)=>
    product.tag=tag);
}
function createCup (product) {
    const {name, description, price, category, sizes, additives} = product;
    return `<div class="modal-container">
        <div class="cup-img">
            <img id="modal-img" src="../../assets/images/menu/${category}-${products.indexOf(product)+1}.png" alt="">
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
            </div>
            <div class="modal-alert">
                <div>
                    <img src="" alt="">
                </div>
                <p>The cost is not final. Download our mobile app to see the final price and place your order.
                        Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
            </div>
            <div class="modal-close">
                <button class="modal-close-button">Close</button>
            </div>`
    ;
}