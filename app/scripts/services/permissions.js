'use strict';

angular.module('sgaAdminApp')
.service("permissionService",
	[
		'$http',
		'$rootScope',
		'$q',
		'config',
		function($http, $rootScope, $q, config) {

			var userId = null;
			var userClaims = [];

			var service = {};
			service.get = function(id) {
				userId = id;
				return $http.get(config.api.baseurl + '/ActorClaim/actor/' + id).then(function(res) {
					if (res.status === 200 && res.data != null)
					{
						userClaims = res.data['response'];

						$rootScope.$broadcast('updateNavbar');
						$rootScope.$broadcast('refreshPermissions');
					}
				});
			}
			service.hasAccessToClaim = function(claimRequired, entityId){
				for (var i = 0; i<userClaims.length; i++)
				{
					if (userClaims[i].claimName == claimRequired && (userClaims[i].entityId == entityId || userClaims[i].entityId == -1))
					{
						return true;
					}
				}
				return false;
			}
			service.hasUserPermissions = function()
			{
				return userId != null;
			}
			// service.getItemClaims = function(itemId)
			// {
			// 	var deferred = $q.defer();


			// }
			return service;
		}
	]
);
