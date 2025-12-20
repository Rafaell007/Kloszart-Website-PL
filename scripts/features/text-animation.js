export function initTextAnimation(){
    const animatedText = document.querySelectorAll('.text-animation');
    if(!animatedText.length) return;

function textAnimation () {
    animatedText.forEach((element)=>{

        const elementPosition = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

    if(elementPosition.top < windowHeight * 0.6){
    element.classList.add('is-visible');
    }
    if (elementPosition.top > windowHeight * 0.6){
        element.classList.remove('is-visible');
    }
    });
}

window.addEventListener("scroll", textAnimation);
textAnimation()

}