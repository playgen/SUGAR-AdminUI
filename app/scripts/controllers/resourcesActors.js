// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc function
 * @name sgaAdminApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('ResourcesActorsCtrl', [
	'$scope', '$routeParams', '$location', 'modalManager', 'ResourcesApi',
	function($scope, $routeParams, $location, modalManager, ResourcesApi) {
		$scope.itemtype = $routeParams.itemtype;
		$scope.itemId = $routeParams.itemId;

		$scope.gameFound = true;
		$scope.gameName = '';

		$scope.ActorType = "User"
		$scope.AltActor = "Group"

		$scope.items = [];
		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};
		$scope.init = function() {
			//TODO: get list for current Actor Type
			return ResourcesApi[$scope.ActorType].list().then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.items = res.data;
				}
			});
		};
		ResourcesApi['games'].get($scope.itemId).then(function(res) {
			if (res.status === 200 && res.data != null) {
				$scope.gameFound = true;
				$scope.gameName = res.data.name;
			} else {
				$scope.gameFound = false;
			}
		}).catch(function() {
			$scope.gameFound = false;
		});
		$scope.changeActor = function() {
			var temp = $scope.AltActor;
			$scope.AltActor = $scope.ActorType;
			$scope.ActorType = temp;
			$scope.init();
		};
		$scope.back = function() {
			//go back to resources games list
			$location.path("/resources/" + $scope.itemId);
		};
		$scope.showResources = function(item) {
			$location.path("/resources/" + $scope.itemId + "/" + $scope.ActorType + "/" + item.id);
		}
		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
	}
]);
