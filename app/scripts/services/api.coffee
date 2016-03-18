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
			list: () ->           $http.get config.api.baseurl + '/players'
			get: (id) ->          $http.get config.api.baseurl + "/players/#{id}"
			create: (item) ->     $http.post config.api.baseurl + '/players', item
			update: (id, item) -> $http.put config.api.baseurl + "/players/#{id}", item
			delete: (id) ->       $http.delete config.api.baseurl + "/players/#{id}"

		'matches':
			list: () ->           $http.get config.api.baseurl + '/matches'
			get: (id) ->          $http.get config.api.baseurl + "/matches/#{id}"
			create: (item) ->     $http.post config.api.baseurl + '/matches', item
			update: (id, item) -> $http.put config.api.baseurl + "/matches/#{id}", item
			delete: (id) ->       $http.delete config.api.baseurl + "/matches/#{id}"

		'activities':
			list: () ->           $http.get config.api.baseurl + '/activities'
			get: (id) ->          $http.get config.api.baseurl + "/activities/#{id}"
			create: (item) ->     $http.post config.api.baseurl + '/activities', item
			update: (id, item) -> $http.put config.api.baseurl + "/activities/#{id}", item
			delete: (id) ->       $http.delete config.api.baseurl + "/activities/#{id}"
			dropdown: () ->		  $http.get config.api.baseurl + '/activities/dropdown'

		'goals':
			list: () ->           $http.get config.api.baseurl + '/goals'
			get: (id) ->          $http.get config.api.baseurl + "/goals/#{id}"
			create: (item) ->     $http.post config.api.baseurl + '/goals', item
			update: (id, item) -> $http.put config.api.baseurl + "/goals/#{id}", item
			delete: (id) ->       $http.delete config.api.baseurl + "/goals/#{id}"

	]
