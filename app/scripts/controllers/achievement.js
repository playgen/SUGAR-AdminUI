// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc function
  * @name sgaAdminApp.controller:AchievementCtrl
  * @description
  * # AchievementCtrl
  * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('AchievementCtrl', [
  '$scope', '$routeParams', '$location', 'modalManager', 'GamesApi', function($scope, $routeParams, $location, modalManager, GamesApi) {
    $scope.itemtype = $routeParams.itemtype;
    $scope.itemId = $routeParams.itemId;
    

    $scope.items = [];
    $scope.criterias = 1;

    $scope.pagination = {
      perPage: 10,
      currentPage: 1
    };
    $scope.init = function() {
      GamesApi['games'].list().then(function(res) {
        if (res.status === 200 && res.data != null) {
          $scope.items = res.data;
          $scope.range();
        }
      });
    };
    $scope.range = function(min, max, step) {
        step = step || 1;
        min = 1;
        max = $scope.criterias;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
    $scope.addCriteria = function () {
      $scope.criterias++;
      return $scope.$broadcast("savedItem");
    }
    $scope.minusCriteria = function () {
      $scope.criterias--;
      return $scope.$broadcast("savedItem");
    }
    $scope.create = function() {
      var completeCriteria = "[";
      for (var i=0; i<$scope.criterias; i++)
      { 
          if (i != 0)
            completeCriteria += ", "
          completeCriteria += "{ " + "\"Key\": \"" + $scope.item[i+1].Key + "\", \"DataType\": " + $scope.item[i+1].DataType + ", \"ComparisonType\": " + $scope.item[i+1].ComparisonType + ", \"Value\": \"" + $scope.item[i+1].Value +  "\" }"; 
      }
      completeCriteria += "]";
        var achievement = "{ \"GameId\": " + $scope.itemId + ", \"Name\": \"" + $scope.item.Name + "\", \"CompletionCriteria\": " + completeCriteria + ", \"Reward\": \"\" }";
        GamesApi['achievements'].create(achievement).then(function(res){
          $location.path('/games/'+ $scope.itemId + '/achievements' );
        });
    };
    return $scope.$on('savedItem', function(event, args) {
      return $scope.init();
    });
  }
]);
