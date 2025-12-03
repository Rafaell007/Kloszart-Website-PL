


const contentContainer = document.querySelector('.content-container-wrapper');
const contentContainerBottom = document.querySelector('.content-container-bottom');

export function showContent(){
    contentContainer.classList.add("show-content");
}
export function hideContent(){
    contentContainer.classList.remove("show-content");
}

export function showContentBottom(){
  contentContainerBottom.classList.add("show-content")
}