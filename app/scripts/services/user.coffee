'use strict'

###*
 # @ngdoc service
 # @name sgaAdminApp.User
 # @description
 # # User
 # Service in the sgaAdminApp.
###
angular.module('sgaAdminApp')
	.factory 'User', ['$http', 'config', ($http, config) ->

		login: (params) ->
			$http.post config.api.baseurl + '/api/sessions', params

	]
