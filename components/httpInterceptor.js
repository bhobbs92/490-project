(function () {
	angular
		.module('httpInterceptorModule', [])
		.factory('interceptHttp', interceptHttp);

	interceptHttp.$inject = ['$window', '$location', 'authFactory'];

	function interceptHttp ($window, $location, authFactory) {
		var interceptFactory = {
			request: request,
			response: response
		};

		function request (config) {
			var token = $window.localStorage.getItem('token');

			if (token) {
				config.headers['Authorization'] = token;
			}

			return config;
		}

		function response (res) {
			console.warn(res);
			var data = res.data;

			if (data.success === false) {
				toastr.error(data.message);
				authFactory.removeToken();
				$location.path('/');
			}

			return res;
		}

		return interceptFactory;
	}
}());
