angular.module('sgaAdminApp').controller('GroupsProfileDataCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'GroupsApi', 'GamesApi',
	function($scope, $stateParams, $location, modalManager, GroupsApi, GamesApi) {
		$scope.itemId = $stateParams.itemId;

		$scope.CreateNewData = false;

		$scope.init = function()
		{
			if (!$scope.hasGetActorDataPermission)
			{
				return;
			}
			GroupsApi['data'].list($scope.itemId).then(function(res){
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
			if (formData.gameName == null || formData.gameName == "" )
			{
				$scope.saveNewData(formData, null);
			}
			else
			{
				// See if we can get the game
				GamesApi['games'].getByName(formData.gameName).then(function(res) {
					if (res.status === 200 && res.data['response'][0].id != null)
					{
						$scope.saveNewData(formData, res.data['response'][0].id);
					}
					else
					{
						console.log("Unable to get game with name: " + formData.gameName);
					}
				}).catch(function() {
					console.log("Unable to get game with name: " + formData.gameName);
				});
			}
			
		}
		$scope.cancel = function() {
			$scope.CreateNewData = false;
		}

		$scope.saveNewData = function(formData, gameId)
		{
			var formActorData = "";
			//TODO validate the value and the save data type are of the same type
			if (gameId == null)
			{
				formActorData = "{ actorId: " + $scope.itemId + ", key: \"" + formData.key + "\", value: \"" + formData.value + "\", saveDataType: \"" + formData.saveDataType + "\" }";
			}
			else
			{
				formActorData = "{ actorId: " + $scope.itemId + ", gameId: " + gameId + ", key: \"" + formData.key + "\", value: \"" + formData.value + "\", saveDataType: \"" + formData.saveDataType + "\" }";
			}
			GroupsApi['data'].create(formActorData).then(function(res){
				console.log(res.status);
				$scope.init();
				$scope.CreateNewData = false;
			});
		}
	}
]);