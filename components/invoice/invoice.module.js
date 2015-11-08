(function (){
	angular
		.module('invoice', ['auth'])
		.controller('invoiceCtrl', invoiceCtrl);

	invoiceCtrl.$inject = ['$scope', '$http', '$state', '$stateParams', 'authFactory'];

	function invoiceCtrl ($scope, $http, $state, $stateParams, authFactory) {
		$('.modal-backdrop.fade.in').css('display', 'none');

		if ($stateParams.items === 'true') {
			$scope.items = true;
		}
		console.log($scope.items);
		$scope.logout = logout;

		function logout () {
			authFactory.removeToken();
			$state.go('login');
		}
	}
}());