(function () {
	angular
		.module('dashboard', ['auth'])
		.controller('dashCtrl', dashCtrl);

	dashCtrl.$inject = ['$scope', '$http', '$state', 'authFactory'];

	function dashCtrl ($scope, $http, $state, authFactory) {
		var token = authFactory.getToken();

		if (!token) {
			$state.go('login');
			toastr.error('Please log in');
			return false;
		}

		$scope.logout = logout;
		

		function logout () {
			authFactory.removeToken();
			$state.go('login');
		}
	}
}());