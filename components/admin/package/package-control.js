(function () {
	angular
		.module('admin')
		.controller('packageControl', packageControl);

	packageControl.$inject = ['$scope', '$http', '$state'];

	function packageControl ($scope, $http, $state) {
		$scope.packages = [];
		$scope.toShip = [];

		$scope.addToCart = addToCart;

		var preparedStatement = "SELECT * FROM Package";

		$http.post('api/admin/databasePlease.php', preparedStatement)
			.then(function (res) {
				$scope.packages = res.data['0'];
			});

		function addToCart (itemIndex) {
			var currentItem = $scope.packages[itemIndex];

			if (!currentItem.onTheTruck) {
				currentItem.onTheTruck = true;
				$scope.toShip.push(currentItem);
			} else {
				currentItem.onTheTruck = false;

				var whereItsAt = $scope.toShip.indexOf(currentItem);
				$scope.toShip.splice(whereItsAt, 1);
			}
		}
	}
}());