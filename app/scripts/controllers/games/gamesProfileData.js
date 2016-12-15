angular.module('sgaAdminApp').controller('GamesProfileDataCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'GamesApi', 'UsersApi',
	function($scope, $stateParams, $location, modalManager, GamesApi, UsersApi) {
		$scope.CreateNewData = false;

		$scope.init = function()
		{
			if (!$scope.hasGetGameDataPermission)
			{
				return;
			}
			GamesApi['data'].list($scope.itemId).then(function(res){
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
		$scope.addNewData = function(formData)
		{
			// check that the group provided is valid
			if (formData.actorName == null || formData.actorName == "" )
			{
				$scope.saveNewData(formData, null);
			}
			else
			{
				// See if we can get the user
				UsersApi['users'].get(formData.actorName).then(function(res) {
					if (res.status === 200 && res.data['response'][0].id != null)
					{
						$scope.saveNewData(formData, res.data['response'][0].id);
					}
					else
					{
						console.log("Unable to get actor with name: " + formData.actorName);
					}
				}).catch(function() {
					console.log("Unable to get actor with name: " + formData.actorName);
				});
			}
			
		}
		$scope.cancel = function() {
			$scope.CreateNewData = false;
		}

		$scope.saveNewData = function(formData, actorId)
		{
			var formGameData = "";
			//TODO validate the value and the save data type are of the same type
			if (actorId == null)
			{
				formGameData = "{ gameId: " + $scope.itemId + ", key: \"" + formData.key + "\", value: \"" + formData.value + "\", saveDataType: \"" + formData.saveDataType + "\" }";
			}
			else
			{
				formGameData = "{ actorId: " + actorId + ", gameId: " + $scope.itemId + ", key: \"" + formData.key + "\", value: \"" + formData.value + "\", saveDataType: \"" + formData.saveDataType + "\" }";
			}
			GamesApi['data'].create(formActorData).then(function(res){
				console.log(res.status);
				$scope.init();
				$scope.CreateNewData = false;
			});
		}
	}
]);