angular.module('sgaAdminApp')
  .service("ErrorService", [ '$rootScope', '$controller', function($rootScope, $controller)
    {
      var service = {};
      var ErrorMessageVisible = false;
      var controllerSet = false;

			service.show = function(rejectionReason) {
    		if (!ErrorMessageVisible)
        {
          if (!controllerSet)
          {
            controllerSet = true;
            var controller = $controller("myController");
          }
          ErrorMessageVisible = true;

          $rootScope.$emit('Error', rejectionReason);
        }
      }
      $rootScope.$on('ErrorClosed', function(event){
        ErrorMessageVisible = false;
      });

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
	'$rootScope', '$scope', '$uibModalInstance', 'modaldata',
	function($rootScope, $scope, $uibModalInstance, modaldata) {
		$scope.Code = modaldata.code;
		$scope.Message = modaldata.message;
		$scope.OtherInformation = modaldata.otherInformation;

		//our buttons
		$scope.closeModal = function() {
      $uibModalInstance.close();
      $rootScope.$emit("ErrorClosed");
    };
	}
]);
