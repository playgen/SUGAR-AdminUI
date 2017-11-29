angular.module('sgaAdminApp').controller('GroupsProfileDetailsCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'GroupsApi',
	function($scope, $stateParams, $location, modalManager, GroupsApi) {

		$scope.itemId = $stateParams.itemId;

		$scope.CreateNewData = false;

		$scope.isEditing = [];
		$scope.EditButtonText = [];

		$scope.init = function()
		{
			// if (!$scope.hasGetActorDetailsPermission)
			// {
			// 	return;
			// }

			GroupsApi['groups'].getById($scope.itemId).then(function(res){
				if (res.status === 200 && res.data['response'] != null)
				{
					$scope.item = res.data['response'];
          var keys = Object.keys($scope.item);
          $scope.items = [];
          for (var i=0; i<keys.length; i++)
          {
            $scope.items[i] = {};
            $scope.items[i].index = i;
            $scope.items[i].key = keys[i];
            $scope.items[i].value = $scope.item[keys[i]];

            $scope.isEditing[i] = false;
						$scope.EditButtonText[i] = "Edit";
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
			// var formActorData = {actorId: $scope.itemId, key: formData.key, value: formData.value};

			// GroupsApi['details'].create(formActorData).then(function(res){
			// 	$scope.init();
			// 	$scope.CreateNewData = false;
			// });
		}
		$scope.update = function(index, itemkey, newValue) {
			// Update the detail
      if (newValue == null)
        {
          // do nothing
          return;
        }
        var keys = Object.keys($scope.item);
        for (var i=0; i<keys.length; i++)
        {
          if (keys[i] == itemkey)
          {
            $scope.item[keys[i]] = newValue;
          }
        }

			GroupsApi['groups'].update($scope.itemId, $scope.item).then(function(res){
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
