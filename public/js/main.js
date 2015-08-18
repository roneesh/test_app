$(document).ready(function() {

	$('.application-form').on('submit', validateForm);

});

function validateForm(event) {
	event.preventDefault();

	var elements_failing_validation = 0,
		form_data,
		request;

	$("input[data-validation$=alpha]", $(this)).each(function() {
		if ( !/^[a-zA-Z]([a-zA-Z ]+)$/.test($(this).val()) ) {
			elements_failing_validation++;
			$(this).addClass('failed-validation');
		} else {
			$(this).removeClass('failed-validation');
		}
	});

	$("input[data-validation$=numeric]", $(this)).each(function() {
		if ( !/^([1-9][0-9])[0-9]?$/.test($(this).val()) ) {
			elements_failing_validation++;
			$(this).addClass('failed-validation');
		} else {
			$(this).removeClass('failed-validation');
		}
	});

	if (elements_failing_validation === 0) {
		form_data = $(this).serialize();
		request = $.ajax({
			url : '/applications',
			method : 'POST',
			data : form_data
		});
		request.done(function(data) {
			location.replace('/applications/' + data.application_id);
		})
		request.fail(function(jqXHR, error) {
			/* no-op*/
		});
	}

}