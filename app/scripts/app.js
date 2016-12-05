// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc overview
 * @name sgaAdminApp
 * @description
 * # sgaAdminApp
 *
 * Main module of the application.
 */
var myApp = angular.module('sgaAdminApp', ['ui.router', 'ui.bootstrap', 'ngCookies', 'ipCookie']);

myApp.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider

		//-------------------------------------------------------
		// Main
		//-------------------------------------------------------

		.state('main', {
			url: '/',
			templateUrl: 'views/_main.html',
			controller: 'MainCtrl',
			login: true
		})

		//-------------------------------------------------------
		// Login
		//-------------------------------------------------------

		.state('login', {
			url: '/login',
			templateUrl: 'views/_login.html',
			controller: 'LoginCtrl',
			login: false
		})

		//-------------------------------------------------------
		// users
		//-------------------------------------------------------

		.state('users', {
			url: '/users',
			templateUrl: 'views/users.html',
			controller: 'UsersCtrl',
			login:true
		})
		.state('userProfile', {
			url: '/users/:itemId',
			templateUrl: 'views/usersProfile.html',
			controller: 'UsersProfileCtrl',
			login:true
		})	
		.state('userProfile.Details', {
			url: '/details',
			templateUrl: 'views/usersProfile.Details.html',
			controller: 'UsersProfileDetailsCtrl'
		})	
		.state('userProfile.Friends', {
			url: '/friends',
			templateUrl: 'views/usersProfile.Friends.html',
			controller: 'UsersProfileFriendsCtrl'
		})	
		.state('userProfile.Groups', {
			url: '/groups',
			templateUrl: 'views/usersProfile.Groups.html',
			controller: 'UsersProfileGroupsCtrl'
		})

		//-------------------------------------------------------
		// Groups
		//-------------------------------------------------------

		.state('groups', {
			url: '/groups',
			templateUrl: 'views/groups.html',
			controller: 'GroupsCtrl',
			login: true
		})
		.state('groupsProfile', {
			url: '/groups/:itemId',
			templateUrl: 'views/groupsProfile.html',
			controller: 'GroupsProfileCtrl',
			login: true
		})
		.state('groupsProfile.Details', {
			url: '/details',
			templateUrl: 'views/groupsProfile.Details.html',
			controller: 'GroupsProfileDetailsCtrl'
		})
		.state('groupsProfile.Members', {
			url: '/members',
			templateUrl: 'views/groupsProfile.Members.html',
			controller: 'GroupsProfileMembersCtrl'
		})

		//-------------------------------------------------------
		// Games
		//-------------------------------------------------------

		.state('games', {
			url: '/games',
			templateUrl: 'views/games.html',
			controller: 'GamesCtrl',
			login: true
		})
		.state('gamesProfile', {
			url: '/games/:itemId',
			templateUrl: 'views/gamesProfile.html',
			controller: 'GamesProfileCtrl',
			login: true
		})
		.state('gamesProfile.Details', {
			url: '/details',
			templateUrl: 'views/gamesProfile.Details.html',
			controller: 'GamesProfileDetailsCtrl'
		})
		.state('gamesProfile.Achievements', {
			url: '/achievements',
			templateUrl: 'views/gamesProfile.Achievements.html',
			controller: 'GamesProfileAchievementsCtrl'
		})
		.state('gamesProfile.NewAchievement', {
			url: '/newAchievement',
			templateUrl: 'views/gamesProfile.NewAchievement.html',
			controller: 'GamesProfileNewAchievementCtrl'
		})
		.state('gamesProfile.Skills', {
			url: '/skills',
			templateUrl: 'views/gamesProfile.Skills.html',
			controller: 'GamesProfileSkillsCtrl'
		})
		.state('gamesProfile.NewSkill', {
			url: '/newSkill',
			templateUrl: 'views/gamesProfile.NewSkill.html',
			controller: 'GamesProfileNewSkillCtrl'
		})
		.state('gamesProfile.Resources', {
			url: '/resources',
			templateUrl: 'views/gamesProfile.resources.html',
			controller: 'GamesProfileResourcesCtrl'
		})
		.state('gamesProfile.Leaderboards', {
			url: '/leaderboards',
			templateUrl: 'views/gamesProfile.Leaderboards.html',
			controller: 'GamesProfileLeaderboardsCtrl'
		})
		.state('gamesProfile.newLeaderboard', {
			url: '/newLeaderboard',
			templateUrl: 'views/gamesProfile.NewLeaderboard.html',
			controller: 'GamesProfileNewLeaderboardCtrl'
		});

	// }).when('/resources', {
	// 	templateUrl: 'views/resources.html',
	// 	controller: 'ResourcesCtrl',
	// 	login: true
	// }).when('/resources/:itemId', {
	// 	templateUrl: 'views/resourcesAll.html',
	// 	controller: 'ResourcesAllCtrl',
	// 	login: true
	// }).when('/resources/:itemId/manage', {
	// 	templateUrl: 'views/resourcesManage.html',
	// 	controller: 'ResourcesManageCtrl',
	// 	login: true
	// }).when('/resources/:itemId/actors', {
	// 	templateUrl: 'views/resourcesActors.html',
	// 	controller: 'ResourcesActorsCtrl',
	// 	login: true
	// }).when('/resources/:itemId/:actorType/:actorId', {
	// 	templateUrl: 'views/resourcesActorsManage.html',
	// 	controller: 'ResourcesActorsManageCtrl',
	// 	login: true

}).run([
	'$rootScope', '$location', 'Auth', 'config',
	function($rootScope, $location, Auth, config) {
		return $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
			if ((nextRoute != null) && nextRoute.login && !Auth.isAuthenticated()) {
				$location.search('return', $location.path());
				return $location.path('/login');
			}
		});
	}
]).constant('config', {
	api: {
		baseurl: window.location.hostname == 'localhost' ? 'http://localhost:62312/api' : 'https://api.sugarengine.org/api'
	},
	headers: {
		authorization: 'Authorization',
	},
	tokens: {
		authorization: 'SUGAR'
	}
});
