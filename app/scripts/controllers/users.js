// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc function
 * @name sgaAdminApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('UsersCtrl', [
	'$scope', '$routeParams', '$location', 'modalManager', 'UsersApi',
	function($scope, $routeParams, $location, modalManager, UsersApi) {
		$scope.itemtype = $routeParams.itemtype;
		$scope.itemid = $routeParams.itemid;

		$scope.items = [];
		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};
		$scope.init = function() {
			return UsersApi['users'].list().then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.items = res.data;
				}
			});
		};
		$scope.select = function(item) {
			return modalManager.open('editUser', {
				itemtype: 'users',
				item: item
			});
		};
		$scope["delete"] = function(item) {
			return modalManager.open('deleteUser', {
				itemtype: 'users',
				item: item
			});
		};
		$scope.create = function() {
			return modalManager.open('createUser', {
				itemtype: 'users'
			});
		};
		$scope.showFriends = function(item) {
			$location.path('/users/' + item.id + '/friends');
		};
		$scope.showGroups = function(item) {
			$location.path('/users/' + item.id + '/groups');
		};
		$scope.back = function() {
			//go back to main menu
			$location.path("/");
		};
		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
	}
]).controller('EditUserModalCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'Api', 'modalManager', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, Api, modalManager, modaldata) {
		$scope.itemtype = modaldata.itemtype;
		$scope.config = modaldata.config;
		if (modaldata.item != null) {
			$scope.item = modaldata.item;
		} else if (modaldata.itemid != null) {
			$scope.item = {};
			UsersApi[$scope.itemtype].get(modaldata.itemid).then(function(data) {
				if ((data != null ? data.data : void 0) != null) {
					return $scope.item = data.data;
				} else {
					return $uibModalInstance.close();
				}
			});
		} else {
			$uibModalInstance.close();
		}
		$scope.editables = $scope.config.editables.view;
		$scope.editables.forEach(function(e) {
			return e.original = $scope.item[e.key];
		});
		$scope.link = function(itemtype, id) {
			return modalManager.open('editUser', {
				itemtype: itemtype,
				itemid: id
			});
		};
		$scope.save = function() {
			return UsersApi[$scope.itemtype].update($scope.item.id, $scope.item).then(function() {
				$uibModalInstance.close();
				return $rootScope.$broadcast('savedItem');
			});
		};
		return $scope.close = function() {
			$scope.editables.forEach(function(e) {
				return $scope.item[e.key] = e.original;
			});
			return $uibModalInstance.close();
		};

	}
]).controller('CreateUserModalCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'UsersApi', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, UsersApi, modaldata) {
		$scope.itemtype = modaldata.itemtype;
		$scope.config = modaldata.config;
		$scope.item = {};

		$scope.save = function() {
			return UsersApi[$scope.itemtype].create($scope.item).then(function() {
				$uibModalInstance.close();
				return $rootScope.$broadcast('savedItem');
			});
		};
		return $scope.close = function() {
			return $uibModalInstance.close();
		};
	}
]).controller('ConfirmDeleteUserModalCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'UsersApi', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, UsersApi, modaldata) {
		$scope.itemtype = modaldata.itemtype;
		$scope.config = modaldata.config;
		if (modaldata.item != null) {
			$scope.item = modaldata.item;
		} else if (modaldata.itemid != null) {
			$scope.item = {};
			usersApi[$scope.itemtype].get(modaldata.itemid).then(function(data) {
				return console.log(data);
			});
		}
		$scope["delete"] = function() {
			return UsersApi[$scope.itemtype]["delete"]($scope.item.id).then(function() {
				$uibModalInstance.close();
				return $rootScope.$broadcast('savedItem');
			});
		};
		return $scope.close = function() {
			return $uibModalInstance.close();
		};
	}
]);
