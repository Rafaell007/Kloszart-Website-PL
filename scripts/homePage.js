import {  contactModal, calendareModal} from './modal.js';



const animatedText = document.querySelectorAll('.text-animation');

function textAnimation () {
    animatedText.forEach((element)=>{

        const elementPosition = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

    if(elementPosition.top < windowHeight * 0.6){
    element.classList.add('visible');
    }
    if (elementPosition.top > windowHeight * 0.6){
        element.classList.remove('visible');
    }
    });
}

window.addEventListener("scroll", textAnimation);


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

calendareModal();
contactModal()