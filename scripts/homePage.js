import { calendareModal, contactModal} from './modal.js';
import { comments} from '../data/gallery.js';



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


/* COMMENTS */

let commentsContainer = '';

comments.forEach((column)=>{
    commentsContainer += `
     <div class="column">
          <div class="item"><img src="${column[0].src}" /></div>
          <div class="item"><img src="${column[1].src}" /></div>
          <div class="item"><img src="${column[2].src}" /></div>
          <div class="item"><img src="${column[3].src}" /></div>
          <div class="item"><img src="${column[4].src}" /></div>
          <div class="item"><img src="${column[5].src}" /></div>
        </div>
              `   
})

const commentWrapper = document.querySelector(".comment-wrapper");
if(commentWrapper){
    commentWrapper.innerHTML = commentsContainer
}



contactModal();
calendareModal();
