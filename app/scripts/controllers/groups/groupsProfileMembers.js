angular.module('sgaAdminApp').controller('GroupsProfileMembersCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'GroupsApi', 'RolesApi',
	function($scope, $stateParams, $location, modalManager, GroupsApi, RolesApi) {
		$scope.init = function() {
			$scope.itemtype = $stateParams.itemtype;
			$scope.itemId = $stateParams.itemId;

			$scope.groupName = '';
			$scope.groupFound = true;

			$scope.roles = [];

			$scope.items = [];
			$scope.pagination = {
				perPage: 10,
				currentPage: 1
			};
			GroupsApi['members'].list($scope.itemId).then(function(res) {
				if ((res != null ? res.status : void 0) === 200 && (res.data != null)) {

					$scope.items = res.data['response'];

                    for (var i in $scope.items) {
                        //loop through our items and pass through the index for us to ensure we set the number of members correctly
                        (function(i) {
                            RolesApi['roles'].getActorRole($scope.items[i].id, $scope.itemId, "Group" ).then(function(res) {

                            	$scope.items[i].role = null;
                            	$scope.items[i].roleId = null;
                                if (res.status === 200  && res.data['response'] != null)
								{
									var name = res.data['response'][0] != null ? res.data['response'][0].name : null;
									var roleId = res.data['response'][0] != null ? res.data['response'][0].id : null;

									$scope.items[i].role = name != null ? name : "None";
									$scope.items[i].roleId = roleId != null ? roleId : null;
								}
                            });
                        })(i);
                    }

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
		};
		//our buttons
		$scope.deleteMember = function(item) {
      var relationship = {};
      relationship.RequestorId = item.id;
      relationship.AcceptorId = $scope.itemId;
      relationship.Accepted = false;
			GroupsApi['members'].update(relationship).then(function(res) {
				$scope.init();
			});
		};
		$scope.viewMemberProfile = function(item) {
			$location.path('/users/' + item.id);
		}
		$scope.addMember = function(item) {
			return modalManager.open('addMember', {
				groupName: $scope.groupName,
				itemId: $scope.itemId
			});
		};
		$scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});


	}
]);
