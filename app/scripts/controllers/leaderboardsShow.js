// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc function
 * @name sgaAdminApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('LeaderboardsShowCtrl', [
	'$scope', '$routeParams', '$location', 'modalManager', 'LeaderboardsApi',
	function($scope, $routeParams, $location, modalManager, LeaderboardsApi) {
		$scope.itemToken = $routeParams.itemToken;
		$scope.itemId = $routeParams.itemId;

		$scope.leaderboardToken = true;
		$scope.leaderboardName = '';

		$scope.items = [];
		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};
		$scope.init = function() {
			LeaderboardsApi['leaderboard'].getConfig($scope.itemToken, $scope.itemId).then(function(res){
				if (res.status === 200 && res.data != null)
				{
					return LeaderboardsApi['leaderboard'].getLeaderboard(res.data).then(function(res) {
						if (res.status === 200 && res.data != null) {
							$scope.items = res.data;
						}
					});
				}
			});
		};
		LeaderboardsApi['games'].get($scope.itemId).then(function(res) {
			if (res.status === 200 && res.data != null) {
				$scope.leaderboardFound = true;
				$scope.leaderboardToken = res.data.Token;
			} else {
				$scope.leaderboardFound = false;
			}
		}).catch(function() {
			$scope.leaderboardFound = false;
		});
		$scope.addFilter = function(item) {
			return modalManager.open('newLeaderboard', {});
		};

		$scope.apply = function(item) {
			$scope.filter = item;
			$scope.filter.GameID = $scope.itemId;
			LeaderboardsApi['leaderboard'].list($scope.itemId).then(function(res) {
				//change the $scope.items for population of the leaderboard list
				if (res.status === 200 && res.data != null) {
					$scope.items = res.data;
				}
			});
		};
		$scope.back = function() {
			//go back to resources games list
			$location.path("/leaderboards/" + $scope.itemId);
		};
		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
	}
]);
