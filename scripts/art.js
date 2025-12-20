


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
};






//lottie scroll trigger
const lottieContainer = document.getElementById('lottie-scroll-trigger');

if (lottieContainer) {
    const animation = lottie.loadAnimation({
        container: lottieContainer,
        renderer: 'svg',  
        loop: false,
        autoplay: false,
        path: './data/JSON/mp4-scroll-animation.json',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    });

    animation.addEventListener('DOMLoaded', () => {
        console.log('Lottie loaded! Total frames:', animation.totalFrames);
        
        gsap.to({ frame: 0 }, {
            frame: animation.totalFrames - 1,
           
            ease: "power1.inOut",
          
           
            scrollTrigger: {
                trigger: '.video-container',
                start: "top top",
                end: "+=1200", // 2000px scrolla na całą animację
                scrub: true,
                pin: true,
            },
            onUpdate: function() {
                animation.goToAndStop(this.targets()[0].frame, true);
            }
        });
    });

    animation.addEventListener('data_failed', () => {
        console.error(' JSON data not found');
    });
}




//observer - fullpage scroll (tylko na stronie art.html)
const contentWrapper = document.querySelector('.content-container-wrapper');

if (contentWrapper) {
    gsap.registerPlugin(Observer, ScrollToPlugin);
    
    let scrollCount = 0;
    
    Observer.create({
        target: window,
        type: "wheel,touch",
        tolerance: 100,
       
        onDown: () => {
            scrollCount++;
            showContent();
            if (scrollCount > 0){
                showContentBottom();
            }
        },
    });
};