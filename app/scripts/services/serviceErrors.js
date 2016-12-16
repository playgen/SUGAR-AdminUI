angular.module('sgaAdminApp').service("ErrorService", 
	[ '$rootScope', '$controller',
	function($rootScope, $controller) {                                                                                                                                            

			var service = {}; 

			service.show = function(rejectionReason) {

				$rootScope.$emit('Error', rejectionReason);
			}                                                                                                                                                                                           
			return service;
			
		}
	]
).controller('myController', 
	[ '$rootScope', 
	'modalManager', 
	function($rootScope, modalManager) {
    
	    $rootScope.$on('Error', function(event, rejectionReason) {

	  			return modalManager.open('showError', {
				code: rejectionReason.code,
				message: rejectionReason.message,
				otherInformation: rejectionReason.otherInfo
			});
	    });

	    return {}
		}
	]
).controller('errorMessageCtrl', [
	'$scope', '$uibModalInstance', 'modaldata',
	function($scope, $uibModalInstance, modaldata) {
		$scope.Code = modaldata.code;
		$scope.Message = modaldata.message;
		$scope.OtherInformation = modaldata.otherInformation;

		//our buttons
		$scope.closeModal = function() {
			$uibModalInstance.close();
		};
	}
]);