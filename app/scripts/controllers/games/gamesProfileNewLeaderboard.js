// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc function
 * @name sgaAdminApp.controller:AchievementCtrl
 * @description
 * # AchievementCtrl
 * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('GamesProfileNewLeaderboardCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'LeaderboardsApi',
	function($scope, $stateParams, $location, modalManager, LeaderboardsApi) {
		$scope.itemId = $stateParams.itemId;
		$scope.item = {};

		$scope.token = $stateParams.token;

		//determine if we are creating or editing an achievement
		$scope.isNew = $scope.token == null;

		$scope.gameFound = true;

		$scope.criterias = 1;

		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};

		$scope.buttonText = "Create";

		$scope.init = function() {
			if (!$scope.isNew)
			{
				$scope.buttonText = "Update";
				// Find the achievement that we are editing
				LeaderboardsApi['leaderboard'].getByToken($scope.itemId, $scope.token).then(function(res){
					if (res.status === 200 && res.data['response'] != null)
					{
						$scope.item = [];
						var data = res.data['response'];
						$scope.item.Name = data.name;
						$scope.item.token = data.token;
						$scope.item.Key = data.key;
						$scope.item.Token = data.token;

						$scope.item.ActorType = $scope.getActorType(data.actorType);
						$scope.item.EvaluationDataType = $scope.getEvaluationDataType(data.evaluationDataType);
						$scope.item.CriteriaScope = data.criteriaScope;
						$scope.item.LeaderboardType = $scope.getLeaderboardType(data.leaderboardType);
					}
				})
			}
		}
		$scope.getActorType = function(type) {
			switch(type) 
			{
				case 'Any':
					return "0";
				case 'User':
					return "1";
				case 'Group':
					return "2";
				default:
					return "";
			}
		};
		$scope.getEvaluationDataType = function(type) {
			switch(type) 
			{
				case 'String':
					return "0";
				case 'Long':
					return "1";
				case 'Float':
					return "2";
				case 'Bool':
					return "3";
				default:
					return "";
			}
		};
		$scope.getLeaderboardType = function(type) {
			switch(type) 
			{
				case 'Highest':
					return "0";
				case 'Lowest':
					return "1";
				case 'Cumulative':
					return "2";
				case 'Count':
					return "3";
				case 'Earliest':
					return "4";
				case 'Latest':
					return "5";
				default:
					return "";
			}
		};
		$scope.create = function() {
			$scope.item.GameId = parseInt($scope.itemId);
			if ($scope.isNew)
			{
				return LeaderboardsApi['leaderboard'].createFilter($scope.item).then(function() {
					$location.path('/games/' + $scope.itemId + '/leaderboards');
				});
			}
			else
			{
				return LeaderboardsApi['leaderboard'].updateFilter($scope.item).then(function() {
					$location.path('/games/' + $scope.itemId + '/leaderboards');
				});
			}
		};
		$scope.back = function() {
			//go back to list of achievements for this game
			$location.path('/games/' + $scope.itemId + '/leaderboards');
		};
		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
	}
]);
