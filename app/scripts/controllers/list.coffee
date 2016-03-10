'use strict'

###*
 # @ngdoc function
 # @name sgaAdminApp.controller:ListCtrl
 # @description
 # # ListCtrl
 # Controller of the sgaAdminApp
###
angular.module 'sgaAdminApp'
	.controller 'ListCtrl', ['$scope', '$routeParams', '$location', 'modalManager', 'Api', 'listConfigs', ($scope, $routeParams, $location, modalManager, Api, listConfigs) ->

		$scope.itemtype = $routeParams.itemtype
		$scope.itemid = $routeParams.itemid
		$scope.config = listConfigs[$scope.itemtype]
		if (not $scope.config) then return $location.path '/'

		$scope.items = []

		$scope.pagination =
			perPage: 10
			currentPage: 1

		$scope.init = () ->
			Api[$scope.itemtype].list()
				.then (res) ->
					if res?.status is 200 and res.data?
						$scope.items = res.data
						if $routeParams.itemid?
							$scope.items.forEach (i) ->
								a = '' + i[$scope.config.display.individualId]
								b = '' + $scope.itemid
								if a is b then $scope.select i

		$scope.select = (item) ->
			modalManager.open 'edit',
				itemtype: $scope.itemtype
				item: item

		$scope.delete = (item) ->
			modalManager.open 'delete',
				itemtype: $scope.itemtype
				item: item

		$scope.create = () ->
			modalManager.open 'create',
				itemtype: $scope.itemtype
				
		$scope.$on 'savedItem', (event, args) ->
			$scope.init()
	]

	.controller 'EditModalCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'Api', 'modalManager', 'modaldata', ($scope, $rootScope, $uibModalInstance, Api, modalManager, modaldata) ->

		$scope.itemtype = modaldata.itemtype
		$scope.config = modaldata.config

		if modaldata.item?
			$scope.item = modaldata.item
		else if modaldata.itemid?
			$scope.item = {}
			Api[$scope.itemtype].get modaldata.itemid
				.then (data) ->
					if data?.data?
						$scope.item = data.data
					else
						$uibModalInstance.close()
		else
			$uibModalInstance.close()

		$scope.editables = $scope.config.editables.view
		$scope.editables.forEach (e) -> e.original = $scope.item[e.key]

		$scope.link = (itemtype, id) -> # open modal of another type
			modalManager.open 'edit',
				itemtype: itemtype
				itemid: id

		$scope.save = () ->
			Api[$scope.itemtype].update $scope.item.id, $scope.item
				.then () ->
					$uibModalInstance.close()
					$rootScope.$broadcast 'savedItem'

		$scope.close = () ->
			$scope.editables.forEach (e) -> $scope.item[e.key] = e.original
			$uibModalInstance.close()

	]

	.controller 'CreateModalCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'Api', 'modaldata', ($scope, $rootScope, $uibModalInstance, Api, modaldata) ->

		$scope.itemtype = modaldata.itemtype
		$scope.config = modaldata.config

		$scope.item = {}
		Object.keys($scope.config.defaultNew).forEach (k) -> $scope.item[k] = $scope.config.defaultNew[k]

		$scope.editables = $scope.config.editables.create

		$scope.save = () ->
			Api[$scope.itemtype].create $scope.item
				.then () ->
					$uibModalInstance.close()
					$rootScope.$broadcast 'savedItem'

		$scope.close = () ->
			$uibModalInstance.close()

	]

	.controller 'ConfirmDeleteModalCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'Api', 'modaldata', ($scope, $rootScope, $uibModalInstance, Api, modaldata) ->

		$scope.itemtype = modaldata.itemtype
		$scope.config = modaldata.config

		if modaldata.item?
			$scope.item = modaldata.item
		else if modaldata.itemid?
			$scope.item = {}
			Api[$scope.itemtype].get modaldata.itemid
				.then (data) -> console.log data

		$scope.delete = () ->
			Api[$scope.itemtype].delete $scope.item.id
				.then () ->
					$uibModalInstance.close()
					$rootScope.$broadcast 'savedItem'

		$scope.close = () ->
			$uibModalInstance.close()

	]
