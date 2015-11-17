//Auto Slider Height Calculation According to Window
jQuery(function () {
    jQuery('#carousel-area .item').css({
        'height': ((jQuery(window).height())) + 'px'
    });
    jQuery(window).resize(function () {
        jQuery('#carousel-area .item').css({
            'height': ((jQuery(window).height())) + 'px'
        });
    });
});


jQuery(function($){

    //Onepage nav plugin controls
    $('.animated-nav').onePageNav({
        'scrollOffset': 80,
        currentClass: 'active',
        changeHash: true,
    });

    //$('.matter_main_nav li:first-child').addClass('active');
});



//WOW Scroll Spy
var wow = new WOW({
    //disabled for mobile
    mobile: false
});
wow.init();

//Text Rotator
$(document).ready(function () {
    $(".rotate-text .rotate").textrotator({
        animation: "flipUp",
        speed: 3000,
        autoPlay: true,
        autoPlayDelay: 1000
    });
});


//Bootsrap slider carousel
$('#carousel-slider').carousel();

$('a[data-slide="prev"]').click(function () {
    $('#carousel-slider').carousel('prev');
});

$('a[data-slide="next"]').click(function () {
    $('#carousel-slider').carousel('next');
});


//Owl carousel Testimonial
jQuery(document).ready(function(){
    /*=== Testimonial ====*/
    jQuery('#testimonial-slider').owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 800,
        paginationSpeed: 400,
        autoPlay: true,
        items : 2,
            itemsDesktop: [1199,1],
            itemsDesktopSmall : [979,1],
            itemsTablet : [768,1],
            itemsMobile : [479,1],
    });
});

// About owl carousel slider
jQuery(document).ready(function(){
    /*=== About-slider ====*/
    jQuery('#about-slider').owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 800,
        paginationSpeed: 400,
        autoPlay: true,
        items : 1,
            itemsDesktop: [1199,1],
            itemsDesktopSmall : [979,1],
            itemsTablet : [768,1],
            itemsMobile : [479,1],
    });
});

//Clients Owl carousel slider 
jQuery(document).ready(function(){
    /*=== clients logo -slider ====*/
    jQuery('#clients-logo').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 800,
        pagination : false,
        paginationSpeed: 400,
        autoPlay: true,
        navigationText : ['<','>'],
        items : 4,
            itemsDesktopSmall : [979,1],
            itemsTablet : [768,3],
            itemsMobile : [479,1],
    });
});

//Contact Form

$('#submit').click(function(){

$.post("assets/php/send.php", $(".contact-form").serialize(),  function(response) {   
 $('#success').html(response);
});
return false;

});

//Counterup
jQuery('.counter-value').counterUp({
    delay: 30,
    time: 3000
});


// Mixitup portfolio filter

jQuery(function(){

    jQuery('.matter_portfolio').mixItUp({
        animation: {
            duration: 1000,
            effects: 'fade stagger(34ms) translateY(10%) scale(0.01)',
            easing: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)'
        }
    });

});

// switcher 
$(document).ready(function(){
    $('.switcher-btn').on('click', function(e){
        e.preventDefault();
        if ($('.switcher-area').hasClass('opened')) {
            $('.switcher-area').animate({left: -300 +"px"}, 100).removeClass('opened');
        } else {
            $('.switcher-area').animate({left: 0 +"px"}, 100).addClass('opened');
        }
    });
});