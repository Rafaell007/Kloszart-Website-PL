
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
					end: () => window.innerHeight * 0.7
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

// pin + stack timeline
const stackTl = gsap.timeline({
    scrollTrigger: {
        trigger: stackSection,
        start: 'top+=100 top',
        end: '+=2000', // długość sekwencji stackowania
        scrub: true,
        pin: stackStage, // przypinamy widoczną scenę
        markers: true // usuń po testach
    }
});

// Pin dla tekstu .split (stoi w miejscu na czas całej sekwencji)
ScrollTrigger.create({
    trigger: stackSection,
    start: 'top 10%',
    end: '+=2000',
    pin: splitEl,
    pinSpacing: true, // zostawia miejsce, tekst nie przeskakuje
    markers: true // usuń po testach
});

// każdy kolejny obraz dojeżdża i zostaje (opacity -> 1)
stackItems.forEach((item, i) => {
    const rot = gsap.utils.random(-8, 8, 1, true)();
    gsap.set(item, { opacity: 0, y: 80, scale: 0.98, rotate: rot, zIndex: i + 1 });
    stackTl.to(item, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power2.out' }, i * 0.6);
});