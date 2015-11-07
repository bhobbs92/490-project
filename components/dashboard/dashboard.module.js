(function () {
	angular
		.module('dashboard', [])
		.controller('dashCtrl', dashCtrl);

	dashCtrl.$inject = ['$scope', '$http'];

	function dashCtrl ($scope, $http) {
		console.log('dashboard');
	}
}());