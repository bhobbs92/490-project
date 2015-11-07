(function () {
	angular
		.module('auth', [])
		.factory('authFactory', authFactory);

	authFactory.$inject = ['$window'];

	function authFactory ($window) {
		var factory = {
			getToken: getToken,
			setToken: setToken,
			removeToken: removeToken
		};

		function getToken () {
			return $window.localStorage.getItem('token');
		}

		function setToken (token) {
			if (!token)
				throw new Error('No token provided, cannot set');

			$window.localStorage.setItem('token', token);
		}

		function removeToken () {
			return $window.localStorage.removeItem('token');
		}

		return factory;
	}
}());