(function ($) {
	"use strict";
	var nav = $('nav');
	var navHeight = nav.outerHeight();
  
	$('.navbar-toggler').on('click', function() {
	  if (!$('#mainNav').hasClass('navbar-reduce')) {
		$('#mainNav').addClass('navbar-reduce');
	  }
	});
  
	// Preloader
	$(window).on('load', function () {
	  if ($('#preloader').length) {
		$('#preloader').delay(100).fadeOut('slow', function () {
		  $(this).remove();
		});
	  }
	});
  
	// Back to top button
	$(window).scroll(function() {
	  if ($(this).scrollTop() > 100) {
		$('.back-to-top').fadeIn('slow');
	  } else {
		$('.back-to-top').fadeOut('slow');
	  }
	});
  
	$('.back-to-top').click(function(){
	  $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
	  return false;
	});
  
	$('.scrolltop-mf').on("click", function () {
	  $('html, body').animate({
		scrollTop: 0
	  }, 1000);
	});
  
	$('.counter').counterUp({
	  delay: 15,
	  time: 2000
	});
  
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
	  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if (target.length) {
		  $('html, body').animate({
			scrollTop: (target.offset().top - navHeight + 5)
		  }, 1000, "easeInOutExpo");
		  return false;
		}
	  }
	});
  
	$('.js-scroll').on("click", function () {
	  $('.navbar-collapse').collapse('hide');
	});
  
	$('body').scrollspy({
	  target: '#mainNav',
	  offset: navHeight
	});
  
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
	  var pixels = 50;
	  var top = 1200;
	  if ($(window).scrollTop() > pixels) {
		$('.navbar-expand-md').addClass('navbar-reduce');
		$('.navbar-expand-md').removeClass('navbar-trans');
	  } else {
		$('.navbar-expand-md').addClass('navbar-trans');
		$('.navbar-expand-md').removeClass('navbar-reduce');
	  }
	  if ($(window).scrollTop() > top) {
		$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
	  } else {
		$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
	  }
	});
  
	if ($('.text-slider').length == 1) {
	  var typed_strings = $('.text-slider-items').text();
	  var typed = new Typed('.text-slider', {
		strings: typed_strings.split(','),
		typeSpeed: 80,
		loop: true,
		backDelay: 1100,
		backSpeed: 30
	  });
	}
  
	$('#testimonial-mf').owlCarousel({
	  margin: 20,
	  autoplay: true,
	  autoplayTimeout: 4000,
	  autoplayHoverPause: true,
	  responsive: {
		0: {
		  items: 1,
		}
	  }
	});
  
  })(jQuery);
  
  document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('commentForm');
	const responseMessage = document.getElementById('responseMessage');
	
	// Check if form and responseMessage elements exist
	if (form && responseMessage) {
	  form.addEventListener('submit', async (event) => {
		event.preventDefault(); // Prevent the default form submission
	
		// Retrieve input elements
		const emailInput = document.getElementById('emailInput');
		const messageInput = document.getElementById('messageInput');
  
		// Check if input elements exist
		if (emailInput && messageInput) {
		  const email = emailInput.value;
		  const message = messageInput.value;
  
		  // Prepare data for the request
		  const formData = new URLSearchParams();
		  formData.append('email', email);
		  formData.append('message', message);
  
		  try {
			const response = await fetch('/send-email', {
			  method: 'POST',
			  body: formData,
			  headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			  },
			});
  
			if (response.ok) {
			  // Display success message
			  responseMessage.textContent = await response.text();
			  form.reset(); // Optionally, reset the form
			} else {
			  // Handle server-side error
			  responseMessage.textContent = 'An error occurred while sending the message.';
			  console.error('Server error:', response.statusText);
			}
		  } catch (error) {
			// Handle client-side error
			responseMessage.textContent = 'An error occurred while sending the message.';
			console.error('Fetch error:', error);
		  }
		} else {
		  console.error('One or more form elements are missing.');
		}
	  });
	} else {
	  console.error('Form or response message element not found.');
	}
  });
  