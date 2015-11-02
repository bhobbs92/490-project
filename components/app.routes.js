(function () {
	angular
		.module('Slow2Arrive')
		.config(routeConfig);

	routeConfig.$inject = ['$locationProvider', '$urlRouterProvider', '$stateProvider'];

	function routeConfig ($locationProvider, $urlRouterProvider, $stateProvider) {
		$stateProvider.state('login', {
			url: '/',
			templateUrl: 'components/login/login.html',
			controller: 'loginCtrl'
		});

		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
	}
}());