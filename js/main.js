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
  
	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
	  $('html, body').animate({
		scrollTop: 0
	  }, 1000);
	});
  
	/*--/ Star Counter /--*/
	$('.counter').counterUp({
	  delay: 15,
	  time: 2000
	});
  
	/*--/ Star Scrolling nav /--*/
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
  
	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
	  $('.navbar-collapse').collapse('hide');
	});
  
	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
	  target: '#mainNav',
	  offset: navHeight
	});
	
	/*--/ Navbar Menu Reduce /--*/
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
  
	/*--/ Star Typed /--*/
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
  
	/*--/ Testimonials owl /--*/
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
  
	/*--/ Real-Time Search Filter /--*/
	$('input[type="text"].form-control').on('input', function() {
	  var searchValue = $(this).val().toLowerCase();
	  $('.content-item').filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1);
	  });
	});
  
  })(jQuery);
  
  document.addEventListener('DOMContentLoaded', function() {
	// Select the form element
	const form = document.getElementById('commentForm');
  
	// Add an event listener for the form submit event
	form.addEventListener('submit', function(event) {
	  // Prevent the default form submission
	  event.preventDefault();
  
	  // Get the form input values
	  const name = document.getElementById('inputName').value;
	  const email = document.getElementById('inputEmail1').value;
	  const website = document.getElementById('inputUrl').value;
	  const comment = document.getElementById('textMessage').value;
  
	  // Example: Display the collected data in the console
	  console.log('Name:', name);
	  console.log('Email:', email);
	  console.log('Subject:', website);
	  console.log('Comment:', comment);
  
	  // Optionally, you can send this data to the server
	  // Example: Use fetch API or jQuery's $.ajax to send the data to the server
  
	  // Display the comment on the page (local handling example)
	  displayComment(name, email, website, comment);
  
	  // Clear the form fields after submission
	  form.reset();
	});
  
	// Function to display the comment on the page
	function displayComment(name, email, website, comment) {
	  const commentsSection = document.getElementById('form-comments');
	  const newComment = document.createElement('div');
	  newComment.className = 'user-comment';
	  newComment.innerHTML = `
		<h5>${name}</h5>
		<p>${comment}</p>
		<small><a href="${website}" target="_blank">${website}</a></small>
	  `;
	  commentsSection.appendChild(newComment);
	}
  });
  