angular.module('sgaAdminApp').controller('GroupsProfileAlliancesCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'GroupsApi',
	function($scope, $stateParams, $location, modalManager, GroupsApi) {

		$scope.ShowingAlliances = true;
		$scope.ShowingPendingRequests = false;
		$scope.ShowingIncomingRequests = false;

		$scope.init = function() {
			$scope.items = [];
			$scope.alliances = [];
			$scope.pendings = [];
			$scope.requests = [];

			$scope.pagination = {
				perPage: 10,
				currentPage: 1
			};

			GroupsApi['allianceRequests'].listRequests($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.requests = res.data['response'];
					if ($scope.ShowingIncomingRequests)
					{
						$scope.items = $scope.requests;
					}
				}
			});
			GroupsApi['allianceRequests'].listSentRequests($scope.itemId).then(function(res) {
				if (res != null && res.data != null) {
					$scope.pendings = res.data['response'];
					if ($scope.ShowingPendingRequests)
					{
						$scope.items = $scope.pendings;
					}
				}
			});

			GroupsApi['alliances'].list($scope.itemId).then(function(res) {
				if ((res != null ? res.status : void 0) === 200 && (res.data['response'].length > 0)) {
					$scope.alliances = res.data['response'];
					if ($scope.ShowingAlliances)
					{
						$scope.items = $scope.alliances;
					}
				}
			});

		};
		$scope.addAlliance = function(item) {
			return modalManager.open('addAlliance', {
				groupName: $scope.groupName,
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
		$scope.viewAlliances = function() {
			$scope.reset();
			$scope.ShowingAlliances = true;

			$scope.items = $scope.alliances;
		};
		$scope.veiwGroupProfile = function(item)
		{
			$location.path('/groups/' + item.id);
		}
		$scope.reset = function () {
			$scope.items = [];

			$scope.ShowingAlliances = false;
			$scope.ShowingPendingRequests = false;
			$scope.ShowingIncomingRequests = false;
		};
		$scope.remove = function(item) {
          var relationship = {};
          relationship.RequestorId = item.id;
          relationship.AcceptorId = $scope.itemId;
          relationship.Accepted = false;

            GroupsApi['alliances'].update(relationship).then(function(res) {
                $scope.init();
        	});
		};

        $scope.removePending = function(item) {
          relationship.RequestorId = $scope.itemId;
          relationship.AcceptorId = item.id;
          relationship.Accepted = false;
            GroupsApi['allianceRequests'].update(relationship).then(function(res) {
                $scope.init();
            });
        };

		$scope.accept = function(item) {
      relationship.RequestorId = item.id;
      relationship.AcceptorId = $scope.itemId;
      relationship.Accepted = true;

            GroupsApi["allianceRequests"].update(relationship).then(function(res) {
                $scope.init();
            });
        };
        $scope.reject = function(item) {
          relationship.RequestorId = item.id;
          relationship.AcceptorId = $scope.itemId;
          relationship.Accepted = false;
            GroupsApi["allianceRequests"].update(relationship).then(function(res) {
                $scope.init();
            });
        };


		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
	}
]);
