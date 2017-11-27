'use strict';

angular.module('sgaAdminApp').controller('RolesProfileCtrl', [
	'$scope', '$stateParams', '$location', 'permissionService', 'modalManager', 'RolesApi',
	function($scope, $stateParams, $location, permissionService, modalManager, RolesApi) {
		$scope.itemId = $stateParams.itemId;

		$scope.roleFound = true;

		$scope.permissionService = permissionService;
		$scope.hasGetListPermission;

		$scope.roleName = '';

		$scope.items = [];

		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};
		$scope.init = function() {
			$scope.hasGetListPermission = permissionService.hasAccessToClaim('Get-RoleClaim', $scope.itemId);

			RolesApi['claims'].list($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data['response'] != null) {
					$scope.items = res.data['response'];
					$scope.roleFound = true;
				} else {
					$scope.roleFound = false;
				}
			}).catch(function() {
				$scope.roleFound = false;
			});
		};

		$scope.back = function() {
			//go back to users list
			$location.path("/roles");
		};

		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});

	}
]);
