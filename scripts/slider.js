const cardsSwiper = new Swiper ('.my-cards-swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    observer: true,
   
   watchOverflow: true,
   watchSlidesProgress: true,
    centeredSlides: true,

    loopAdditionalSlides: 3,
    initialSlide: 1,
    roundLengths: true,
    speed: 600,
    grabCursor: true,
    pagination: {
        el:'.my-cards-swiper .swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        
    },
    keyboard: {
        enabled: true,
    },
   breakpoints: {
    480: { slidesPerView: 1.2, spaceBetween: 10, centeredSlides: true },
    768: { slidesPerView: 2, spaceBetween: 14, centeredSlides: true },
    1024: { slidesPerView: 3, spaceBetween: 16, centeredSlides: false, loop: false},
},


})