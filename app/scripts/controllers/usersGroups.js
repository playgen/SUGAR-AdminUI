// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc function
 * @name sgaAdminApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('UsersGroupsCtrl', [
	'$scope', '$routeParams', '$location', 'modalManager', 'UsersApi',
	function($scope, $routeParams, $location, modalManager, UsersApi) {
		$scope.itemtype = $routeParams.itemtype;
		$scope.itemId = $routeParams.itemId;

		$scope.userName = '';
		$scope.userFound = true;

		$scope.items = [];
		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};
		$scope.init = function() {
			UsersApi['userGroups'].list($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.items = res.data;
				}
			});
			UsersApi['users'].getById($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.userName = res.data.name;
				} else {
					$scope.userFound = false;
				}
			}).catch(function() {
				$scope.userFound = false;
			});
		};

		$scope.add = function(item) {
			return modalManager.open('addGroup', {
				itemtype: $scope.itemtype,
				itemId: $scope.itemId,
				item: item
			});
		};
		$scope.remove = function(item) {
			var friendship = "{ RequestorId: " + $scope.itemId + ", AcceptorId: " + item.id + ", Accepted: false }"
			UsersApi['userGroups'].update(friendship).then(function(res) {
				$scope.init();
			});
		}
		$scope.back = function() {
			//go back to users list
			$location.path("/users");
		};
		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
	}
]).controller('showGroupsModalCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'UsersApi', 'modalManager', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, UsersApi, modalManager, modaldata) {
		$scope.itemtype = modaldata.itemtype;
		$scope.config = modaldata.config;
		$scope.item = modaldata.item;

		UsersApi['userGroups'].list($scope.item.id).then(function(res) {
			if ((res != null ? res.status : void 0) === 200 && (res.data != null)) {
				$scope.items = res.data;
			}
		});

		//our buttons
		$scope.close = function() {
			return $uibModalInstance.close();
		};

	}
]).controller('addGroupModalCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'UsersApi', 'modalManager', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, UsersApi, modalManager, modaldata) {
		$scope.itemtype = modaldata.itemtype;
		$scope.config = modaldata.config;
		$scope.itemId = modaldata.itemId;
		$scope.exists = true;

		if (modaldata.item != null) {
			$scope.item = modaldata.item;
		} else if (modaldata.itemid != null) {
			UsersApi[$scope.itemtype].get(modaldata.itemid).then(function(data) {
				if ((data != null ? data.data : void 0) != null) {
					return $scope.item = data.data;
				}
			});
		}

		//our buttons
		$scope.close = function(item) {
			$scope.exists = true;
			return $uibModalInstance.close();
		};

		$scope.add = function(item) {
			UsersApi['userGroups'].getGroup($scope.txtBox)

			.then(function(res) {
				if (res.data[0] != null) {
					//put the data backwards for testing as groups cannot request users join
					var friendship = "{ RequestorId: " + $scope.itemId + ", AcceptorId: " + res.data[0].id + ", AutoAccept: true }"
					UsersApi['userGroups'].createMember(friendship).then(function(res) {
						$uibModalInstance.close();
						$rootScope.$broadcast('savedItem');
					});

				} else
					$scope.exists = false;
			});
		};
	}
]);
