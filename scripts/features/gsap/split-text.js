export function initSplitText(){
    
gsap.registerPlugin(SplitText);
document.fonts.ready.then(()=>{
    let split =  SplitText.create(".split-text", {type:"words"});

gsap.from(split.words, {
    duration: 1,
    filter: "blur(10px)",
    y:100,
    autoAlpha: 0,
    stagger: {
        amount: 0.5,
        from: "end"
    }
});

})



document.fonts.ready.then(()=>{
    let split =  SplitText.create(".split-text-bottom", {type:"words"});

gsap.from(split.words, {
    scale: 0,
    opacity: 0,
    filter: "blur(10px)",
    stagger: 0.1
});

})

};