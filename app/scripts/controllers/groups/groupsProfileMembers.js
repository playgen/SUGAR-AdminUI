angular.module('sgaAdminApp').controller('GroupsProfileMembersCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'GroupsApi',
	function($scope, $stateParams, $location, modalManager, GroupsApi) {
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
                            GroupsApi['roles'].getActorRole($scope.items[i].id, $scope.itemId, "Group" ).then(function(res) {
                                
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
			var roleId = null;
			for (var i=0; i<$scope.roles.length; i++)
			{
				if ($scope.roles[i].name == item.NewRole)
				{
					roleId = $scope.roles[i].id;
					continue;
				}
			}
			console.log("Updating user with id: " + item.id + " with new role: " + item.NewRole + "with Id: " + roleId);

			var actorRole = "{ ActorId: " + item.id + ", RoleId: " + roleId + ", EntityId: " + $scope.itemId + "}"
			
			item.NewRole = "";

			GroupsApi['roles'].CreateActorRole(actorRole).then(function(res) {
				$scope.init();
			});

		};
		$scope.revokeRole = function(item) {
			console.log("Removing Role: " + item.role + " with Id: " + item.roleId + ", from user with Id: " + item.id);

			GroupsApi['roles']["delete"](item.id, $scope.itemId, item.roleId).then(function(res) {
				$scope.init();
			});

		};
		$scope.$on('permissionsSet', function(event, args) {
			console.log("Permissions Set with emit, refreshing page");
			return $scope.init();
		});
		$scope.$on('permissionsSetBroadcast', function(event, args) {
			console.log("Permissions Set with broadcast, refreshing page");
			return $scope.init();
		});
		$scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
		
		
	}
]);