(function() {

	$('#about-link').click(function(e) {
		 e.preventDefault();
		$('html body').animate({scrollTop: $("#about").offset().top});
	});

	$('#skills-link').click(function(e) {
		 e.preventDefault();
		$('html body').animate({scrollTop: $("#skills").offset().top});
	});

	$('#projects-link').click(function(e) {
		 e.preventDefault();
		$('html body').animate({scrollTop: $("#projects").offset().top});
	});

});