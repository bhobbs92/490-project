(function () {
	angular
		.module('profile', ['auth'])
		.controller('profileCtrl', profileCtrl);

	profileCtrl.$inject = ['$scope', '$http', '$state', 'authFactory'];

	function profileCtrl ($scope, $http, $state, authFactory) {
		var token = authFactory.getToken();

		if (!token) {
			$state.go('login');
			toastr.error('Please log in');
			return false;
		}

		$scope.logout = logout;

		$http.get('api/invoiceRequest.php')
			.then(function (res) {
				$scope.user = res.data.customerData[0];
				$scope.invoices = res.data.invoices;
				console.log($scope.invoices);
			});

		function logout () {
			authFactory.removeToken();
			$state.go('login');
		}

	}
}());
