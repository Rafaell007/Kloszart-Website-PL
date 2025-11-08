const cardsSwiper = new Swiper ('.my-cards-swiper', {
    slidesPerView: 3,
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
  


})



