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
angular.module('sgaAdminApp', ['ngAria', 'ngCookies', 'ngMessages', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ipCookie', 'ui.bootstrap']).config(function($routeProvider) {
  return $routeProvider.when('/login', {
    templateUrl: 'views/_login.html',
    controller: 'LoginCtrl',
    login: false
  }).when('/', {
    templateUrl: 'views/_main.html',
    controller: 'MainCtrl',
    login: true
  }).when('/groups', {
    templateUrl: 'views/groups.html',
    controller: 'GroupsCtrl',
    login: true
  }).when('/groups/:itemId/members', {
    templateUrl: 'views/groupsMembers.html',
    controller: 'GroupsMembersCtrl',
    login: true
  }).when('/users', {
    templateUrl: 'views/users.html',
    controller: 'UsersCtrl',
    login: true
  }).when('/users/:itemId/friends', {
    templateUrl: 'views/usersFriends.html',
    controller: 'UsersFriendsCtrl',
    login: true
  }).when('/users/:itemId/groups', {
    templateUrl: 'views/usersGroups.html',
    controller: 'UsersGroupsCtrl',
    login: true
  }).when('/games', {
    templateUrl: 'views/games.html',
    controller: 'GamesCtrl',
    login: true
  }).when('/achievements', {
    templateUrl: 'views/achievement.html',
    controller: 'AchievementCtrl',
    login: true
  }).when('/achievements/:itemId', {
    templateUrl: 'views/achievementShow.html',
    controller: 'AchievementShowCtrl',
    login: true
  }).when('/achievements/:itemId/new', {
    templateUrl: 'views/achievementNew.html',
    controller: 'AchievementNewCtrl',
    login: true
  }).when('/resources', {
    templateUrl: 'views/resources.html',
    controller: 'ResourcesCtrl',
    login: true
  }).when('/resources/:itemId', {
    templateUrl: 'views/resourcesAll.html',
    controller: 'ResourcesAllCtrl',
    login: true
  }).when('/leaderboards', {
    templateUrl: 'views/leaderboards.html',
    controller: 'LeaderboardsCtrl',
    login: true
  }).when('/leaderboards/:itemId', {
    templateUrl: 'views/leaderboardsFilter.html',
    controller: 'LeaderboardsFilterCtrl',
    login: true
  }).when('/leaderboards/:itemId/:itemKey', {
    templateUrl: 'views/leaderboardsShow.html',
    controller: 'LeaderboardsShowCtrl',
    login: true
  }).when('/skills', {
    templateUrl: 'views/skills.html',
    controller: 'SkillsCtrl',
    login: true
  }).when('/skills/:itemId', {
    templateUrl: 'views/skillsAll.html',
    controller: 'SkillsAllCtrl',
    login: true
  }).when('/skills/:itemId/new', {
    templateUrl: 'views/skillsNew.html',
    controller: 'SkillsNewCtrl',
    login: true
  }).when('/list/:itemtype', {
    templateUrl: 'views/list.html',
    controller: 'ListCtrl',
    login: true
  }).when('/list/:itemtype/:itemid', {
    templateUrl: 'views/list.html',
    controller: 'ListCtrl',
    login: true
  }).otherwise({
    redirectTo: '/'
  });
}).run([
  '$rootScope', '$location', '$route', 'Auth', 'config', function($rootScope, $location, $route, Auth, config) {
    return $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ((nextRoute != null) && nextRoute.login && !Auth.isAuthenticated()) {
        $location.search('return', $location.path());
        return $location.path('/login');
      }
    });
  }
]).constant('config', {
  api: {
    baseurl: window.location.protocol === "https:" ? 'https://localhost:62312/api' : 'http://localhost:62312/api'
  },
  headers: {
    session: "X-Http-Session"
  },
  tokens: {
    session: "SGAAdmin-Session"
  }
});
