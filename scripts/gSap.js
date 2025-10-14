
console.clear();



gsap.registerPlugin(ScrollTrigger);

const COUNT = 75;
const REPEAT_COUNT = 3;

const capture = document.querySelector("#capture");

function createCanvases(captureEl) {
	html2canvas(captureEl, {
		backgroundColor: null,  // zachowuje przezroczystość
		preserveDrawingBuffer: true
	}).then((canvas) => {
		const width = canvas.width;
		const height = canvas.height;
		const ctx = canvas.getContext("2d");
		const imageData = ctx.getImageData(0, 0, width, height);
		let dataList = [];
		captureEl.style.display = "none";

		for (let i = 0; i < COUNT; i++) {
			dataList.push(ctx.createImageData(width, height));
		}

		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				for (let l = 0; l < REPEAT_COUNT; l++) {
					const index = (x + y * width) * 4;
					const dataIndex = Math.floor(
						(COUNT * (Math.random() + (2 * x) / width)) / 3
					);
					for (let p = 0; p < 4; p++) {
						dataList[dataIndex].data[index + p] = imageData.data[index + p];
					}
				}
			}
		}

		dataList.forEach((data, i) => {
			let clonedCanvas = canvas.cloneNode();
			clonedCanvas.getContext("2d").putImageData(data, 0, 0);
			clonedCanvas.className = "capture-canvas";
			document.body.appendChild(clonedCanvas);

			const randomAngle = (Math.random() - 0.5) * 2 * Math.PI;
			const randomRotationAngle = 30 * (Math.random() - 0.5);

			let tl = gsap.timeline({
				scrollTrigger: {
					scrub: 2.5,
					start: () => 0,
					end: () => window.innerHeight * 0.5
				}
			});

			tl.to(clonedCanvas, {
				duration: 1,
				rotate: randomRotationAngle,
				translateX: 40 * Math.sin(randomAngle),
				translateY: 40 * Math.cos(randomAngle),
				opacity: 0,
				delay: (i / dataList.length) * 1
			});
		});
	});
}

const images = gsap.utils.toArray("img");

imagesLoaded(images).on("always", () => {
	createCanvases(capture);
});



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
        markers: true //  (pokazuje start/end triggera)
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
// Na końcu: przesuwamy jednocześnie tekst i stos w górę poza ekran
// "+=0.3" → pauza przed wyjazdm (ZWIĘKSZ = dłuższa pauza, np. 0.5, 1.0)
stackTl.to([splitEl, stackStage], { 
    // y: -window.innerHeight → przesuwa w górę o wysokość ekranu (= znika z widoku)
    // ZMIEŃ na -window.innerHeight * 0.5 → mniejszy wyjazd
    // ZMIEŃ na -window.innerHeight * 1.2 → większy wyjazd
    y: -window.innerHeight,
    
    // ease: 'power1.inOut' → płynne przyspieszenie i zwolnienie
    // Spróbuj: 'power2.inOut', 'expo.inOut', 'none' (liniowy)
    ease: 'power1.inOut', 
    
    // duration: 1 → jak długo trwa wyjazd (ZWIĘKSZ = wolniej, np. 1.5, 2)
    duration: 4 
}, "+=0.3");