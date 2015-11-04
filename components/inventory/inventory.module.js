(function () {
	angular
		.module('inventory', [])
		.controller('inventoryCtrl', inventoryCtrl);

	inventoryCtrl.$inject = ['$scope', '$http', '$window', '$state'];

	function inventoryCtrl ($scope, $http, $window, $state) {
		$scope.cart = [];

		$scope.addToCart = addToCart;
		$scope.getStock = getStock;
		$scope.getTotalPrice = getTotalPrice;
		$scope.removeItemFromCart = removeItemFromCart;
		$scope.logout = logout;

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
			
			if (currentItem.stock > 0) {
				currentItem.stock--;
				$scope.cart.push(currentItem);
			}
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

		function getTotalPrice () {
			var cart = $scope.cart;
			var totalPrice = 0;

			for (var i = 0; i < cart.length; i++) {
				var price = parseInt(cart[i].price);
				totalPrice += price;
			}

			return totalPrice;
		}

		function removeItemFromCart (itemToDelete, itemIndex) {
			for (var i = 0; i < $scope.items.length; i++) {
				var item = $scope.items[i];

				if (item.itemId === itemToDelete.itemId) {
					item.stock++;
				}
			}

			$scope.cart.splice(itemIndex, 1);
		}

		function logout () {
			$window.localStorage.removeItem('token');
			$state.go('login');
		}

		function loopThruItems (items, action) {
			for (var i = 0; i < items.length; i++) {
				action(items[i]);
			}
		}
	}
}());