(function () {
	angular
		.module('Slow2Arrive', ['ui.router', 'ui.bootstrap', 'httpInterceptorModule', 'login', 'inventory', 'invoice', 'signup', 'dashboard', 'profile', 'admin'])
		.config(['$httpProvider', httpConfig]);

		function httpConfig ($httpProvider) {
			$httpProvider.interceptors.push('interceptHttp');
		}
}());
