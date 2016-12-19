// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc function
 * @name sgaAdminApp.controller:AchievementCtrl
 * @description
 * # AchievementCtrl
 * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('GamesProfileNewAchievementCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'AchievementsApi',
	function($scope, $stateParams, $location, modalManager, AchievementsApi) {
		$scope.itemtype = $stateParams.itemtype;
		$scope.itemId = $stateParams.itemId;

		$scope.token = $stateParams.token;

		//determine if we are creating or editing an achievement
		$scope.isNew = $scope.token == null;

		$scope.gameFound = true;

		$scope.items = [];
		$scope.criterias = 1;

		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};

		//make sure that the id is valid to prevent bad data being sent, if not push back to achievemnt screen
		if ($scope.itemId != "global")
		{
			AchievementsApi['games'].get($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data != null) {

				} else {
					$location.path("/games/" + $scope.itemId + "/achievements");
				}
			}).catch(function() {
				$location.path("/games/" + $scope.itemId + "/achievements");
			});
		}
		$scope.init = function() {
			AchievementsApi['games'].list().then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.items = res.data['response'];
					$scope.range();
				}
			});
			if (!$scope.isNew)
			{
				// Find the achievement that we are editing
				AchievementsApi['achievements'].getByToken($scope.itemId, $scope.token).then(function(res){
					if (res.status === 200 && res.data['response'] != null)
					{
						$scope.item = [];
						var data = res.data['response'];
						$scope.item.Name = data.name;
						$scope.item.Description = data.description;
						$scope.item.ActorType = data.actorType;
						$scope.item.Token = data.token;

						$scope.criterias = data.evaluationCriterias.length

						$scope.item.evaluationCriterias = [];


						for (var i = 0; i < data.evaluationCriterias.length; i++) {
							var evaluationCriteria = [];
							evaluationCriteria.Key = data.evaluationCriterias[i].evaluationDataKey;
							evaluationCriteria.DataType = data.evaluationCriterias[i].evaluationDataType;
							evaluationCriteria.ComparisonType = data.evaluationCriterias[i].comparisonType;
							evaluationCriteria.Value = data.evaluationCriterias[i].value;

							$scope.item.evaluationCriterias.push(evaluationCriteria);
						}	

						$scope.item.Reward = {};

						$scope.item.Reward.Key = data.rewards[0].evaluationDataKey;
						$scope.item.Reward.DataType = data.rewards[0].evaluationDataType;
						$scope.item.Reward.Value = data.rewards[0].value;
					}
				})
			}
		};
		$scope.range = function(min, max, step) {
			step = step || 1;
			min = 0;
			max = $scope.criterias;
			var input = [];
			for (var i = min; i < max; i += step) {
				input.push(i);
			}
			return input;
		};
		$scope.addCriteria = function() {
			$scope.criterias++;
			return $scope.$broadcast("savedItem");
		}
		$scope.minusCriteria = function() {
			$scope.criterias--;
			return $scope.$broadcast("savedItem");
		}
		$scope.create = function() {

			var completeCriteria = "[";
			for (var i = 0; i < $scope.criterias; i++) {
				if (i != 0)
					completeCriteria += ", "
				completeCriteria += "{ " + "\"Key\": \"" + $scope.item.evaluationCriterias[i].Key + "\", \"DataType\": " + $scope.item.evaluationCriterias[i].DataType + ", \"ComparisonType\": " + $scope.item.evaluationCriterias[i].ComparisonType + ", \"Value\": \"" + $scope.item.evaluationCriterias[i].Value + "\" }";
			}
			completeCriteria += "]";

			$scope.achievement = {};
			$scope.achievement.gameId = $scope.itemId == "global" ? null : $scope.itemId;
			$scope.achievement.name = $scope.item.Name;
			$scope.achievement.description = $scope.item.Description;
			$scope.achievement.actorType = $scope.item.ActorType;
			$scope.achievement.token = $scope.item.Token;

			$scope.achievement.evaluationCriterias = [];
			for (var i = 0; i < $scope.criterias; i++) {
				$scope.achievement.evaluationCriterias[i] = {};
				$scope.achievement.evaluationCriterias[i].evaluationDataKey = $scope.item.evaluationCriterias[i].Key;
				$scope.achievement.evaluationCriterias[i].evaluationDataCategory = "GameData";
				$scope.achievement.evaluationCriterias[i].evaluationDataType = $scope.item.evaluationCriterias[i].DataType;
				$scope.achievement.evaluationCriterias[i].criteriaQueryType = "Any";
				$scope.achievement.evaluationCriterias[i].comparisonType = $scope.item.evaluationCriterias[i].ComparisonType;
				$scope.achievement.evaluationCriterias[i].scope = "Actor";
				$scope.achievement.evaluationCriterias[i].value = $scope.item.evaluationCriterias[i].Value;
			}
			$scope.achievement.rewards = [];
			$scope.achievement.rewards[0] = {};
			$scope.achievement.rewards[0].evaluationDataKey = $scope.item.Reward.Key;
			$scope.achievement.rewards[0].evaluationDataCategory = "GameData";
			$scope.achievement.rewards[0].evaluationDataType = $scope.item.Reward.DataType;
			$scope.achievement.rewards[0].value = $scope.item.Reward.Value;

			console.log($scope.achievement);

			// var f = document.getElementById('file').files[0];
			// var r =  new FileReader();
			// r.onloadend = function(e){
			//   var data = e.target.result;
			// }
			// r.readAsArrayBuffer(f);

			if ($scope.isNew)
			{
				AchievementsApi['achievements'].create($scope.achievement).then(function(res) {
					$location.path('/games/' + $scope.itemId + '/achievements');
				});
			}
			else
			{
				AchievementsApi['achievements'].update($scope.achievement).then(function(res) {
					$location.path('/games/' + $scope.itemId + '/achievements');
				});
			}
		};
		$scope.back = function() {
			//go back to list of achievements for this game
			$location.path('/games/' + $scope.itemId + '/achievements');
		};
		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
	}
]);
