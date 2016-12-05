// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc function
 * @name sgaAdminApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('GamesProfileLeaderboardsCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'LeaderboardsApi',
	function($scope, $stateParams, $location, modalManager, LeaderboardsApi) {
		$scope.itemId = $stateParams.itemId;


		$scope.items = [];
		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};
		$scope.init = function() {

			// Get a list of leaderboards for this game
			LeaderboardsApi['leaderboard'].list($scope.itemId).then(function(res){
				if (res.status === 200 && res.data['response'] != null)
				{
					$scope.items = res.data['response'];
				}
			});

			// if ($scope.itemId != "global")
			// {
			// 	LeaderboardsApi['leaderboard'].getConfig($scope.itemToken, $scope.itemId).then(function(res){
			// 		if (res.status === 200 && res.data != null)
			// 		{
			// 			return LeaderboardsApi['leaderboard'].getLeaderboard(res.data).then(function(res) {
			// 				if (res.status === 200 && res.data != null) {
			// 					$scope.items = res.data['response'];
			// 				}
			// 			});
			// 		}
			// 	});
			// 	LeaderboardsApi['games'].get($scope.itemId).then(function(res) {
			// 		if (res.status === 200 && res.data != null) {
			// 			$scope.leaderboardFound = true;
			// 			$scope.leaderboardToken = res.data.Token;
			// 		} else {
			// 			$scope.leaderboardFound = false;
			// 		}
			// 	}).catch(function() {
			// 		$scope.leaderboardFound = false;
			// 	});
			// }
			// else
			// {
			// 	LeaderboardsApi['leaderboard'].getGlobalConfig($scope.itemId).then(function(res){
			// 		if (res.status === 200 && res.data != null)
			// 		{
			// 			LeaderboardsApi['leaderboard'].getLeaderboard(res.data).then(function(res) {
			// 				if (res.status === 200 && res.data != null) {
			// 					$scope.items = res.data['response'];
			// 				}
			// 			});
			// 		}
			// 	});

			// 	$scope.leaderboardFound = true;
			// 	$scope.leaderboardName = "Global";
			// }
		};
		
		$scope.addNew = function() {
			$location.path("/games/" + $scope.itemId + '/newLeaderboard');
		};

		$scope.remove = function(item) {
			return modalManager.open('deleteLeaderboard', {
				item: item,
				itemId: $scope.itemId
			});
		};

		$scope.view = function(item){
			return modalManager.open('viewLeaderboard', {
				name: item.Token,
				itemId: $scope.itemId
			})
		}

		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
	}
]).controller('ViewLeaderboardModalCtrl', [
	'$scope', '$rootScope', '$location', '$uibModalInstance', 'LeaderboardsApi', 'modaldata',
	function($scope, $rootScope, $location, $uibModalInstance, LeaderboardsApi, modaldata) {
		$scope.name = modaldata.gameName;
		$scope.itemId = modaldata.itemId;

		LeaderboardsApi['leaderboard'].getGlobalConfig($scope.itemId).then(function(res){
			if (res.status === 200 && res.data != null)
			{
				LeaderboardsApi['leaderboard'].getLeaderboard(res.data).then(function(res) {
					if (res.status === 200 && res.data != null) {
						$scope.items = res.data['response'];
					}
				});
			}
		});
		return $scope.closeModal = function() {
			return $uibModalInstance.close();
		};
	}
]);