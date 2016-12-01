angular.module('sgaAdminApp').controller('UsersProfileGroupsCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'UsersApi',
	function($scope, $stateParams, $location, modalManager, UsersApi) {
		$scope.init = function() {
			UsersApi['userGroups'].list($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.items = res.data['response'];
				}
			});
		}
		$scope.addGroup = function(item) {
			return modalManager.open('addGroup', {
				itemtype: $scope.itemtype,
				itemId: $scope.itemId,
				item: item
			});
		};

	}
]);