(function (){
	angular
		.module('invoice', [])
		.controller('invoiceCtrl', invoiceCtrl);

	invoiceCtrl.$inject = ['$scope', '$http', '$window', '$state', '$stateParams'];

	function invoiceCtrl ($scope, $http, $window, $state, $stateParams) {
		$('.modal-backdrop.fade.in').css('display', 'none');

		if ($stateParams.items === 'true') {
			$scope.items = true;
		}
		console.log($scope.items);
		$scope.logout = logout;

		function logout () {
			$window.localStorage.removeItem('token');
			$window.localStorage.removeItem('cart');
			$state.go('login');
		}
	}
}());