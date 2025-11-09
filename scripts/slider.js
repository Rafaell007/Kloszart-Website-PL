const cardsSwiper = new Swiper ('.my-cards-swiper', {
    slidesPerView: 1,
    spaceBetween: 16,
    
   loop: true,
   
   
    speed: 600,
    grabCursor: true,
    pagination: {
        el:'.swiper-pagination ',
        clickable: true,
        modifierClass: 'swiper-pagination',
        bulletClass: 'pagination-bullet',
        bulletActiveClass: 'bullet-active',
       
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    navigation: {
        nextEl: ".swiper-right-btn",
        prevEl: ".swiper-left-btn",
        
    },
    keyboard: {
        enabled: true,
    },
  
    breakpoints: {
        480: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 3,
        },
    },


})



