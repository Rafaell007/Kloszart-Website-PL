

export function initHorizontalSection(){

    gsap.registerPlugin(ScrollTrigger);

//grow-shrink-video-section

document.querySelectorAll('.grow-section').forEach((section)=>{
	gsap.fromTo(section,
		{
            
			scale: 0.9,
			opacity: 0,
			clipPath: 'inset(100% 5% 5% 0%)',	
		},
		{
            opacity: 1,
            scale: 1,
			clipPath: "inset(0% 0% 0% 0%)",
			ease:"power2.out",
			duration: 3,
			scrollTrigger: {
				trigger:section,
				start: "top 90%",
				end: "top 40%",
				scrub:4,
              
			}
		}
	);
});



//horizontal-scroll
const horizontalScrollEl = document.querySelector('#horizontal-scroll');
if (horizontalScrollEl) {
    let horizontalScroller = gsap.utils.toArray('.horizontal-section');
    gsap.to(horizontalScroller, {
        xPercent: -100 * (horizontalScroller.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: '#horizontal-scroll', //szyna scrolla
            pin: true,
            scrub: true,
            snap: 1/(horizontalScroller.length - 3),
            end:()=> '+=' +
            document.querySelector('.horizontal-section').offsetWidth
        }
    });
}


//slide-background
;(function(){
    let chck_if_gsap_loaded = setInterval(function(){
        if(window.gsap && window.ScrollTrigger){
            gsap.registerPlugin(ScrollTrigger);
						slide_background();
            clearInterval(chck_if_gsap_loaded);
        }
    }, 500);
		function slide_background(){
			gsap.to("body",{
    	scrollTrigger: {
      trigger: "body",
      start: "top top",
      scrub:2
    	},
        background: 'linear-gradient(90deg, var(--bg-dark) 0%, #0a0a0e 15%, #1a1625 30%,rgb(10, 9, 14) 50%, #1a1625 70%, #9595aaff 85%, var(--bg-dark) 100%)',
    		duration: 1
			});
    }
})();

};