(function () {
	angular
		.module('inventory', [])
		.controller('inventoryCtrl', inventoryCtrl);

	inventoryCtrl.$inject = ['$scope', '$http'];

	function inventoryCtrl ($scope, $http) {
		$http.get('api/inventory.php')
			.then(function (res) {
				var data = res.data;
				console.log(data);
				if (data.success) {
					$scope.items = data.items;
				}
			});
	}
}());