
import {comments, photos } from '../../data/gallery.js';


export function initDataRender(){
/* COMMENTS STRUCTURE */
let commentsContainer = '';

comments.forEach((column) => {
    commentsContainer += `
     <div class="comments-column">
          <div class="item"><img src="${column[0].src}" /></div>
          <div class="item"><img src="${column[1].src}" /></div>
          <div class="item"><img src="${column[2].src}" /></div>
          <div class="item"><img src="${column[3].src}" /></div>
          <div class="item"><img src="${column[4].src}" /></div>
          <div class="item"><img src="${column[5].src}" /></div>
        </div>
              `   
});

const commentWrapper = document.querySelector(".comment-wrapper");
if (commentWrapper) {
    commentWrapper.innerHTML = commentsContainer;
}


/* PHOTOS STRUCTURE */

let photoContainer = '';

photos.forEach((column)=>{
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

}