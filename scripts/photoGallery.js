import { gallery} from "../data/gallery.js";



let photoContainer = '';

gallery.forEach((column)=>{
    photoContainer += `
     <div class="column">
          <div class="item"><img src="${column[0].src}" alt="" title="${column[0].author}" /></div>
          <div class="item"><img src="${column[1].src}" alt="" title="${column[1].author}" /></div>
          <div class="item"><img src="${column[2].src}" alt="" title="${column[2].author}" /></div>
          <div class="item"><img src="${column[3].src}" alt="" title="${column[3].author}" /></div>
          <div class="item"><img src="${column[4].src}" alt="" title="${column[4].author}" /></div>
          <div class="item"><img src="${column[5].src}" alt="" title="${column[5].author}" /></div>
        </div>
              `   
})

const wrapper = document.querySelector(".wrapper");
if(wrapper){
 wrapper.innerHTML= photoContainer; 
}


const photoBtn = document.querySelector(".spacer-btn");
const  photoModal = document.querySelector(".photographers-modal");
const exitBtn = document.querySelector(".exit-btn");

photoBtn.addEventListener("click", ()=>{
    photoModal.classList.add("show-modal");
})

exitBtn.addEventListener("click", ()=>{
    photoModal.classList.remove("show-modal");
})

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







