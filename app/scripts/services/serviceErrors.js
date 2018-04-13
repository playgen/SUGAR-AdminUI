angular.module('sgaAdminApp')
  .service("ErrorService", [ '$rootScope', '$controller', function($rootScope, $controller)
    {
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

	  var ErrorMessageVisible = false;

	    $rootScope.$on('Error', function(event, rejectionReason) {
    		if (!ErrorMessageVisible)
    		{
    			ErrorMessageVisible = true;
	  			return modalManager.open('showError', {
					code: rejectionReason.code,
					message: rejectionReason.message,
					otherInformation: rejectionReason.otherInfo


				});
	  		}
	    });


	    $rootScope.$on('ErrorClosed', function(event){
	    	ErrorMessageVisible = false;
	    });

	    return {}
		}
	]
).controller('errorMessageCtrl', [
	'$rootScope', '$scope', '$uibModalInstance', 'modaldata',
	function($rootScope, $scope, $uibModalInstance, modaldata) {
		$scope.Code = modaldata.code;
		$scope.Message = modaldata.message;
		$scope.OtherInformation = modaldata.otherInformation;

		//our buttons
		$scope.closeModal = function() {
			$rootScope.$emit("ErrorClosed");
			$uibModalInstance.close();
		};
	}
]);
