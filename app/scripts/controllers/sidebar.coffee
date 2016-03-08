'use strict'

###*
 # @ngdoc function
 # @name sgaAdminApp.controller:SidebarCtrl
 # @description
 # # SidebarCtrl
 # Controller of the sgaAdminApp
###
angular.module 'sgaAdminApp'
	.controller 'SidebarCtrl', ['$scope', '$location', 'listConfigs', ($scope, $location, listConfigs) ->

		$scope.isActive = (page) -> $location.path().indexOf("/list/#{page}") isnt -1

		$scope.pages = listConfigs

	]
