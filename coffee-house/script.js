document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const progressBar = document.querySelector(".favorite-coffee-controls");
    const nextButton = document.getElementById("right");
    const prevButton = document.getElementById("left");
    
    const slides = Array.from(carousel.children);
    const bars = Array.from(progressBar.children);
    console.log(slides);
    console.log(bars);

    prevButton.addEventListener("click", prevPicture);
    nextButton.addEventListener("click", nextPicture);
    let currentIndex = 0;

    function moveSlider() {
        const newPos = -currentIndex * 100;
        for (let i = 0; i < slides.length; i++) {
          const slide = slides[i];
          slide.style.transform = `translateX(${newPos}%)`;
            if (i=== currentIndex) {
                bars[i].classList.add("active");
            } else {
                bars[i].classList.remove("active");
            }
        }
      }
    function prevPicture() {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = slides.length - 1;
        }
        moveSlider();
      }
    function nextPicture() {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; 
    }
    moveSlider();
    }
});