



export function calendarModal() {
const modal = document.querySelector('.calendar');
const modalBtn = document.querySelector('.open-calendar-btn');
const modalExit = document.querySelector('.modal-exit');

if (!modal || !modalBtn || !modalExit) return;

modalBtn.addEventListener('click', ()=>{
    modal.classList.add("show-modal");
    console.log("test");
    
})

modalExit.addEventListener('click', ()=>{
    modal.classList.remove('show-modal');
})
};



export function contactModal(){
   
    const modal = document.querySelector(".modal-js");
    const modalOpen = document.querySelector(".modal-btn-js");
    const modalExit = document.querySelector(".modal-exit-js")

    if (!modal || !modalOpen || !modalExit) return;

    modalOpen.addEventListener("click", ()=>{
        modal.classList.remove("exit-slideLeft");
        modal.classList.add("show-modal");
    });

    modalExit.addEventListener("click", ()=>{
        modal.classList.add("exit-slideLeft");
        setTimeout(() => {
        modal.classList.remove("show-modal");    
        }, 400);
        
    });
   
    
};



export function navigationModal(){
    const modal = document.querySelector(".mobile-nav-bar-modal");
    const modalBtn = document.querySelector(".mobile-nav-icon");
    const modalExit = document.querySelector(".mobile-nav-exit");
    const modalItems = document.querySelectorAll(".mobile-nav-items");

    if (!modal || !modalBtn || !modalExit) return;

    modalBtn.addEventListener("click", ()=>{
        modal.classList.add("show-mobile-nav-modal");
    })
    modalExit.addEventListener("click", ()=>{
        modal.classList.remove("show-mobile-nav-modal")
    })
    modalItems.forEach((item)=>{
        item.addEventListener("click", ()=>{
            modal.classList.remove("show-mobile-nav-modal");
        })
    })


}