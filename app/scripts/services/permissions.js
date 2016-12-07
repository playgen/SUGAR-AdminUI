'use strict';

angular.module('sgaAdminApp')                                                                                                                                                                        
.service("permissionService", ['$http', '$rootScope', 'config', function($http, $rootScope, config) {  
	var userId = null;
	var userClaims = [];                                                                                                                                                 
	return {         
         set: function(id) {
            userId = id;
            $http.get(config.api.baseurl + '/ActorClaim/actor/' + id).then(function(res) {
               if (res.status === 200 && res.data != null)
               {
                  userClaims = res.data['response'];
                  $rootScope.$broadcast('updateNavbar');
               }
            });
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