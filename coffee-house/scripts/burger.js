document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".burger-menu");
    const nav = document.querySelector(".nav-container");
    const lineBot = document.querySelector(".burger-line-bottom");
    const lineTop = document.querySelector(".burger-line-top");


    burger.addEventListener("click",openBurger);
    function openBurger () {
        nav.classList.toggle("open");
        lineBot.classList.toggle("cross");
        lineTop.classList.toggle("cross");
        if (nav.classList.contains("open")) {
                nav.style.visiblity = "visible";
                document.body.style.overflow = "hidden";

        } else {
            nav.style.visiblity ="hidden";
            document.body.style.overflow = "";
        }
    }
});