(function () {
	angular
		.module('login', ['auth'])
		.controller('loginCtrl', loginCtrl);

	loginCtrl.$inject = ['$scope', '$http', '$state', 'authFactory'];

	function loginCtrl ($scope, $http, $state, authFactory) {
		var token = authFactory.getToken();

		if (token) {
			$http.post('api/inventory.php', token)
				.then(function (res) {
					console.log(res);
				});
		}

		$scope.formData = {};
		$scope.login = login;

		function login () {
			$http.post('api/login.php', $scope.formData)
				.then(function (res) {
					var data = res.data;

					if (!data.success) {
						toastr.error(data.message);
					} else {
						$window.localStorage.token = data.token;
						$state.go('dashboard');
					}
				});
		}
	}
}());