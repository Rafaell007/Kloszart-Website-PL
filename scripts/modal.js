



export function calendareModal() {
const modal = document.querySelector('.calendare');
const modalBtn = document.querySelector('.open-calendar-btn');
const modalExit = document.querySelector('.modal-exit');

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
