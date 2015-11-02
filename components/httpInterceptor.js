(function () {
	angular
		.module('httpInterceptorModule', [])
		.factory('interceptHttp', interceptHttp);

	interceptHttp.$inject = ['$window', '$location'];

	function interceptHttp ($window, $location) {
		var interceptFactory = {
			request: request,
			responseError: responseError
		};

		function request (config) {
			var token = $window.localStorage.getItem('token');

			if (token)
				config.headers['Authorization'] = token;

			return config;
		}

		function responseError (res) {
			if (res.status == 401 || res.status == 403) {
				authFactory.removeToken();
				$location.path('/login');
			}
		}

		return interceptFactory;
	}
}());