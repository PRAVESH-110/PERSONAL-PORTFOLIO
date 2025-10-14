AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {
		// Check if device is mobile
		var isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
		
		if (!isMobile) {
			// Only apply fixed height on desktop/tablet
			$('.js-fullheight').css('height', $(window).height());
		} else {
			// On mobile, use reduced height to account for fixed navbar
			$('.js-fullheight').css({
				'height': 'auto',
				'min-height': $(window).height() - 80 // Subtract navbar height
			});
		}
		
		$(window).resize(function(){
			var isMobileResize = window.matchMedia("only screen and (max-width: 768px)").matches;
			
			if (!isMobileResize) {
				$('.js-fullheight').css('height', $(window).height());
			} else {
				$('.js-fullheight').css({
					'height': 'auto',
					'min-height': $(window).height() - 80
				});
			}
		});

	};
	fullHeight();

	// Dynamic navbar height calculation
	var updateNavbarOffset = function() {
		// Wait for DOM to be fully loaded
		setTimeout(function() {
			var navbar = $('#ftco-navbar');
			if (navbar.length) {
				var navbarHeight = navbar.outerHeight();
				var isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
				
				// Calculate appropriate offset
				var extraPadding = isMobile ? 20 : 30;
				var totalOffset = navbarHeight + extraPadding;
				
				// Update body data-offset attribute
				$('body').attr('data-offset', totalOffset);
				
				// Update CSS custom properties for scroll-padding-top
				document.documentElement.style.setProperty('--navbar-height', totalOffset + 'px');
				
				// On mobile, also update hero height dynamically
				if (isMobile) {
					var windowHeight = $(window).height();
					var heroHeight = windowHeight - navbarHeight;
					
					$('.hero').css('min-height', heroHeight + 'px');
					$('.owl-carousel.home-slider').css('min-height', heroHeight + 'px');
					$('.owl-carousel.home-slider .slider-item').css('min-height', heroHeight + 'px');
					$('.js-fullheight').css('min-height', heroHeight + 'px');
				}
				
				console.log('Navbar height calculated:', navbarHeight, 'Total offset set to:', totalOffset);
			}
		}, 100);
	};
	
	// Call on load and resize
	updateNavbarOffset();
	$(window).resize(function() {
		updateNavbarOffset();
	});

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();



   // Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#ftco-nav').is(':visible') ) {
				$(this).removeClass('active');
				$('#ftco-nav').removeClass('show');
				// Re-enable body scrolling
				$('body').removeClass('nav-open');
			} else {
				$(this).addClass('active');
				$('#ftco-nav').addClass('show');
				// Optional: Prevent body scrolling when menu is open (uncomment if needed)
				// $('body').addClass('nav-open');
			}
		});
		
		// Close menu when clicking on nav links
		$('#ftco-nav a[href^="#"]').on('click', function() {
			$('.js-fh5co-nav-toggle').removeClass('active');
			$('#ftco-nav').removeClass('show');
			$('body').removeClass('nav-open');
		});

	};
	burgerMenu();


	var onePageClick = function() {

		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
	    event.preventDefault();

	    var href = $.attr(this, 'href');
	    var target = $(href);
	    
	    // Check if target exists
	    if (target.length) {
	    	// Calculate dynamic offset based on actual navbar height
	    	var navbar = $('#ftco-navbar');
	    	var navbarHeight = navbar.outerHeight();
	    	var isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
	    	
	    	// Add extra padding for better visual separation
	    	var extraPadding = isMobile ? 20 : 30;
	    	var offset = navbarHeight + extraPadding;
	    	
	    	// Debug log to see actual values (remove in production)
	    	console.log('Navbar height:', navbarHeight, 'Total offset:', offset);
	    	
	    	// Close mobile menu if open
	    	$('.js-fh5co-nav-toggle').removeClass('active');
	    	$('#ftco-nav').removeClass('show');
	    	$('body').removeClass('nav-open');
	    	
		    $('html, body').animate({
		        scrollTop: target.offset().top - offset
		    }, 800, 'easeInOutExpo', function() {
		    	// Optional: Update URL hash
		    	// window.location.hash = href;
		    });
	    }
		});

	};

	onePageClick();
	

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
		$this.removeClass('show');
		$this.find('> a').attr('aria-expanded', false);
		$this.find('.dropdown-menu').removeClass('show');
	});

	// Close dropdown when clicking outside
	$(document).on('click', function (e) {
		if (!$(e.target).closest('.navbar-nav').length) {
			$('.js-fh5co-nav-toggle').removeClass('active');
			$('#ftco-nav').removeClass('show');
		}
	});

	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
			if (st > 0) { // Check if the user is scrolling down
				$('.js-fh5co-nav-toggle').removeClass('active'); // Remove active class from the toggle
				$('#ftco-nav').removeClass('show'); // Hide the dropdown menu
			}
		});
	};
	scrollWindow();

	var counter = function() {
		
		$('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

})(jQuery);
