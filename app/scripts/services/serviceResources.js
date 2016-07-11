// Generated by CoffeeScript 1.10.0
'use strict';

/**
 * @ngdoc service
 * @name sgaAdminApp.Api
 * @description
 * # Api
 * Service in the sgaAdminApp.
 */
angular.module('sgaAdminApp').service('ResourcesApi', [
	'$http', 'config',
	function($http, config) {
		return {
			'games': {
				list: function() {
					return $http.get(config.api.baseurl + '/game/list')
				},
				listResources: function(id) {
					return $http.get(config.api.baseurl + '/game/resources/find/' + id);
				},
				get: function(id) {
					return $http.get(config.api.baseurl + '/game/findbyid/' + id);
				},
				create: function(item) {
					return $http.post(config.api.baseurl + '/game', item);
				},
				createResource: function(item) {
					return $http.post(config.api.baseurl + '/game/resources', item);
				},
				"delete": function(id) {
					return $http["delete"](config.api.baseurl + '/game/' + id);
				}
			},
			'User': {
				list: function() {
					return $http.get(config.api.baseurl + '/user/list');
				},
				get: function(id) {
					return $http.get(config.api.baseurl + '/user/findbyid/' + id)
				}
			},
			'Group': {
				list: function() {
					return $http.get(config.api.baseurl + '/group/list');
				},
				get: function(id) {
					return $http.get(config.api.baseurl + ("/group/findbyid/" + id));
				}
			}
		};
	}
]);
