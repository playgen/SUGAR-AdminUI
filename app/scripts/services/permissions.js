'use strict';

angular.module('sgaAdminApp')                                                                                                                                                                        
.service("permissionService", ['$http', 'config', function($http, config) {  
	var userId = null;
	var userClaims = [];                                                                                                                                                 
	return {                                                                                                                                                                                                       
   		setClaims: function(id, claims) {
   			userId = id;
   			userClaims = claims
   		},
   		hasAccessToClaim: function(claimRequired, entityId){
   			for (var i = 0; i<userClaims.length; i++)
   			{
   				if (userClaims[i].claimName == claimRequired && userClaims[i].entityId == entityId)
   				{
   					return true;
   				}
   			}
   			return false;
   		},
	};
}]);