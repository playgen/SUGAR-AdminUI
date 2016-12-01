angular.module('sgaAdminApp').controller('UsersProfileFriendsCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'UsersApi',
	function($scope, $stateParams, $location, modalManager, UsersApi) {
		$scope.init = function() {
			$scope.items = [];
			$scope.pendings = [];
			$scope.requests = [];
			UsersApi['friends'].list($scope.itemId).then(function(res) {
				if ((res != null ? res.status : void 0) === 200 && (res.data['response'].length > 0)) {
					$scope.items = res.data['response'];
				}
			});
			UsersApi['friendRequests'].listPending($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.pendings = res.data['response'];
				}
			});
			UsersApi['friendRequests'].list($scope.itemId).then(function(res) {
				if (res != null && res.data != null) {
					$scope.requests = res.data['response'];
				}
			});
		}
		$scope.addFriend = function(item) {
			return modalManager.open('addFriend', {
				userName: $scope.userName,
				itemId: $scope.itemId,
				item: item
			});
		};
	}
]);