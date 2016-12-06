angular.module('sgaAdminApp').controller('GroupsProfileMembersCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'GroupsApi',
	function($scope, $stateParams, $location, modalManager, GroupsApi) {
		$scope.init = function() {
			$scope.itemtype = $stateParams.itemtype;
			$scope.itemId = $stateParams.itemId;

			$scope.groupName = '';
			$scope.groupFound = true;

			$scope.items = [];
			$scope.pagination = {
				perPage: 10,
				currentPage: 1
			};
			GroupsApi['members'].list($scope.itemId).then(function(res) {
				if ((res != null ? res.status : void 0) === 200 && (res.data != null)) {
					$scope.items = res.data['response'];
				}
			});
			GroupsApi['groups'].getById($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.groupName = res.data['response'].name;
				} else {
					$scope.groupFound = false;
				}
			}).catch(function() {
				$scope.groupFound = false;
			});

			GroupsApi['roles'].list().then(function(res) {
				if (res.status === 200 && res.data != null)
				{
					$scope.roles = res.data['response'];
				}
			});
		};
		//our buttons
		$scope.deleteMember = function(item) {
			var friendship = "{ RequestorId: " + item.id + ", AcceptorId: " + $scope.itemId + ", Accepted: false }"
			GroupsApi['members'].update(friendship).then(function(res) {
				$scope.init();
			});
		};
		$scope.addMember = function(item) {
			return modalManager.open('addMember', {
				groupName: $scope.groupName,
				itemId: $scope.itemId
			});
		};
		$scope.setRole = function(item) {
			console.log("TODO Update user with id: " + item.id + " with new role: " + item.NewRole)
			item.NewRole = "";
		};
	}
]);