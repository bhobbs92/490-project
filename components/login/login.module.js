(function () {
	angular
		.module('login', [])
		.controller('loginCtrl', loginCtrl);

	loginCtrl.$inject = ['$scope', '$http', '$window', '$state'];

	function loginCtrl ($scope, $http, $window, $state) {
		if ($window.localStorage.token) {
			$http.post('api/inventory.php', $window.localStorage.token)
				.then(function (res) {
					console.log(res);
					var data = res.data;

					if (data.success) {
						$state.go('inventory');
					} else {
						toastr.info('Your session has expired, please log in again');
					}
				});
		}

		$scope.formData = {};
		$scope.login = login;

		function login () {
			$http.post('api/login.php', $scope.formData)
				.then(function (res) {
					console.log(res);
					var data = res.data;

					if (!data.success) {
						toastr.error(data.message);
					} else {
						$window.localStorage.token = data.token;
						$state.go('inventory');
					}
				});
		}
	}
}());