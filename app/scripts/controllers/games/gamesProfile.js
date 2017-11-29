'use strict';

angular.module('sgaAdminApp').controller('GamesProfileCtrl', [
	'$scope', '$stateParams', '$location', 'permissionService', 'modalManager', 'GamesApi',
	function($scope, $stateParams, $location, permissionService, modalManager, GamesApi) {
		$scope.itemtype = $stateParams.itemtype;
		$scope.itemId = $stateParams.itemId;

		$scope.permissionService = permissionService;

		$scope.hasDeletePermission;
		$scope.hasEditPermission;

		$scope.hasGetAchievementPermission;
		$scope.hasCreateAchievementPermission;
		$scope.hasUpdateAchievementPermission;
		$scope.hasDeleteAchievementPermission;

		$scope.hasGetSkillPermission;
		$scope.hasCreateSkillPermission;
		$scope.hasEditSkillPermission;
		$scope.hasDeleteSkillPermission;

		$scope.hasGetResourcePermission;
		$scope.hasCreateResourcePermission;
		$scope.hasEditResourcePermission;
		$scope.hasDeleteResourcePermission;

		$scope.hasGetLeaderboardPermission;
		$scope.hasCreateLeaderboardPermission;
		$scope.hasEditLeaderboardPermission;
		$scope.hasDeleteLeaderboardPermission;

		$scope.hasCreateRolePermission;

		$scope.hasGetGameDataPermission;
		$scope.hasCreateGameDataPermission;

		$scope.hasGetGameDetailsPermission;
		$scope.hasCreateGameDetailsPermission;

		$scope.gameName = '';
		$scope.gameFound = true;

		$scope.items = [];
		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};

		$scope.init = function() {
			// our permissions
			$scope.hasDeletePermission = permissionService.hasAccessToClaim('Delete-Game', $scope.itemId);

			$scope.hasGetAchievementPermission = permissionService.hasAccessToClaim('Get-Achievement', $scope.itemId);
			$scope.hasCreateAchievementPermission = permissionService.hasAccessToClaim('Create-Achievement', $scope.itemId);
			$scope.hasUpdateAchievementPermission = permissionService.hasAccessToClaim('Update-Achievement', $scope.itemId);
			$scope.hasDeleteAchievementPermission = permissionService.hasAccessToClaim('Delete-Achievement', $scope.itemId);

			$scope.hasGetSkillPermission = $scope.hasGetAchievementPermission;
			$scope.hasCreateSkillPermission = $scope.hasCreateAchievementPermission;
			$scope.hasUpdateSkillPermission = $scope.hasUpdateAchievementPermission;
			$scope.hasDeleteSkillPermission = $scope.hasDeleteAchievementPermission;

			$scope.hasGetResourcePermission = true;
			$scope.hasCreateResourcePermission = permissionService.hasAccessToClaim('Create-Resource', $scope.itemId);
			$scope.hasUpdateResourcePermission = permissionService.hasAccessToClaim('Update-Resource', $scope.itemId);
			$scope.hasDeleteResourcePermission = permissionService.hasAccessToClaim('Delete-Resource', $scope.itemId);

			$scope.hasGetLeaderboardPermission = true;
			$scope.hasCreateLeaderboardPermission = permissionService.hasAccessToClaim('Create-Leaderboard', $scope.itemId);
			$scope.hasUpdateLeaderboardPermission = permissionService.hasAccessToClaim('Update-Leaderboard', $scope.itemId);
			$scope.hasDeleteLeaderboardPermission = permissionService.hasAccessToClaim('Delete-Leaderboard', $scope.itemId);

			$scope.hasCreateRolePermission = permissionService.hasAccessToClaim('Create-Role', $scope.itemid);

			$scope.hasGetGameDataPermission = permissionService.hasAccessToClaim('Get-GameData', $scope.itemId);
			$scope.hasCreateGameDataPermission = permissionService.hasAccessToClaim('Create-GameData', $scope.itemId);

			$scope.hasGetGameDetailsPermission = permissionService.hasAccessToClaim('Get-GameDetail', $scope.itemId);
			$scope.hasCreateGameDetailsPermission = permissionService.hasAccessToClaim('Create-GameDetail', $scope.itemid);


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

		$scope["addNewAchievement"] = function() {
			$location.path('/games/' + $scope.itemId + '/newAchievement');
		};

		$scope["editAchievement"] = function(item) {
			$location.path('/games/' + $scope.itemId + '/editAchievement/' + item.token);
		}

		$scope["addNewSkill"] = function() {
			$location.path('/games/' + $scope.itemId + '/newSkill');
		};

		$scope["editSkill"] = function(item) {
			$location.path('/games/' + $scope.itemId + '/editSkill/' + item.token);
		};

		$scope["editLeaderboard"] = function(item) {
			$location.path('/games/' + $scope.itemId + '/editLeaderboard/' + item.token);
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
		$scope.name = modaldata.gameName;
		$scope.type = "game"

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
			return GamesApi['games']["delete"]($scope.itemId).then(function(res) {
				$uibModalInstance.close();
				if (res.status === 200)
				{
					$location.path("/games");
				}
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

		$scope.name = $scope.item.token;
		$scope.type = "achievement";

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
]).controller('ConfirmDeleteSkillModalCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'SkillsApi', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, SkillsApi, modaldata) {

		$scope.item = modaldata.item;
		$scope.itemId = modaldata.itemId;

		$scope.name = $scope.item.token;
		$scope.type = "skill";

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
				SkillsApi['skills']["delete"]($scope.item.token, $scope.itemId).then(function(){
					$uibModalInstance.close();
					return $rootScope.$broadcast('savedItem');
				});
			}
			else
			{
				SkillsApi['skills']["deleteGlobal"]($scope.item.token).then(function(){
					$uibModalInstance.close();
					return $rootScope.$broadcast('savedItem');
				});
			}
		};
		return $scope.closeModal = function() {
			return $uibModalInstance.close();
		};
	}
]).controller('ConfirmDeleteLeaderboardModalCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'LeaderboardsApi', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, LeaderboardsApi, modaldata) {

		$scope.item = modaldata.item;
		$scope.itemId = modaldata.itemId;

		$scope.name = $scope.item.token;
		$scope.type = "leaderboard";

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
				return LeaderboardsApi['leaderboard'].delete($scope.item.token, $scope.itemId).then(function(res) {
					$uibModalInstance.close();
					return $rootScope.$broadcast('savedItem');
				});
			}
			else
			{
				return LeaderboardsApi['leaderboard'].deleteGlobal($scope.item.token).then(function(res) {
					$uibModalInstance.close();
					return $rootScope.$broadcast('savedItem');
				});
			}
		};
		return $scope.closeModal = function() {
			return $uibModalInstance.close();
		};
	}
]).controller('AddRoleModalCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'UsersApi', 'RolesApi', 'modalManager', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, UsersApi, RolesApi, modalManager, modaldata) {
		$scope.gameId = modaldata.gameId;
		$scope.roleId = modaldata.roleId;

		$scope.exists = true;

		//our buttons
		$scope.closeModal = function() {
			$scope.exists = true;
			$uibModalInstance.close();
		};
		$scope.add = function(item) {
			UsersApi['users'].get($scope.txtBox)

			.then(function(res) {
				if (res.data['response'][0] != null) {
					//put the data backwards for testing as groups cannot request users join
					var userRole = "{ ActorId: " + res.data['response'][0].id + ", roleId: " + $scope.roleId + ", EntityId: " + $scope.gameId + " }"
					RolesApi['updateRoles'].CreateActorRole(userRole)

					.then(function(res) {
						$uibModalInstance.close();
						$rootScope.$broadcast('UpdatedRoles')
					});
				} else
					$scope.exists = false;
			});
		};
	}
]);


