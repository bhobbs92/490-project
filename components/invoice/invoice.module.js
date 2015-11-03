(function (){
	angular
		.module('invoice', [])
		.controller('invoiceCtrl', invoiceCtrl);

	invoiceCtrl.$inject = ['$scope', '$http'];

	function invoiceCtrl ($scope, $http) {
		$('.modal-backdrop.fade.in').css('display', 'none');
	}
}());