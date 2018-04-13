'use strict';

angular.module('sgaAdminApp')
	.config(function($httpProvider) {
	    //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;
      return $httpProvider.interceptors.push("RequestInterceptor");
	})
	.factory('RequestInterceptor', [
		'$q',
		'$location',
		'$controller',
		'ErrorService',
		'config',
		'Auth',
		function($q, $location, $controller, ErrorService, config, Auth) {
			return {
				'request': function(reqConfig) {
					if (reqConfig.url.search(config.api.baseurl) !== -1) {
						Object.keys(config.headers).forEach(function(id) {
							var cookie;
							cookie = Auth.get(config.tokens[id]);
							if (cookie != null) {
								return reqConfig.headers[config.headers[id]] = cookie;
							}
						});
					}
					return reqConfig || $q.when(reqConfig);
				},
				'response': function(response) {
					var authHeader = response.headers()["authorization"];
					if (authHeader != undefined) {
						Auth.set(config.tokens.authorization, authHeader);
					}
					return response || $q.when(response);
				},
				'responseError': function(rejection) {
					// ensure that the modal controller is activated
          var controller = $controller("myController");
					var error = {code: rejection.status, message: rejection.statusText, otherInfo: rejection.data};

          ErrorService.show(error);

					if (rejection.config.url.search(config.api.baseurl) !== -1) {
						if (rejection.status === 401) {
							$location.search('return', $location.path());
							$location.path('/login');
						}
					}
					return $q.reject(rejection);
				}
			};
		}
	]);
