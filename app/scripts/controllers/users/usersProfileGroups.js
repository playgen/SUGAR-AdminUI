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
		$scope.remove = function(item) {
            var friendship = "{ RequestorId: " + $scope.itemId + ", AcceptorId: " + item.id + ", Accepted: false }"
            UsersApi['userGroups'].update(friendship).then(function(res) {
                $scope.init();
            });
        };
        return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
	}
]);