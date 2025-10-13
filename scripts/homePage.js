const animatedText = document.querySelector('.text-animation');


function textAnimation () {
    const elementPosition = animatedText.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if(elementPosition.top < windowHeight * 0.6){
    animatedText.classList.add('visible');
    }
    if (elementPosition.top > windowHeight * 0.6){
        animatedText.classList.remove('visible');
    }
}

window.addEventListener("scroll", textAnimation);

