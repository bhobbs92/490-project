(function (){
	angular
		.module('invoice', [])
		.controller('invoiceCtrl', invoiceCtrl);

	invoiceCtrl.$inject = ['$scope', '$http', '$window', '$state'];

	function invoiceCtrl ($scope, $http, $window, $state) {
		$('.modal-backdrop.fade.in').css('display', 'none');

		$scope.logout = logout;

		function logout () {
			$window.localStorage.removeItem('token');
			$window.localStorage.removeItem('cart');
			$state.go('login');
		}
	}
}());