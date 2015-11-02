(function () {
	angular
		.module('Slow2Arrive')
		.config(routeConfig);

	routeConfig.$inject = ['$locationProvider', '$urlRouterProvider', '$stateProvider'];

	function routeConfig ($locationProvider, $urlRouterProvider, $stateProvider) {
		$stateProvider
			.state('login', {
				url: '/',
				templateUrl: 'components/login/login.html',
				controller: 'loginCtrl'
			})

			.state('inventory', {
				url: '/inventory',
				templateUrl: 'components/inventory/inventory.html',
				controller: 'inventoryCtrl'
			});

		$urlRouterProvider.otherwise('/');
	}
}());