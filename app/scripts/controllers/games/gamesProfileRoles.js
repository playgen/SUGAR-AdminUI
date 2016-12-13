angular.module('sgaAdminApp').controller('GamesProfileRolesCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'RolesApi',
	function($scope, $stateParams, $location, modalManager, RolesApi) {

		$scope.roles = [];
		$scope.items = [];

		$scope.role = null;

		$scope.isViewingRole = false;
		$scope.init = function() {

			RolesApi['roles'].listScope("game").then(function(res) {
				if (res.status === 200 && res.data['response'] != null) {
					$scope.roles = res.data['response'];
				}
			});

		};
		$scope.showUsersWithRole = function(role) {
			if ($scope.isViewingRole)
			{
				$scope.close();
			}
			else
			{
				$scope.role = role;
				RolesApi['roles'].getActorsForRole(role.id, $scope.itemId).then(function(res){
					if (res.status === 200 && res.data['response'] != null)
					{
						$scope.items = res.data['response'];
						$scope.isViewingRole = true;
					}
				});
			}
		};
		$scope.close = function() {
			$scope.isViewingRole = false;
			$scope.items = [];
		};
		$scope.addUser = function(role) {
			return modalManager.open('addUserRole', {
				gameId: $scope.itemId,
				roleId: $scope.role.id
			});
		};
		$scope.remove = function(item) {
			var userRole = "{ ActorId: " + item.id + ", roleId: " + $scope.roleId + ", EntityId: " + $scope.itemId + " }"
			RolesApi['updateRoles']["delete"](item.id, $scope.itemId, $scope.roleId).then(function(res){
				$scope.showUsersWithRole($scope.role);
			})

		};
		return $scope.$on('UpdatedRoles', function(event, args) {
			return $scope.showUsersWithRole($scope.role);
		});
	}
]);