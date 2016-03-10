'use strict'

###*
 # @ngdoc service
 # @name sgaAdminApp.RequestInterceptor
 # @description
 # # RequestInterceptor
 # Service in the sgaAdminApp.
###
angular.module 'sgaAdminApp'
	.config ['$httpProvider', ($httpProvider) ->
		$httpProvider.interceptors.push "RequestInterceptor"
	]

	.factory 'RequestInterceptor', ['$q', '$location', 'config', 'Auth', ($q, $location, config, Auth) ->
		'request': (reqConfig) ->
			if reqConfig.url.search(config.api.baseurl) isnt -1
				Object.keys(config.headers).forEach (id) ->
					cookie = Auth.get config.tokens[id]
					if cookie? then reqConfig.headers[config.headers[id]] = cookie     
			reqConfig || $q.when reqConfig
		'responseError': (rejection) ->
			if rejection.config.url.search(config.api.baseurl) isnt -1
				if rejection.status is 401 # Unauthorized
					$location.search 'return', $location.path()
					$location.path '/login'
			return $q.reject rejection
	]
