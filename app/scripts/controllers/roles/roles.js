// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc function
 * @name sgaAdminApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('RolesCtrl', [
	'$scope', '$stateParams', '$location', 'permissionService', 'modalManager', 'RolesApi',
	function($scope, $stateParams, $location, permissionService, modalManager, RolesApi) {
		$scope.itemtype = $stateParams.itemtype;
		$scope.itemid = $stateParams.itemid;

		$scope.permissionService = permissionService;

		$scope.hasGetListPermission;
		$scope.hasCreatePermission;

		$scope.items = [];
		$scope.pagination = {
			perPage: 20,
			currentPage: 1
		};
		$scope.init = function() {

			// our permissions
			$scope.hasCreatePermission = permissionService.hasAccessToClaim('Create-Role',-1);
			$scope.hasGetListPermission = permissionService.hasAccessToClaim('Get-Role', -1);

			return RolesApi['roles'].list().then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.items = res.data['response'];
				}
			});
		};
		$scope["delete"] = function(item) {
			return modalManager.open('deleteRole', {
				itemtype: 'role',
				item: item
			});
		};
		$scope.create = function() {
			return modalManager.open('createRole', {

			});
		};
		$scope.showRole = function(item){
			$location.path('/roles/' + item.id);
		}
		$scope.back = function() {
			//go back to main menu
			$location.path("/");
		};
		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
	}
]).controller('CreateRoleModalCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'RolesApi', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, RolesApi, modaldata) {
		$scope.item = {};

		$scope.save = function() {
			return RolesApi['roles'].create($scope.item).then(function() {
				$uibModalInstance.close();
				return $rootScope.$broadcast('savedItem');
			});
		};
		return $scope.close = function() {
			return $uibModalInstance.close();
		};
	}
]);
