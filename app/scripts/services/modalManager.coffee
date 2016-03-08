'use strict'

###*
 # @ngdoc service
 # @name sgaAdminApp.modalManager
 # @description
 # # modalManager
 # Service in the sgaAdminApp.
###
angular.module 'sgaAdminApp'
	.service 'modalManager', ['$uibModal', 'listConfigs', ($uibModal, listConfigs) ->

		configs =
			'edit': { temp: 'editModal.html', cont: 'EditModalCtrl' }
			'create': { temp: 'createModal.html', cont: 'CreateModalCtrl' }
			'delete': { temp: 'confirmDeleteModal.html', cont: 'ConfirmDeleteModalCtrl' }

		modalManager =
			open: (modaltype, data) ->
				if configs[modaltype]?
					if not data.config? then data.config = listConfigs[data.itemtype]

					$uibModal.open
						animation: true
						templateUrl: configs[modaltype].temp
						controller: configs[modaltype].cont
						size: 'lg'
						resolve:
							modaldata: () -> data

		modalManager

	]
