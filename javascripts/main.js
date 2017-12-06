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
})

$('.kth-projects').css('display', 'none');

$('#kth').on('mouseup', function(e) {
	if($('.kth-projects').css('display') == 'inline-flex')
		$('.kth-projects').css('display', 'none');
	else
		$('.kth-projects').css('display', 'inline-flex');
});

$('#polymtl-projects').css('display', 'none');

$('#polymtl').on('mouseup', function(e) {
	if($('#polymtl-projects').css('display') == 'inline-flex')
		$('#polymtl-projects').css('display', 'none');
	else
		$('#polymtl-projects').css('display', 'inline-flex');
});