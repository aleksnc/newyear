$(document).ready(function(){
    $('.main-gallery__gallery').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            1024:{
                items:3
            },
            1200:{
                items:3
            },
        }
    });

});