// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc function
  * @name sgaAdminApp.controller:AchievementCtrl
  * @description
  * # AchievementCtrl
  * Controller of the sgaAdminApp
 */
angular.module('sgaAdminApp').controller('AchievementNewCtrl', [
  '$scope', '$routeParams', '$location', 'modalManager', 'AchievementsApi', function($scope, $routeParams, $location, modalManager, AchievementsApi) {
    $scope.itemtype = $routeParams.itemtype;
    $scope.itemId = $routeParams.itemId;

    $scope.gameFound = true;

    $scope.items = [];
    $scope.criterias = 1;

    $scope.pagination = {
      perPage: 10,
      currentPage: 1
    };

    //make sure that the id is valid to prevent bad data being sent, if not push back to achievemnt screen
    AchievementsApi['games'].get($scope.itemId).then(function(res){
    if (res.status === 200 && res.data != null)
    {
      
    }
    else 
    {
      $location.path("/games/" + $scope.itemId + "/achievements");
    }
    }).catch(function () {
      $location.path("/games/" + $scope.itemId + "/achievements");
    });
    $scope.init = function() {
      AchievementsApi['games'].list().then(function(res) {
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

      $scope.achievement = {};
      $scope.achievement.GameId = $scope.itemId;
      $scope.achievement.Name = $scope.item.Name;
      $scope.achievement.Description = $scope.item.Description;
      $scope.achievement.ActorType = $scope.item.ActorType;
      $scope.achievement.Token = $scope.item.Token;

      $scope.achievement.CompletionCriteria = [];
      for (var i=0; i<$scope.criterias; i++)
      { 
        $scope.achievement.CompletionCriteria[i] = {};
          $scope.achievement.CompletionCriteria[i].Key = $scope.item[i+1].Key;
          $scope.achievement.CompletionCriteria[i].DataType = $scope.item[i+1].DataType;
          $scope.achievement.CompletionCriteria[i].ComparisonType = $scope.item[i+1].ComparisonType;
          $scope.achievement.CompletionCriteria[i].Value = $scope.item[i+1].Value; 
      }
      $scope.achievement.Reward = [];
      $scope.achievement.Reward[0] = {};
      $scope.achievement.Reward[0].Key = $scope.item.Reward.Key;
      $scope.achievement.Reward[0].DataType = $scope.item.Reward.DataType;
      $scope.achievement.Reward[0].Value = $scope.item.Reward.Value;   


      // var f = document.getElementById('file').files[0];
      // var r =  new FileReader();
      // r.onloadend = function(e){
      //   var data = e.target.result;
      // }
      // r.readAsArrayBuffer(f);

      AchievementsApi['achievements'].create($scope.achievement).then(function(res){
        $location.path('/achievements/'+ $scope.itemId);
      });
    };
    $scope.back = function (){
      //go back to list of achievements for this game
      $location.path('/achievements/'+ $scope.itemId);
    };
    return $scope.$on('savedItem', function(event, args) {
      return $scope.init();
    });
  }
]);
