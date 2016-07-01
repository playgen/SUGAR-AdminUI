// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc service
  * @name sgaAdminApp.Api
  * @description
  * # Api
  * Service in the sgaAdminApp.
 */
angular.module('sgaAdminApp').service('AchievementsApi', [
  '$http', 'config', function($http, config) {
    return {
      'achievements': {
          list: function(id){
              return $http.get(config.api.baseurl + '/achievements/game/' + id + '/list');
          },
          create: function(item) {
            return $http.post(config.api.baseurl + '/achievements/create', item);  
          },
          "delete": function(id){
              return $http["delete"](config.api.baseurl + '/achievements/' + id);
          }
      },
      'games':{
          list: function(){
              return $http.get(config.api.baseurl + '/game/list')
          },
          get: function(id) {
            return $http.get(config.api.baseurl + '/game/findbyid/' + id);  
          },
          create: function(item) {
            return $http.post(config.api.baseurl + '/game', item);  
          },
          "delete": function(id){
              return $http["delete"](config.api.baseurl + '/game/' + id);
          }
      }
    };
  }
]);