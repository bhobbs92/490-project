(function () {
	angular
		.module('admin')
		.controller('packageControl', packageControl);

	packageControl.$inject = ['$scope', '$http', '$state'];

	function packageControl ($scope, $http, $state) {
		$scope.packages = [];
		$scope.toShip = [];
		$scope.perishable = false;

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
		function getCollectiveWeight(){
			var collectiveWeight = 0;
			for(var package in $scope.toShip){
					collectiveWeight += parseInt($scope.toShip[package].weight);

			}
				return collectiveWeight;
		}

		$scope.addCargo = function(){

							getCargoIds = "SELECT * FROM CARGO";
							$http.post('api/admin/databasePlease.php', getCargoIds).then(
								function (res) {
									var allIds= res.data[0];
									$scope.nextCargoId = 1;
									for(var id in allIds){
										if(allIds[id].Skid_ID_Number > $scope.nextCargoId){
											$scope.nextCargoId = parseInt(allIds[id].Skid_ID_Number);
										}
									}
									$scope.nextCargoId++
									console.log($scope.nextCargoId);
									var weight = getCollectiveWeight();
									var insertCargo = "INSERT INTO `CARGO`(`Skid_ID_Number`, `Skid_Weight`, `Skid_Contents`) VALUES ("+	$scope.nextCargoId+","+weight+", '"+(($scope.perishable)?"PERISHABLE":"NON_PERISHABLE")+"')";
									console.log(insertCargo);


									//insert into cargo table (works)
									$http.post('api/admin/databasePlease.php', insertCargo).then(
										function (res) {
											console.log(res);



											//Insert into cargo elements (villian)
											for(var package in $scope.toShip){
												var insertCargoEle = "INSERT INTO `Cargo_Elements`(`Skid_ID_Number`, `packageId`, `name`, `address`, `weight`)"
																							+ "VALUES ("+$scope.nextCargoId+","+ $scope.toShip[package].packageId+",'"+ $scope.toShip[package].recipient+"','"+ $scope.toShip[package].address+"',"+ $scope.toShip[package].weight+")";
												console.log(insertCargoEle);
												$http.post('api/admin/databasePlease.php', insertCargo).then(
													function (res) {
														console.log(res);
													});

											}




										});


							});



						}
	}
}());
