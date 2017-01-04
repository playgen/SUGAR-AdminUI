angular.module('sgaAdminApp').controller('GamesProfileDataCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'GamesApi', 'UsersApi',
	function($scope, $stateParams, $location, modalManager, GamesApi, UsersApi) {
		$scope.itemId = $stateParams.itemId;

		$scope.CreateNewData = false;

		$scope.isEditing = [];
		$scope.EditButtonText = [];

		$scope.init = function()
		{
			if (!$scope.hasGetGameDataPermission)
			{
				return;
			}

			// For testing purposes
			$scope.isEditing.push(false);
			$scope.EditButtonText.push("Edit");
			// End testing purposes

			GamesApi['data'].list($scope.itemId).then(function(res){
				if (res.status === 200 && res.data['response'] != null)
				{
					$scope.items = res.data['response'];
				}
				for (var i=0; i<$scope.items.length; i++)
				{
					$scope.items[i].index = i;

					$scope.isEditing.push(false);
					$scope.EditButtonText.push("Edit");
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
		$scope.update = function(index, itemkey, formData) {
			if (formData == null)
			{
				// do nothing
				return;
			}
			formData.value = formData.value || $scope.items[index].value;
			formData.saveDataType = formData.saveDataType || $scope.items[index].saveDataType;
			formData.gameId = formData.gameId || $scope.items[index].gameId;

			// Update the data
			var data = {key: itemkey, value: formData.value, saveDataType: formData.saveDataType, gameId: formData.gameId};
			console.log(data);
			GamesApi['data'].update(data).then(function(res){
				$scope.init();
				$scope.isEditing[index] = false;	
				$scope.EditButtonText[index] = "Edit";
			})
		}
		$scope.edit = function(index)
		{
			$scope.isEditing[index] = !$scope.isEditing[index];
			$scope.EditButtonText[index] = $scope.isEditing[index] ? "Cancel" : "Edit";
		}
	}
]);