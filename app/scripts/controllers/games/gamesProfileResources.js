// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc function
 * @name sgaAdminApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('GamesProfileResourcesCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'ResourcesApi', 'GroupsApi', 'UsersApi',
	function($scope, $stateParams, $location, modalManager, ResourcesApi, GroupsApi, UsersApi) {
		$scope.itemtype = $stateParams.itemtype;
		$scope.itemId = $stateParams.itemId;

		$scope.gameFound = true;
		$scope.gameName = '';

		$scope.items = [];
		$scope.pagination = {
			perPage: 20,
			currentPage: 1
		};
    $scope.init = function()
    {
      GroupsApi['groups'].list().then(function(res){
        if (res.status === 200 && res.data['response'] != null)
        {
          $scope.groups = res.data['response'];
        }
      });
      UsersApi['users'].list().then(function(res){
        if (res.status === 200 && res.data['response'] != null)
        {
          $scope.users = res.data['response'];
        }
      });
    }

    $scope.loadActorData = function(actor)
    {
      ResourcesApi['games'].listActorResources(actor.id, $scope.itemId).then(function(res){
				if (res.status === 200 && res.data['response'] != null)
				{
					$scope.items = res.data['response'];
					for (var i=0; i<$scope.items.length; i++)
					{
						$scope.items[i].index = i;
					}
				}
			});
    }

		$scope.addNew = function() {
			return modalManager.open('createResource', {
				itemId: $scope.itemId
			});
		}
		$scope.back = function() {
			//go back to resources games list
			$location.path("/resources/" + $scope.itemId);
		};
		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
    });
	}
]).controller('CreateResourceModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'ResourcesApi', 'modaldata', 'UsersApi', 'GroupsApi',
  function($scope, $rootScope, $uibModalInstance, ResourcesApi, modaldata, UsersApi, GroupsApi) {
    $scope.item = {};
    $scope.item.gameId = modaldata.itemId == "global" ? null : modaldata.itemId;

    $scope.save = function() {
      // Get the actor id
      if ($scope.item.actorType == "user")
      {
        UsersApi['users'].get($scope.item.actorName).then(function(res) {
					if (res.status === 200 && res.data['response'][0].id != null)
					{
						$scope.saveNewData($scope.item, res.data['response'][0].id);
					}
					else
					{
						console.log("Unable to get actor with name: " + $scope.item.actorName);
					}
				}).catch(function() {
					console.log("Unable to get actor with name: " + $scope.item.actorName);
				});
      }
      else
      {
        GroupsApi['groups'].get($scope.item.actorName).then(function(res) {
					if (res.status === 200 && res.data['response'][0].id != null)
					{
						$scope.saveNewData($scope.item, res.data['response'][0].id);
					}
					else
					{
						console.log("Unable to get actor with name: " + $scope.item.actorName);
					}
				}).catch(function() {
					console.log("Unable to get actor with name: " + $scope.item.actorName);
				});
      }
    };
    $scope.saveNewData = function(data, actorId)
		{
      var resource = {};
      resource.gameId = data.gameId;
      resource.key = data.key;
      resource.actorId = actorId;
      resource.quantity = data.quantity;

      ResourcesApi['games'].createResource(resource).then(function() {
        $uibModalInstance.close();
        return $rootScope.$broadcast('savedItem');
      });
		}
    return $scope.close = function() {
      $rootScope.$broadcast('savedItem');
      return $uibModalInstance.close();
    };
  }
]);
