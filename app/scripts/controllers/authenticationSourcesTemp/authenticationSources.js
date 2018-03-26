'use strict';

angular.module('sgaAdminApp').controller('AuthenticationSourcesCtrl', [
	'$scope', '$stateParams', '$location', 'permissionService', 'modalManager', 'SourcesApi',
	function($scope, $stateParams, $location, permissionService, modalManager, SourcesApi) {
		$scope.permissionService = permissionService;

		$scope.hasGetListPermission;
		$scope.hasCreatePermission;
		$scope.hasUpdatePermission;
		$scope.hasDeletePermission;


		$scope.items = [];

		$scope.isViewing = [];

		$scope.isEditing = false;
		$scope.editButtonText = "Edit";

		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};
		$scope.CreateNewData = false;

		$scope.init = function()
		{
			$scope.hasGetListPermission = permissionService.hasAccessToClaim('Get-AccountSource', -1);
			$scope.hasCreatePermission = permissionService.hasAccessToClaim('Create-AccountSource', -1);
			$scope.hasUpdatePermission = permissionService.hasAccessToClaim('Update-AccountSource', -1);
			$scope.hasDeletePermission = permissionService.hasAccessToClaim('Delete-AccountSource', -1);

			if (!$scope.hasGetListPermission)
			{
				return;
			}
			SourcesApi['sources'].list($scope.itemId).then(function(res){
				if (res.status === 200 && res.data['response'] != null)
				{
					$scope.items = res.data['response'];
					for (var i=0; i<$scope.items.length; i++)
					{
						$scope.items[i].index = i;
						$scope.isViewing.push(false);
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
			var formActorData = {token: formData.token, description: formData.description, requiresPassword: formData.requiresPassword, autoRegister: formData.autoRegister};

			SourcesApi['sources'].create(formActorData).then(function(res){
				$scope.init();
				$scope.CreateNewData = false;
			});
		}
		$scope.saveChanges = function(index, formData)
		{
			if (formData == null)
			{
				return;
			}

			// Make sure that the old data has been carried across if not changed
			formData.token = formData.token || $scope.items[index].token;
			formData.description = formData.description || $scope.items[index].description;
			formData.requiresPassword = formData.requiresPassword || $scope.items[index].requiresPassword;
			formData.autoRegister = formData.autoRegister || $scope.items[index].autoRegister;

			var formActorData = {token: formData.token, description: formData.description, requiresPassword: formData.requiresPassword, autoRegister: formData.autoRegister};

			SourcesApi['sources'].update(formActorData).then(function(res){
				$scope.init();
				$scope.isEditing = false;
			});
		}
		$scope.editAuthentication = function ()
		{
			$scope.isEditing = !$scope.isEditing;
			$scope.editButtonText = $scope.isEditing ? "Cancel" : "Edit";
		}
		$scope.back = function() {
			//go back to main menu
			$location.path("/");
		};
		$scope.remove = function(item){
			var id = item.id;
			if (item.token == 'SUGAR')
			{
				// We cannot delete SUGAR
				return;
			}
			SourcesApi['sources']["delete"](id).then(function(res){
				$scope.init();
			});
		}
		$scope.toggleView = function(n){
			// hide all other achievements
			$scope.isEditing = false;
			for (var i=0; i<$scope.isViewing.length; i++)
			{
				if (i != n)
				{
					$scope.isViewing[i] = false;
				}
			}
			$scope.isViewing[n] = !$scope.isViewing[n];
		}

	}
]);
