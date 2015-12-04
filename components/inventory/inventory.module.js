(function () {
	angular
		.module('inventory', ['auth'])
		.controller('inventoryCtrl', inventoryCtrl);

	inventoryCtrl.$inject = ['$scope', '$http', '$state', 'authFactory'];

	function inventoryCtrl ($scope, $http, $state, authFactory) {
		$scope.cart = [];
		$scope.purchased = {};

		$scope.addToCart = addToCart;
		$scope.getStock = getStock;
		$scope.getTotalPrice = getTotalPrice;
		$scope.removeItemFromCart = removeItemFromCart;
		$scope.logout = logout;
		$scope.goToInvoice = goToInvoice;
		$scope.invoiceId;

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

				if ($scope.purchased[currentItem.name]) {
					console.log('Incrementing ' + currentItem.name + ' \'s amount');
					$scope.purchased[currentItem.name].amount++
				} else {
					console.log('Need to create ' + currentItem.name);
					$scope.purchased[currentItem.name] = currentItem;
					$scope.purchased[currentItem.name].amount = 1;
				}

				console.log($scope.purchased);

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
			if ($scope.purchased[itemToDelete.name].amount === 1) {
				delete $scope.purchased[itemToDelete.name];
			} else {
				$scope.purchased[itemToDelete.name].amount --;
			}

			console.log($scope.purchased[itemToDelete.name]);

			for (var i = 0; i < $scope.items.length; i++) {
				var item = $scope.items[i];

				if (item.itemId === itemToDelete.itemId) {
					item.stock++;
				}
			}

			$scope.cart.splice(itemIndex, 1);
		}

		function logout () {
			authFactory.removeToken();
			$state.go('login');
		}

		function loopThruItems (items, action) {
			for (var i = 0; i < items.length; i++) {
				action(items[i]);
			}
		}

		var getuniqueId = function(){
			var highestId = 0;
			var currentId;
			for (var element in $scope.items){
				currentId = Number($scope.items[element].itemId); //force coercion to number
				if( highestId <= currentId){
					highestId = currentId;
				}
			}
			return highestId + 1;
		}

		function goToInvoice () {
					if (!$scope.cart.length) {
						toastr.error('Your cart has no items!');
					} else {

						$http.post('api/invoice.php', $scope.purchased).then(function(response){
							var data = response.data;
							console.log('response from invoice insertion: ');
							$scope.invoiceId = parseInt(data.items[0])+1;
							console.log($scope.invoiceId);
							updateTables();
						});

					}
				}

				function updateTables(){		//update inventory & insert into package

				$http.post('api/inventoryUpdate.php', $scope.purchased)
					.then(function (res) {
						var data = res.data;
						console.log(res);
						if (data.success) {
							var packageInsertion = "INSERT INTO `Package`(`invoiceId`, `address`, `recipient`, `perishable`, `weight`) VALUES ('"+$scope.invoiceId+"', (SELECT address FROM Customer WHERE CustomerId = (SELECT CustomerId FROM `Invoice` WHERE InvoiceId ='"+$scope.invoiceId+"')), (SELECT name FROM Customer WHERE CustomerId = (SELECT CustomerId FROM `Invoice` WHERE InvoiceId ='"+$scope.invoiceId+"')), 1, 20)";
							console.log(packageInsertion);
							$http.post('api/admin/databasePlease.php', packageInsertion).then(
								function(response){
									console.log(response.data);
									var invoices = response.data;
								}
							)
							$state.go('invoice', { items: true });
						}
					});
				}
	}
}());
