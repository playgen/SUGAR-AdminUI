'use strict';

angular.module('sgaAdminApp').controller('GamesProfileCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'GamesApi',
	function($scope, $stateParams, $location, modalManager, GamesApi) {
		$scope.itemtype = $stateParams.itemtype;
		$scope.itemId = $stateParams.itemId;

		$scope.gameName = '';
		$scope.gameFound = true;

		$scope.items = [];
		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};

		$scope.init = function() {
			GamesApi['games'].get($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.gameName = res.data['response'].name;
				} else {
					$scope.gameFound = false;
				}
			}).catch(function() {
				$scope.gameFound = false;
			});
		};

		$scope["delete"] = function(item) {
			return modalManager.open('deleteGame', {
				gameName: $scope.gameName,
				itemId: $scope.itemId
			});
		};

		$scope["addNewAchievement"] = function(item) {
			$location.path('/games/' + $scope.itemId + '/newAchievement');
		};



		$scope.back = function() {
			//go back to group list
			$location.path("/games");
		};

		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});

	}
]).controller('ConfirmDeleteGameModalCtrl', [
	'$scope', '$rootScope', '$location', '$uibModalInstance', 'GamesApi', 'modaldata',
	function($scope, $rootScope, $location, $uibModalInstance, GamesApi, modaldata) {
		$scope.gameName = modaldata.gameName;
		$scope.itemId = modaldata.itemId;

		if (modaldata.item != null) {
			$scope.item = modaldata.item;
		} else if (modaldata.itemid != null) {
			$scope.item = {};
			GamesApi['games'].get(modaldata.itemid).then(function(data) {
				return console.log(data);
			});
		}
		$scope["delete"] = function() {
			return GamesApi['games']["delete"]($scope.itemId).then(function() {
				$uibModalInstance.close();
				$location.path("/games");
			});
		};
		return $scope.closeModal = function() {
			return $uibModalInstance.close();
		};
	}
]).controller('ConfirmDeleteAchievementModalCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'AchievementsApi', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, AchievementsApi, modaldata) {

		$scope.item = modaldata.item;
		$scope.itemId = modaldata.itemId;

		if (modaldata.item != null) {
			$scope.item = modaldata.item;
		} else if (modaldata.itemid != null) {
			$scope.item = {};
			usersApi[$scope.itemtype].get(modaldata.itemid).then(function(data) {
				return console.log(data);
			});
		}
		$scope["delete"] = function() {
			if ($scope.itemId != "global")
			{
				AchievementsApi['achievements'].delete($scope.item.token, $scope.itemId).then(function(res) {
					$uibModalInstance.close();
					return $rootScope.$broadcast('savedItem');
				});
			}
			else
			{
				AchievementsApi['achievements'].deleteGlobal($scope.item.token).then(function(res) {
					$uibModalInstance.close();
					return $rootScope.$broadcast('savedItem');
				});
			}
		};
		return $scope.closeModal = function() {
			return $uibModalInstance.close();
		};
	}
]);


