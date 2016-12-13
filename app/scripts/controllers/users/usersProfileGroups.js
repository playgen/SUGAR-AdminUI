angular.module('sgaAdminApp').controller('UsersProfileGroupsCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'UsersApi',
	function($scope, $stateParams, $location, modalManager, UsersApi) {

		$scope.init = function() {
			UsersApi['userGroups'].list($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.items = res.data['response'];
					for (var i in $scope.items) {
                        //loop through our items and pass through the index for us to ensure we set the number of members correctly
                        (function(i) {
                            UsersApi['roles'].getActorRole($scope.itemId, $scope.items[i].id, "Group" ).then(function(res) {
                                
                            	$scope.items[i].role = null;
                                if (res.status === 200  && res.data['response'] != null)
								{	
									var name = res.data['response'][0] != null ? res.data['response'][0].name : null;
									var roleId = res.data['response'][0] != null ? res.data['response'][0].id : null;

									$scope.items[i].role = name != null ? name : "None"; 
								}
                            });
                        })(i);
                    }

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