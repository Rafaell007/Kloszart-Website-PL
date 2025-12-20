export function initHomeShrinkSection(){
   const {gsap, ScrollTrigger} = window;

  
    gsap.registerPlugin(ScrollTrigger);


    //decline-shrink-home-section

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





};