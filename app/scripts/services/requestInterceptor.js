// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc service
  * @name sgaAdminApp.RequestInterceptor
  * @description
  * # RequestInterceptor
  * Service in the sgaAdminApp.
 */
angular.module('sgaAdminApp').config([
  '$httpProvider', function($httpProvider) {
    return $httpProvider.interceptors.push("RequestInterceptor");
  }
]).factory('RequestInterceptor', [
  '$q', '$location', 'config', 'Auth', function($q, $location, config, Auth) {
    return {
      'request': function(reqConfig) {
        if (reqConfig.url.search(config.api.baseurl) !== -1) {
          Object.keys(config.headers).forEach(function(id) {
            var cookie;
            cookie = Auth.get(config.tokens[id]);
            if (cookie != null) {
              return reqConfig.headers[config.headers[id]] = cookie;
            }
          });
        }
        return reqConfig || $q.when(reqConfig);
      },
      'responseError': function(rejection) {
        if (rejection.config.url.search(config.api.baseurl) !== -1) {
          if (rejection.status === 401) {
            $location.search('return', $location.path());
            $location.path('/login');
          }
        }
        return $q.reject(rejection);
      }
    };
  }
]);
