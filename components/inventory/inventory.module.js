(function () {
	angular
		.module('inventory', [])
		.controller('inventoryCtrl', inventoryCtrl);

	inventoryCtrl.$inject = ['$scope', '$http'];

	function inventoryCtrl ($scope, $http) {
		$scope.cart = [];

		$scope.addToCart = addToCart;
		$scope.getStock = getStock;

		$http.get('api/inventory.php')
			.then(function (res) {
				var data = res.data;
				console.log(data);
				if (data.success) {
					$scope.items = data.items;
				}
			});

		function addToCart (itemIndex) {
			var currentItem = $scope.items[itemIndex];
			$scope.cart.push(currentItem);
			console.log($scope.cart);
			currentItem.stock--;
		}

		function getStock (itemIndex) {
			var currentItem = $scope.items[itemIndex];
			if (currentItem.stock > 30) {
				return 'plenty';
			} else if (currentItem.stock > 10) {
				return 'some';
			} else {
				return 'almostGone';
			}

		}
	}
}());