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
          $scope.datas = res.data['response'];
				}
				for (var i=0; i<$scope.datas.length; i++)
				{
          $scope.datas[i].index = i;
          $scope.datas[i].dataType = $scope.items[i].evaluationDataType;
          $scope.datas[i].evaluationDataType = $scope.getDataType($scope.items[i].evaluationDataType);
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
      var gameData = {};
      gameData.gameId = $scope.itemId;
      gameData.key = formData.key;
      gameData.value = formData.value;
      gameData.evaluationDataType = formData.evaluationDataType;
      gameData.creatingActorId = actorId;

			GamesApi['data'].create(gameData).then(function(res){
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
			formData.evaluationDataType = formData.evaluationDataType || $scope.items[index].evaluationDataType;
			formData.gameId = formData.gameId || $scope.items[index].gameId;

			// Update the data
			var data = {key: itemkey, value: formData.value, evaluationDataType: formData.evaluationDataType, gameId: formData.gameId};
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
    $scope.getDataType = function(type) {
			switch(type)
			{
				case 'String':
					return "0";
				case 'Long':
					return "1";
				case 'Float':
					return "2";
				case 'Boolean':
					return "3";
				default:
					return "";
			}
		};
	}
]);
