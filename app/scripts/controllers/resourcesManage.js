// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc function
 * @name sgaAdminApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('ResourcesManageCtrl', [
	'$scope', '$routeParams', '$location', 'modalManager', 'ResourcesApi',
	function($scope, $routeParams, $location, modalManager, ResourcesApi) {
		$scope.itemtype = $routeParams.itemtype;
		$scope.itemId = $routeParams.itemId;

		$scope.gameFound = true;
		$scope.gameName = '';

		$scope.items = [];
		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};
		$scope.init = function() {
			return ResourcesApi['games'].listResources($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.items = res.data;
				}
			});
		};
		ResourcesApi['games'].get($scope.itemId).then(function(res) {
			if (res.status === 200 && res.data != null) {
				$scope.gameFound = true;
				$scope.gameName = res.data.Name;
			} else {
				$scope.gameFound = false;
			}
		}).catch(function() {
			$scope.gameFound = false;
		});
		$scope.addResource = function() {
			return modalManager.open('createResource', {
				itemId: $scope.itemId
			});
		}
		$scope.back = function() {
			//go back to resources games list
			$location.path("/resources/" + $scope.itemId);
		};
		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
	}
]).controller('CreateResourceModalCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'ResourcesApi', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, ResourcesApi, modaldata) {
		$scope.item = {};
		$scope.item.gameId = modaldata.itemId;

		$scope.save = function() {
			return ResourcesApi['games'].createResource($scope.item).then(function() {
				$uibModalInstance.close();
				return $rootScope.$broadcast('savedItem');
			});
		};
		return $scope.close = function() {
			$rootScope.$broadcast('savedItem');
			return $uibModalInstance.close();
		};
	}
]);
