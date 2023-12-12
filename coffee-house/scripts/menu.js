import products from "../products.json" assert {type:"json"};

const tabs = document.querySelector(".menu-tabs");
const menu = document.querySelector(".menu-grid");

/*console.log(menu.innerHTML); */
const activeTab = Array.from(tabs.children);
console.log(activeTab);

function getProducts(category) {
return products.filter((product) => product.category === category);
}
let tea = getProducts("tea");
console.log (getProducts("tea"));
