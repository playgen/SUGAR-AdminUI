'use strict'

###*
 # @ngdoc service
 # @name sgaAdminApp.Api
 # @description
 # # Api
 # Service in the sgaAdminApp.
###
angular.module 'sgaAdminApp'
	.service 'Api', ['$http', 'config', ($http, config) ->

		'users':
			list: () ->           $http.get config.api.baseurl + '/users'
			get: (id) ->          $http.get config.api.baseurl + "/users/#{id}"
			create: (item) ->     $http.post config.api.baseurl + '/users', item
			update: (id, item) -> $http.put config.api.baseurl + "/users/#{id}", item
			delete: (id) ->       $http.delete config.api.baseurl + "/users/#{id}"

		'matches':
			list: () ->           $http.get config.api.baseurl + '/matches'
			get: (id) ->          $http.get config.api.baseurl + "/matches/#{id}"
			create: (item) ->     $http.post config.api.baseurl + '/matches', item
			update: (id, item) -> $http.put config.api.baseurl + "/matches/#{id}", item
			delete: (id) ->       $http.delete config.api.baseurl + "/matches/#{id}"

	]
