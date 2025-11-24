import { gallery } from "../data/gallery.js";


let photoContainer = '';

gallery.forEach((photo)=>{
    photoContainer += `
             <div class="gallery-item">
                <img src="${photo.src}" alt="${photo.alt}">
                </div> `   
})


document.querySelector(".photo-gallery").innerHTML = photoContainer;









