(function () {
	angular
		.module('profile', [])
		.controller('profileCtrl', profileCtrl);

	profileCtrl.$inject = ['$scope', '$http'];

	function profileCtrl ($scope, $http) {
		$http.get('api/invoice.php')
			.then(function (res) {

			});
	}
}());