import { calendarModal, contactModal, navigationModal} from './modal.js';
import { initTextAnimation } from './features/text-animation.js';
import { initStackSection } from './features/gsap/stack-section.js';
import { initSwiper } from './features/swiper.js';
import { initCommentsScroll } from './features/gsap/comments-scroll.js';
import { initSplitText } from './features/gsap/split-text.js';
import { initHomeShrinkSection } from './features/gsap/home-shrink-sections.js';
import { initHorizontalSection } from './features/gsap/horizontal-section.js';
import { initDataRender, initLazyVideo } from './features/data-render.js';
import { initEmailForm } from './email-form.js';





const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach((link)=>{
    link.addEventListener("click", (e)=>{
        e.preventDefault();
        const href = link.getAttribute("href");
        const sectionId = href.substring(1);
        const targetSection = document.getElementById(sectionId);

        if(targetSection){
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: "start"
            });
        }

    });
});


    initEmailForm()
    initDataRender();
    initLazyVideo();
    initSplitText();
    initHomeShrinkSection();
    initTextAnimation();
    initStackSection();
    initSwiper();
    initCommentsScroll();
    initHorizontalSection();
    contactModal();
    calendarModal();
    navigationModal();


