
console.clear();



//scroll trigger

gsap.registerPlugin(ScrollTrigger);


const stackSection = document.querySelector('.stack-section');
const stackStage = document.querySelector('.stack-container');
const splitEl = document.querySelector('.split');
const stackItems = document.querySelectorAll('.stack-item');

// ===== GŁÓWNA ANIMACJA STACKOWANIA =====
// pin + stack timeline (maksymalnie skrócona sekwencja)
const stackTl = gsap.timeline({
    scrollTrigger: {
        trigger: stackSection, // element, który uruchamia animację
        
        // start: kiedy animacja się rozpoczyna
        // 'top top' = górna krawędź .stack-section dotknie górę viewportu
        // 'top-=200 top' = zaczyna 200px PRZED dotknięciem góry (wcześniej, powyżej)
        // 'top+=100 top' = zaczyna 100px PO dotknięciu góry (później)
        // ZWIĘKSZ ujemną wartość = jeszcze wcześniej/wyżej (np. 'top-=300', 'top-=400')
        start: 'top top',
        
        // end: długość scrollu dla całej animacji
        // Wartość (stackItems.length * 400 + 400) = dla 4 obrazów: 2000px scrollu
        // ZWIĘKSZ 400 → wolniejsze stackowanie, dłuższy wjazd (np. 500, 600)
        // ZMNIEJSZ 400 → szybsze stackowanie (np. 300, 250)
        // ZWIĘKSZ 400 → więcej czasu na końcowy wyjazd
        end: () => '+=' + (stackItems.length * 400 + 400),
        
        scrub: true, // animacja związana z scrollem (smooth follow)
        pin: stackSection, // przypina całą sekcję podczas animacji
        anticipatePin: 1, // zapobiega mrugnięciu przy pinowaniu
        markers: false //  (pokazuje start/end triggera)
    }
});

// Nie pinujemy .split osobno - będzie się ruszał razem ze stosem na końcu

// ===== ANIMACJA WJAZDÓW OBRAZKÓW =====
// każdy kolejny obraz dojeżdża i zostaje (opacity -> 1)
stackItems.forEach((item, i) => {
    // Losowy obrót dla każdego obrazka (-12° do +12°) - większy zakres dla lepszej widoczności
    const rot = gsap.utils.random(-12, 12, 1, true)();
    
    // Stan początkowy obrazka (niewidoczny, niżej, lekko zmniejszony)
    // y: 350 → odległość od końcowej pozycji (ZWIĘKSZ = dalszy/dłuższy wjazd, np. 400, 500)
    // scale: 0.98 → lekkie powiększenie podczas wjazdu (ZMNIEJSZ = bardziej zoom, np. 0.95)
    // rotate: rot → losowy kąt obrotu
    gsap.set(item, { opacity: 0, y: 350, scale: 0.98, rotate: rot, zIndex: i + 1 });
    
    // Animacja wjazdu do pozycji docelowej
    // duration: 2 → jak długo trwa wjazd pojedynczego obrazka (ZWIĘKSZ = wolniej)
    // ease: 'power2.out' → krzywa wygładzenia (spróbuj: 'back.out', 'elastic.out')
    // i * 1.5 → opóźnienie między kolejnymi obrazkami - większe odstępy = lepiej widać każdy
    // ZWIĘKSZ 1.5 → jeszcze większe przerwy (np. 2.0, 2.5)
    stackTl.to(item, { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 2, 
        ease: 'power2.out' 
    }, i * 1.5);
});

// ===== KOŃCOWY WYJAZD STOSU I TEKSTU =====
// Na końcu: zmniejszamy wysokość stosu do 0 i chowamy tekst
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



//grow-shrink-section

document.querySelectorAll('.grow-section').forEach((section)=>{
	gsap.fromTo(section,
		{
			scale: 0.8,
			
			clipPath: 'inset(5% 5% 5% 5%)',	
		},
		{
			scale: 1,
			clipPath: "inset(0% 0% 0% 0%)",
			ease:"power2.out",
			duration: 1,
			scrollTrigger: {
				trigger:section,
				start: "top 60%",
				end: "top 40%",
				scrub:2,
			}
		}
	);
});

//decline-shrink-section

document.querySelectorAll('.decline-section').forEach((section)=>{
	gsap.fromTo(section,
		{
		scale: 1,
	
		},
		{
			scale:0.9,
			opacity:0,
				
			ease:"none",
			duration: 0.5,
			scrollTrigger: {
				trigger:section,
				start:"top",
				end: "bottom 20%",
				scrub: 1,
			}
		}

	);
});


//horizontal-scroll

let horizontalScroller = gsap.utils.toArray('.horizontal-section');
gsap.to(horizontalScroller, {
    xPercent: -100 * (horizontalScroller.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: '#horizontal-scroll', //szyna scrolla
        pin: true,
        scrub: 1,
        snap: 1/(horizontalScroller.length - 3),
        end:()=> '+=' +
        document.querySelector('.horizontal-section').offsetWidth
    }
});



;(function(){
    let chck_if_gsap_loaded = setInterval(function(){
        if(window.gsap && window.ScrollTrigger){
            gsap.registerPlugin(ScrollTrigger);
						slide_background();
            clearInterval(chck_if_gsap_loaded);
        }
    }, 500);
		function slide_background(){
			gsap.to(".slide-container",{
    	scrollTrigger: {
      trigger: ".slide-container",
      start: "top top",
      scrub:2
    	},
        background: 'linear-gradient(135deg, var(--bg-dark) 0%, #0a0a0e 15%, #1a1625 30%, #2d1b4e 50%, #1a1625 70%, #0f0f14 85%, var(--bg-dark) 100%)',
    		duration: 1
			});
    }
})();