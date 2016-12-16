angular.module('sgaAdminApp').controller('UsersProfileDetailsCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'UsersApi',
	function($scope, $stateParams, $location, modalManager, UsersApi) {

		$scope.itemId = $stateParams.itemId;

		$scope.CreateNewData = false;

		$scope.init = function()
		{
			if (!$scope.hasGetActorDetailsPermission)
			{
				return;
			}
			UsersApi['details'].list($scope.itemId).then(function(res){
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

			UsersApi['details'].create(formActorData).then(function(res){
				$scope.init();
				$scope.CreateNewData = false;
			});
		}
	}
]);