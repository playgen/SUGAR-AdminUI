'use strict';

angular.module('sgaAdminApp')                                                                                                                                                                        
.factory("permissionServices", ['$http', 'config', function($http, config) {  
	var userId = null;
	var userClaims = [];                                                                                                                                                 
	return {                                                                                                                                                                                                       
   		setClaims: function(id, claims) {
   			userId = id;
   			userClaims = claims
   		},
   		hasAccessToClaim: function(claimRequired){
   			for (var i = 0; i<userClaims.length; i++)
   			{
   				if (userClaims[i].claimId == claimRequired.claimId)
   				{
   					return true;
   				}
   			}
   			return false;
   		},
	};
}]);