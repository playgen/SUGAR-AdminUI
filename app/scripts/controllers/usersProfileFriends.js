angular.module('sgaAdminApp').controller('UsersProfileFriendsCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'UsersApi',
	function($scope, $stateParams, $location, modalManager, UsersApi) {
		$scope.init = function() {
			$scope.items = [];
			$scope.friends = [];
			$scope.pendings = [];
			$scope.requests = [];

			$scope.ShowingFriends = true;
			$scope.ShowingPendingRequests = false;
			$scope.ShowingIncomingRequests = false;

			$scope.pagination = {
				perPage: 10,
				currentPage: 1
			};

			UsersApi['friendRequests'].listRequests($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.requests = res.data['response'];
				}
			});
			UsersApi['friendRequests'].listSentRequests($scope.itemId).then(function(res) {
				if (res != null && res.data != null) {
					$scope.pendings = res.data['response'];
				}
			});

			UsersApi['friends'].list($scope.itemId).then(function(res) {
				if ((res != null ? res.status : void 0) === 200 && (res.data['response'].length > 0)) {
					$scope.friends = res.data['response'];
					$scope.items = $scope.friends;
				}
			});
		};
		$scope.addFriend = function(item) {
			return modalManager.open('addFriend', {
				userName: $scope.userName,
				itemId: $scope.itemId,
				item: item
			});
		};
		$scope.viewIncoming = function() {
			$scope.reset();
			$scope.ShowingIncomingRequests = true;

			$scope.items = $scope.requests;
		};
		$scope.viewPending = function() {
			$scope.reset();
			$scope.ShowingPendingRequests = true;

			$scope.items = $scope.pendings;
		};
		$scope.viewFriends = function() {
			$scope.reset();
			$scope.ShowingFriends = true;

			$scope.items = $scope.friends;
		};

		$scope.reset = function () {
			$scope.items = [];

			$scope.ShowingFriends = false;
			$scope.ShowingPendingRequests = false;
			$scope.ShowingIncomingRequests = false;
		};
	}
]);