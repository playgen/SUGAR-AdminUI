'use strict'

###*
 # @ngdoc function
 # @name sgaAdminApp.controller:MainCtrl
 # @description
 # # MainCtrl
 # Controller of the sgaAdminApp
###
angular.module 'sgaAdminApp'
	.controller 'MainCtrl', ['config', 'Auth', (config, Auth) ->


		# console.log 'setting'
		# Auth.set config.tokens.session, 'jacktest'

	]
