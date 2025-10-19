import { modal } from './modal.js';



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

modal();