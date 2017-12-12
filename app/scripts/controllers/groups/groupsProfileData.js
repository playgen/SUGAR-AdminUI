angular.module('sgaAdminApp').controller('GroupsProfileDataCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'GroupsApi', 'GamesApi',
	function($scope, $stateParams, $location, modalManager, GroupsApi, GamesApi) {
		$scope.itemId = $stateParams.itemId;

		$scope.CreateNewData = false;

		$scope.isEditing = [];
		$scope.EditButtonText = [];

		$scope.init = function()
		{
			if (!$scope.hasGetActorDataPermission)
			{
				return;
			}

			// For testing purposes
			$scope.isEditing.push(false);
			$scope.EditButtonText.push("Edit");
			// End testing purposes

      GamesApi['games'].list().then(function(res){
        if (res.status === 200 && res.data['response'] != null)
        {
          $scope.games = res.data['response'];
        }
      });
    }
    $scope.loadData = function(game)
    {
      GroupsApi['data'].list($scope.itemId, game.id).then(function(res){
				if (res.status === 200 && res.data['response'] != null)
				{
					$scope.datas = res.data['response'];
					for (var i=0; i<$scope.datas.length; i++)
					{
						$scope.datas[i].index = i;
            $scope.datas[i].evaluationDataType = $scope.getDataType($scope.datas[i].evaluationDataType);
						$scope.isEditing.push(false);
						$scope.EditButtonText.push("Edit");
					}
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
			var formActorData = {};
      formActorData.CreatingActorId = $scope.itemId;
      formActorData.Key = formData.key;
      formActorData.GameId = gameId;
      formActorData.value = formData.value;
      formActorData.EvaluationDataType = formData.evaluationDataType;
			GroupsApi['data'].create(formActorData).then(function(res){
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
			GroupsApi['data'].update(data).then(function(res){
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
