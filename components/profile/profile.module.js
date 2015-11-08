(function () {
	angular
		.module('profile', [])
		.controller('profileCtrl', profileCtrl);

	profileCtrl.$inject = ['$scope', '$http'];

	function profileCtrl ($scope, $http) {
		$http.get('api/invoiceRequest.php')
			.then(function (response) {
				$scope.invoices = response.data.items;
				$scope.invoices = response.data.customerData;
				console.log(response);
			});

	}
}());
