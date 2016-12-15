angular.module('sgaAdminApp').service("ErrorService", 
	[ 
		'modalManager', 
		function(modalManager) {                                                                                                                                            
			
			var service = {}; 

			service.show = function(code, message, otherInformation) {
				return modalManager.open('showError', {
					code: code,
					message: message,
					otherInformation: otherInformation
				});
			}                                                                                                                                                                                           

			return service;
		}
	]
).controller('errorMessageCtrl', [
	'$scope', '$rootScope', '$uibModalInstance', 'modalManager', 'modaldata',
	function($scope, $rootScope, $uibModalInstance, modalManager, modaldata) {
		$scope.Code = modaldata.code;
		$scope.Message = modaldata.message;
		$scope.OtherInformation = modaldata.otherInformation;

		//our buttons
		$scope.closeModal = function() {
			$uibModalInstance.close();
		};
	}
]);