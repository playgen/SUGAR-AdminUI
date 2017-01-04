angular.module('sgaAdminApp').controller('UsersProfileDetailsCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'UsersApi',
	function($scope, $stateParams, $location, modalManager, UsersApi) {

		$scope.itemId = $stateParams.itemId;

		$scope.CreateNewData = false;

		$scope.isEditing = [];
		$scope.EditButtonText = [];

		$scope.init = function()
		{
			if (!$scope.hasGetActorDetailsPermission)
			{
				return;
			}

			// For testing purposes
			$scope.isEditing.push(false);
			$scope.EditButtonText.push("Edit");
			// End testing purposes

			UsersApi['details'].list($scope.itemId).then(function(res){
				if (res.status === 200 && res.data['response'] != null)
				{
					$scope.items = res.data['response'];
					for (var i=0; i<$scope.items.length; i++)
					{
						$scope.items[i].index = i;

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
		$scope.create = function(formData)
		{
			var formActorData = {actorId: $scope.itemId, key: formData.key, value: formData.value};

			UsersApi['details'].create(formActorData).then(function(res){
				$scope.init();
				$scope.CreateNewData = false;
			});
		}
		$scope.update = function(index, itemkey, newValue) {
			if (newValue == null)
			{
				// do nothing
				return;
			}
			// Update the detail
			var data = {actorId: $scope.itemId, key: itemkey, value: newValue};
			console.log(data);
			UsersApi['details'].update(data).then(function(res){
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