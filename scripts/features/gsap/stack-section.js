export function initStackSection(){

gsap.registerPlugin(ScrollTrigger, Observer);


const stackSection = document.querySelector('.stack-section');
const stackStage = document.querySelector('.stack-container');
const splitEl = document.querySelector('.split');
const stackItems = document.querySelectorAll('.stack-item');

const textParagraph = document.querySelector(".stack-container-text");

if(!stackSection || !stackStage || !splitEl || !stackItems.length) return;

if(!textParagraph) return;
// ===== GŁÓWNA ANIMACJA STACKOWANIA =====

const stackTl = gsap.timeline({
    scrollTrigger: {
        trigger: stackSection, 
        start: 'top top',
        
        end: () => '+=' + (stackItems.length * 400 + 400),
        
        scrub: true, 
        pin: stackSection, 
        anticipatePin: 1, 
       markers: false
    }
});

// ===== ANIMACJA WJAZDÓW OBRAZKÓW =====

stackItems.forEach((item, i) => {
    // Losowy obrót dla każdego obrazka (-12° do +12°) 
    const rot = gsap.utils.random(-12, 12, 1, true)();
    gsap.set(item, { opacity: 0, y: 350, scale: 0.98, rotate: rot, zIndex: i + 1 });
    
    stackTl.to(item, { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 2, 
        ease: 'power2.out' 
    }, i * 1.5);
});

// ===== KOŃCOWY WYJAZD STOSU I TEKSTU =====
// Na końcu: zmniejszamy wysokość stosu do 0 i chowam tekst
stackTl.to(stackStage, { 
    height: 0,
    ease: 'power1.inOut', 
    duration: 4 
}, "+=0.3");

stackTl.to(splitEl, { 
    opacity: 0,
    ease: 'power1.inOut', 
    duration: 4 
}, "<");

stackTl.to(stackItems, { 
    scale: 0.8,
    opacity: 0,
    y: 30,
    ease: 'power2.in', 
    duration: 4 
}, "<");

//show-up-text ovserver + scroll trigger


if (stackStage) {
let scrollCount = 0;

    ScrollTrigger.create({
        trigger: ".stack-container",
        start: "top top",
        onEnter: () => {
            Observer.create({
                target: window,
                type: "wheel,touch",
                tolerance: 150,
                onDown: () => {
                    if (scrollCount >= 6) return; 
                    
                    scrollCount++;
                   
                    
                    if (scrollCount === 1) {
                        document.querySelector(".show-up-text-1").classList.add("show");
                    }
                    if (scrollCount === 2) {
                        document.querySelector(".show-up-text-2").classList.add("show");
                    }
                    if (scrollCount === 3) {
                        document.querySelector(".show-up-text-3").classList.add("show");
                    }
                    if (scrollCount === 4) {
                        document.querySelector(".show-up-text-4").classList.add("show");
                    }
                    if (scrollCount === 5) {
                     gsap.to(textParagraph, {
                        scale: 0.8,
                        opacity: 0,
                        y: 30,
                        ease: "power2.in",
                        duration: 2.5

                     }); 
                       
                    }
                }
            });
        }
    });
}


}