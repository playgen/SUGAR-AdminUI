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

	$urlRouterProvider.when('/users/:itemId', '/users/:itemId/details');
	$urlRouterProvider.when('/games/:itemId', '/games/:itemId/details');
	$urlRouterProvider.when('/groups/:itemId', '/groups/:itemId/details');
	
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
			templateUrl: 'views/users/users.html',
			controller: 'UsersCtrl',
			login:true
		})
		.state('userProfile', {
			url: '/users/:itemId',
			abstract: true,
			templateUrl: 'views/users/usersProfile.html',
			controller: 'UsersProfileCtrl',
			login:true
		})	
		.state('userProfile.Details', {
			url: '/details',
			templateUrl: 'views/users/usersProfile.Details.html',
			controller: 'UsersProfileDetailsCtrl',
			login: true
		})	
		.state('userProfile.Data', {
			url: '/data',
			templateUrl: 'views/users/usersProfile.Data.html',
			controller: 'UsersProfileDataCtrl',
			login: true
		})	
		.state('userProfile.Friends', {
			url: '/friends',
			templateUrl: 'views/users/usersProfile.Friends.html',
			controller: 'UsersProfileFriendsCtrl',
			login: true
		})	
		.state('userProfile.Groups', {
			url: '/groups',
			templateUrl: 'views/users/usersProfile.Groups.html',
			controller: 'UsersProfileGroupsCtrl',
			login: true
		})

		//-------------------------------------------------------
		// Groups
		//-------------------------------------------------------

		.state('groups', {
			url: '/groups',
			templateUrl: 'views/groups/groups.html',
			controller: 'GroupsCtrl',
			login: true
		})
		.state('groupsProfile', {
			url: '/groups/:itemId',
			templateUrl: 'views/groups/groupsProfile.html',
			controller: 'GroupsProfileCtrl',
			login: true
		})
		.state('groupsProfile.Details', {
			url: '/details',
			templateUrl: 'views/groups/groupsProfile.Details.html',
			controller: 'GroupsProfileDetailsCtrl',
			login: true
		})
		.state('groupsProfile.Data', {
			url: '/data',
			templateUrl: 'views/groups/groupsProfile.Data.html',
			controller: 'GroupsProfileDataCtrl',
			login: true
		})
		.state('groupsProfile.Members', {
			url: '/members',
			templateUrl: 'views/groups/groupsProfile.Members.html',
			controller: 'GroupsProfileMembersCtrl',
			login: true
		})
		.state('groupsProfile.Roles', {
			url: '/roles',
			templateUrl: 'views/groups/groupsProfile.Roles.html',
			controller: 'GroupsProfileRolesCtrl',
			login: true
		})
		//-------------------------------------------------------
		// Games
		//-------------------------------------------------------

		.state('games', {
			url: '/games',
			templateUrl: 'views/games/games.html',
			controller: 'GamesCtrl',
			login: true
		})
		.state('gamesProfile', {
			url: '/games/:itemId',
			templateUrl: 'views/games/gamesProfile.html',
			controller: 'GamesProfileCtrl',
			login: true
		})
		.state('gamesProfile.Details', {
			url: '/details',
			templateUrl: 'views/games/gamesProfile.Details.html',
			controller: 'GamesProfileDetailsCtrl',
			login: true
		})
		.state('gamesProfile.Data', {
			url: '/data',
			templateUrl: 'views/games/gamesProfile.Data.html',
			controller: 'GamesProfileDataCtrl',
			login: true
		})
		.state('gamesProfile.Achievements', {
			url: '/achievements',
			templateUrl: 'views/games/gamesProfile.Achievements.html',
			controller: 'GamesProfileAchievementsCtrl',
			login: true
		})
		.state('gamesProfile.NewAchievement', {
			url: '/newAchievement',
			templateUrl: 'views/games/gamesProfile.NewAchievement.html',
			controller: 'GamesProfileNewAchievementCtrl',
			login: true
		})
		.state('gamesProfile.Skills', {
			url: '/skills',
			templateUrl: 'views/games/gamesProfile.Skills.html',
			controller: 'GamesProfileSkillsCtrl'
		})
		.state('gamesProfile.NewSkill', {
			url: '/newSkill',
			templateUrl: 'views/games/gamesProfile.NewSkill.html',
			controller: 'GamesProfileNewSkillCtrl',
			login: true
		})
		.state('gamesProfile.Resources', {
			url: '/resources',
			templateUrl: 'views/games/gamesProfile.resources.html',
			controller: 'GamesProfileResourcesCtrl',
			login: true
		})
		.state('gamesProfile.Leaderboards', {
			url: '/leaderboards',
			templateUrl: 'views/games/gamesProfile.Leaderboards.html',
			controller: 'GamesProfileLeaderboardsCtrl',
			login: true
		})
		.state('gamesProfile.newLeaderboard', {
			url: '/newLeaderboard',
			templateUrl: 'views/games/gamesProfile.NewLeaderboard.html',
			controller: 'GamesProfileNewLeaderboardCtrl',
			login: true
		})
		.state('gamesProfile.Roles', {
			url: '/roles',
			templateUrl: 'views/games/gamesProfile.Roles.html',
			controller: 'GamesProfileRolesCtrl',
			login: true
		})

		//-------------------------------------------------------
		// Roles
		//-------------------------------------------------------

		.state('roles', {
			url: '/roles',
			templateUrl: 'views/roles/roles.html',
			controller: 'RolesCtrl',
			login: true
		})
		.state('rolesProfile', {
			url: '/roles/:itemId',
			templateUrl: 'views/roles/rolesProfile.html',
			controller: 'RolesProfileCtrl',
			login: true
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
	'$rootScope', '$state', 'permissionService','ipCookie', 'Auth', 'config',
	function($rootScope, $state, permissionService, ipCookie, Auth, config) {
		return $rootScope.$on('$stateChangeStart', function(event, nextRoute, currentRoute) {
			if (!permissionService.hasUserPermissions() && ipCookie("userId") != null)
			{
				//permissions have not been set, but we have stored the user id in cookies, so get them again
				permissionService.get(ipCookie("userId"));
			}
			if ((nextRoute != null) && nextRoute.login && !Auth.isAuthenticated()) {

				// Go to the login page if not logged in and trying to view a page
				$state.transitionTo("login");
      			event.preventDefault(); 
			}
			if ((nextRoute != null) && nextRoute.name=='login' && Auth.isAuthenticated())
			{
				// if going to login page and is already authenticated
				$state.transitionTo("main");
      			event.preventDefault(); 
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
