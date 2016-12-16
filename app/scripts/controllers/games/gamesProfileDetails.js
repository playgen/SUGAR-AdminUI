angular.module('sgaAdminApp').controller('GamesProfileDetailsCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'GamesApi',
	function($scope, $stateParams, $location, modalManager, GamesApi) {
		
		$scope.itemId = $stateParams.itemId;

		$scope.CreateNewData = false;

		$scope.init = function()
		{
			if (!$scope.hasGetActorDetailsPermission)
			{
				return;
			}
			GamesApi['details'].list($scope.itemId).then(function(res){
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
			var formActorData = {groupId: $scope.itemId, key: formData.key, value: formData.value};

			GamesApi['details'].create(formActorData).then(function(res){
				$scope.init();
				$scope.CreateNewData = false;
			});
		}
	}
]);