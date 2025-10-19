



export function modal() {
const modal = document.querySelector('#calendare-btn');
const modalBtn = document.querySelector('.open-calendar-btn');
const modalExit = document.querySelector('.modal-exit');

modalBtn.addEventListener('click', ()=>{
    modal.classList.add("show-modal");
})

modalExit.addEventListener('click', ()=>{
    modal.classList.remove('show-modal');
})
}

