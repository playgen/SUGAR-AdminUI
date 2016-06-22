// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc function
  * @name sgaAdminApp.controller:LoginCtrl
  * @description
  * # LoginCtrl
  * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('LoginCtrl', [
  '$scope', '$location', 'config', 'Auth', 'User', function($scope, $location, config, Auth, User) {
    $scope.user = {
      Name: '',
      Password: ''
    };
    $scope.register = function () {
        User.register($scope.user).then(function(res){
            //automatically log in
            $scope.submit();
        });
    }
    return $scope.submit = function() {
      return User.login($scope.user).then(function(res) {
        var ref, returnPath;
        if ((res != null ? res.status : void 0) === 200 && (((ref = res.data) != null ? ref.Token : void 0) != null)) {
          Auth.set(config.tokens.session, res.data.Token);
          returnPath = $location.search()["return"];
          if (returnPath != null) {
            $location.search('return', null);
            return $location.path(returnPath);
          } else {
            return $location.path('/');
          }
        }
      });
    };
  }
]);
