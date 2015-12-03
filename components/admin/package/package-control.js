(function () {
	angular
		.module('admin')
		.controller('packageControl', packageControl);

	packageControl.$inject = ['$scope', '$http', '$state'];

	function packageControl ($scope, $http, $state) {
		$scope.packages = [];
		var preparedStatement = "SELECT * FROM Package";

		$http.post('api/admin/databasePlease.php', preparedStatement)
			.then(function (res) {
				$scope.packages.push(res.data['0']);
			});
	}
}());