// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc function
 * @name sgaAdminApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('GamesProfileSkillsCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'SkillsApi',
	function($scope, $stateParams, $location, modalManager, SkillsApi) {
		$scope.itemtype = $stateParams.itemtype;
		$scope.itemId = $stateParams.itemId;

		$scope.gameFound = true;
		$scope.gameName = '';

		$scope.items = [];
		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};

		$scope.init = function() {
			if ($scope.itemId != "global")
			{
				SkillsApi['skills'].listSkills($scope.itemId).then(function(res) {
					if (res.status === 200 && res.data != null) {
						$scope.items = res.data['response'];
					}
				});
				SkillsApi['games'].get($scope.itemId).then(function(res) {
					if (res.status === 200 && res.data != null) {
						$scope.gameFound = true;
						$scope.gameName = res.data['response'].name;
					} else {
						$scope.gameFound = false;
					}
				}).catch(function() {
					$scope.gameFound = false;
				});
			}
			else
			{
				SkillsApi['skills'].globalSkills().then(function(res) {
					if (res.status === 200 && res.data != null) {
						$scope.items = res.data['response'];
					}
				});

				$scope.gameName = "Global";
				$scope.gameFound = true;
			}
		};

		
		$scope.range = function(min, max, step) {
			if ($scope.items == null)
				return 0;
			step = step || 1;
			min = 0;
			max = $scope.items.length - 1;
			var input = [];
			for (var i = min; i <= max; i += step) {
				input.push(i);
			}
			return input;
		};
		$scope.criteriaRange = function(index) {
			if ($scope.items == null)
				return 0;
			var step = 1;
			var min = 1;
			var max = $scope.items[index].evaluationCriterias.length;
			var input = [];
			for (var i = min; i <= max; i += step) {
				input.push(i);
			}
			return input;
		};
		$scope.addSkill = function(item) {
			$location.path("/skills/" + $scope.itemId + '/new')
		};
		$scope.back = function() {
			//go back to skills games list
			$location.path("/skills");
		};
		$scope.remove = function(item)
		{
			return modalManager.open('deleteSkill', {
				item: item,
				itemId: $scope.itemId
			});

		};
		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
	}
])