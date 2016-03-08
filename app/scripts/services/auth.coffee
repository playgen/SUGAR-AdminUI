'use strict'

###*
 # @ngdoc service
 # @name sgaAdminApp.Auth
 # @description
 # # Auth
 # Service in the sgaAdminApp.
###
angular.module('sgaAdminApp')
	.factory 'Auth', ['ipCookie', 'config', (ipCookie, config) ->

		Auth =
			get: (key) ->
				token = ipCookie key
				if token? then token else false

			set: (key, value) ->
				ipCookie key, value,
					expires: 60 * 60 * 24, # 1 Day (seconds)
					expirationUnit: 'seconds'
					encode: (value) -> value

			remove: (key) ->
				ipCookie.remove key

			preApproved: false

			isAuthenticated: () ->
				if (not Auth.preApproved)
					token = ipCookie config.tokens.session
					Auth.preApproved = !!(token? and token.length)
				return Auth.preApproved

		Auth

	]
