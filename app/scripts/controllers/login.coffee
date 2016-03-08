'use strict'

###*
 # @ngdoc function
 # @name sgaAdminApp.controller:LoginCtrl
 # @description
 # # LoginCtrl
 # Controller of the sgaAdminApp
###
angular.module 'sgaAdminApp'
	.controller 'LoginCtrl', ['$scope', '$location', 'config', 'Auth', 'User', ($scope, $location, config, Auth, User) ->

		$scope.user =
			username: ''
			password: ''

		$scope.submit = () ->
			User.login $scope.user
				.then (res) ->

					if res?.status is 200 and res.data?.token?
						Auth.set config.tokens.session, res.data.token

						returnPath = $location.search().return
						if returnPath?
							$location.search 'return', null
							$location.path returnPath
						else
							$location.path '/'


	]
