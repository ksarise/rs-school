document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const progressBars = document.querySelectorAll(".favorite-coffee-control");
    const nextButton = document.getElementById("right");
    const prevButton = document.getElementById("left");
    const slider = document.querySelector(".favorite-coffee-row-slider");

    const slides = Array.from(carousel.children);
 
    console.log(slides);
    console.log(progressBars);

    prevButton.addEventListener("click", prevPicture);
    nextButton.addEventListener("click", nextPicture);
    slider.addEventListener("mouseenter",stopAuto);
    slider.addEventListener("mouseleave",slideAuto);
    let currentIndex = 0;
    let autoInt;

    slideAuto();
    nullActiveBar();
    function slideAuto () {
        autoInt = setInterval(() => {
            nextPicture();
        },6000);
    }
    function stopAuto () {
        clearInterval(autoInt);
    }
    function restartAuto () {
        clearInterval(autoInt);
        slideAuto();
    }

    function moveSlider() {
        const newPos = -currentIndex * 100;
        for (let i = 0; i < slides.length; i++) {
          const slide = slides[i];
          const bar = progressBars[i];
          slide.style.transform = `translateX(${newPos}%)`;
            if (i=== currentIndex) {
                bar.classList.add("active");
            } else {
                bar.classList.remove("active");
            }
        }
      }
    function nullActiveBar () {
        progressBars[0].classList.add("active");
    }
    function prevPicture() {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = slides.length - 1;
        }
        moveSlider();
        restartAuto();
      }
    function nextPicture() {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
        } else {
            currentIndex = 0; 
        }
        moveSlider();
        restartAuto();
    }
    

});