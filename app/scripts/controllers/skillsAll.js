// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc function
  * @name sgaAdminApp.controller:GroupsCtrl
  * @description
  * # GroupsCtrl
  * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('SkillsAllCtrl', [
  '$scope', '$routeParams', '$location', 'modalManager', 'SkillsApi', function($scope, $routeParams, $location, modalManager, SkillsApi) {
    $scope.itemtype = $routeParams.itemtype;
    $scope.itemId = $routeParams.itemId;
    
    $scope.gameFound = true;
    $scope.gameName = '';

    $scope.items = [];
    $scope.pagination = {
      perPage: 10,
      currentPage: 1
    };
    $scope.init = function() {
      return SkillsApi['games'].listSkills($scope.itemId).then(function(res) {
        if (res.status === 200 && res.data != null) {
          $scope.items = res.data;
        }
      });
    };
       SkillsApi['games'].get($scope.itemId).then(function(res){
        if (res.status === 200 && res.data != null)
        {
          $scope.gameFound = true;
          $scope.gameName = res.data.Name;
        }
        else 
        {
          $scope.gameFound = false;
        }
      }).catch(function () {
        $scope.gameFound = false;
      });
      $scope.range = function(min, max, step) {
        if ($scope.items == null)
          return 0;
        step = step || 1;
        min = 0;
        max = $scope.items.length-1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
    $scope.criteriaRange = function(index) {
        if ($scope.items == null)
          return 0;
        var step = 1;
        var min = 1;
        var max = $scope.items[index].CompletionCriteria.length;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
    $scope.addSkill = function (item) {
      return modalManager.open('newSkill', {} );
    }
    return $scope.$on('savedItem', function(event, args) {
      return $scope.init();
    });
  }
]).controller('CreateSkillModalCtrl', [
  '$scope', '$rootScope', '$uibModalInstance', 'SkillsApi', 'modaldata', function($scope, $rootScope, $uibModalInstance, SkillsApi, modaldata) {
    $scope.itemtype = modaldata.itemtype;
    $scope.config = modaldata.config;
    $scope.item = {};
    
    $scope.save = function() {
        return SkillsApi['games'].createSkill($scope.item).then(function() {
            $uibModalInstance.close();
            return $rootScope.$broadcast('savedItem');
        });
    };
    return $scope.close = function() {
      return $uibModalInstance.close();
    };
  }
]);
