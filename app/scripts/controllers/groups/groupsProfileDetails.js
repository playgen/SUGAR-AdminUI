angular.module('sgaAdminApp').controller('GroupsProfileDetailsCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'GroupsApi',
	function($scope, $stateParams, $location, modalManager, GroupsApi) {
		
		$scope.itemId = $stateParams.itemId;

		$scope.CreateNewData = false;

		$scope.init = function()
		{
			if (!$scope.hasGetActorDetailsPermission)
			{
				return;
			}
			GroupsApi['details'].list($scope.itemId).then(function(res){
				if (res.status === 200 && res.data['response'] != null)
				{
					$scope.items = res.data['response'];
				}
			});
		}
		$scope.addData = function()
		{
			$scope.CreateNewData = !$scope.CreateNewData;
		}
		$scope.create = function(formData)
		{
			var formActorData = {actorId: $scope.itemId, key: formData.key, value: formData.value};

			GroupsApi['details'].create(formActorData).then(function(res){
				$scope.init();
				$scope.CreateNewData = false;
			});
		}
	}
]);