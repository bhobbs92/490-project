(function () {
	angular
		.module('signup', [])
		.controller('signupCtrl', signupCtrl);

	signupCtrl.$inject = ['$scope', '$http', '$state'];

	function signupCtrl ($scope, $http, $state) {
		$scope.formData = {};
		$scope.signup = signup;

		function signup () {
			$http.post('api/signup.php', $scope.formData)
				.then(function (res) {
					var data = res.data;

					if (data.success) {
						toastr.success(data.message);
						$state.go('login');
					}
				});
		}
	}
}());