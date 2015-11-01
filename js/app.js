(function () {
	$('#loginForm button').on('click', function (event) {
		event.preventDefault();

		$.ajax({
			method: 'POST',
			url: 'inventory/login.php',
			data: {
				customerId: $('#customerId').val(),
				password: $('#password').val()
			},
			success: function (res) {
				console.log(res);
				res = JSON.parse(res);
				console.log(res);
				if (!res.success) {
					toastr.error(res.message);
				}
			}
		});
	});
}());