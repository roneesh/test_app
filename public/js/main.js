$(document).ready(function() {

$('.application-form').on('submit', validateApplicationForm);

});

function validateApplicationForm(event) {
	event.preventDefault();

	$("input[type=text]", '.application-form').each(function() {
		console.log($(this).val());
	});
}