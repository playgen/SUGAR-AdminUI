'use strict'

###*
 # @ngdoc overview
 # @name sgaAdminApp
 # @description
 # # sgaAdminApp
 #
 # Main module of the application.
###
angular
	.module 'sgaAdminApp', [
		'ngAria'
		'ngCookies'
		'ngMessages'
		'ngResource'
		'ngRoute'
		'ngSanitize'
		'ngTouch'
		'ipCookie'
		'ui.bootstrap'
	]
	.config ($routeProvider) ->
		$routeProvider
			.when '/login',
				templateUrl: 'views/login.html'
				controller: 'LoginCtrl'
				login: false
			.when '/',
				templateUrl: 'views/main.html'
				controller: 'MainCtrl'
				login: true
			.when '/list/:itemtype',
				templateUrl: 'views/list.html'
				controller: 'ListCtrl'
				login: true
			.when '/list/:itemtype/:itemid',
				templateUrl: 'views/list.html'
				controller: 'ListCtrl'
				login: true
			.otherwise
				redirectTo: '/'
	.run ['$rootScope', '$location', '$route', 'Auth', 'config', ($rootScope, $location, $route, Auth, config) ->
		$rootScope.$on '$routeChangeStart', (event, nextRoute, currentRoute) ->
			if nextRoute? and nextRoute.login and not Auth.isAuthenticated()
				$location.search 'return', $location.path()
				$location.path '/login'
	]
	.constant 'config',
		api:
			baseurl: 'https://localhost:44363'
		headers:
			session: "X-Http-Session"
		tokens:
			session: "SGAAdmin-Session"


