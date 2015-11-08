(function () {
	angular
		.module('profile', [])
		.controller('profileCtrl', profileCtrl);

	profileCtrl.$inject = ['$scope', '$http'];

	function profileCtrl ($scope, $http) {
		$http.get('api/invoiceRequest.php')
			.then(function (res) {
				$scope.user = res.data.customerData[0];
				$scope.invoices = res.data.items;
				$scope.invoices = res.data.customerData;
			});

	}
}());
