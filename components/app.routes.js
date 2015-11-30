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

			.state('dashboard', {
				url: '/dashboard',
				templateUrl: 'components/dashboard/dashboard.html',
				controller: 'dashCtrl'
			})

			.state('signup', {
				url: '/signup',
				templateUrl: 'components/signup/signup.html',
				controller: 'signupCtrl'
			})

			.state('profile', {
				url: '/profile',
				templateUrl: 'components/profile/profile.html',
				controller: 'profileCtrl'
			})

			.state('inventory', {
				url: '/inventory',
				templateUrl: 'components/inventory/inventory.html',
				controller: 'inventoryCtrl'
			})

			.state('invoice', {
				url: '/invoice/:items',
				templateUrl: 'components/invoice/invoice.html',
				controller: 'invoiceCtrl'
			})

			.state('manage-customers', {
				url: '/manage-customers',
				templateUrl: 'components/admin/customers/manage-customers.html',
				controller: 'manageCustomersCtrl'
			})

			.state('manage-inventory', {
				url: '/manage-inventory',
				templateUrl: 'components/admin/inventory/manage-inventory.html',
				controller: 'manageInventoryCtrl'
			})

			;

		$urlRouterProvider.otherwise('/');
	}
}());
