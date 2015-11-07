(function () {
	angular
		.module('signup', [])
		.controller('signupCtrl', signupCtrl);

	signupCtrl.$inject = ['$scope', '$http'];

	function signupCtrl ($scope, $http) {
		$scope.formData = {};
		$scope.signup = signup;

		function signup () {
			console.warn($scope.formData);
			$http.post('api/signup.php', $scope.formData)
				.then(function (res) {
					console.log(res);
					var data = res.data;

					if (!data.success) {
						toastr.error(data.message);
					} else {

					}
				});
		}
	}
}());