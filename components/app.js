(function () {
	angular
		.module('Slow2Arrive', ['ui.router', 'httpInterceptorModule', 'login', 'inventory'])
		.config(['$httpProvider', httpConfig]);

		function httpConfig ($httpProvider) {
			$httpProvider.interceptors.push('interceptHttp');
		}
}());