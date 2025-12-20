import { initPhotoScroll } from './features/gsap/photos-scroll.js';


const photoBtn = document.querySelector(".spacer-btn");
const photoModal = document.querySelector(".photographers-modal");
const exitBtn = document.querySelector(".exit-btn");

if (photoBtn && photoModal) {
    photoBtn.addEventListener("click", () => {
        photoModal.classList.add("show-modal");
    });
}

if (exitBtn && photoModal) {
    exitBtn.addEventListener("click", () => {
        photoModal.classList.remove("show-modal");
    });
}

// Smooth scroll dla linków z # na tej samej stronie
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        // Sprawdź czy link nie prowadzi do innej strony
        if (href.startsWith("#") && href.length > 1) {
            const sectionId = href.substring(1);
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});


initPhotoScroll();



