// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc service
  * @name sgaAdminApp.modalManager
  * @description
  * # modalManager
  * Service in the sgaAdminApp.
 */
angular.module('sgaAdminApp').service('modalManager', [
  '$uibModal', 'listConfigs', function($uibModal, listConfigs) {
    var configs, modalManager;
    configs = {
      'edit': {
        temp: 'editModal.html',
        cont: 'EditModalCtrl'
      },
      'create': {
        temp: 'createModal.html',
        cont: 'CreateModalCtrl'
      },
      'delete': {
        temp: 'confirmDeleteModal.html',
        cont: 'ConfirmDeleteModalCtrl'
      },
      'showAlliances': {
        temp: 'showAllianceModal.html',
        cont: 'showAllianceModalCtrl'
      },
      'showMembers': {
        temp: 'showMembersModal.html',
        cont: 'showMembersModalCtrl'
      },
      'showFriends': {
        temp: 'showFriendsModal.html',
        cont: 'showFriendsModalCtrl'
      },
      'showFriendRequests': {
          temp: 'showFriendRequestsModal.html',
          cont: 'showFriendRequestsModalCtrl'
      },
      'showGroups': {
        temp: 'showGroupsModal.html',
        cont: 'showGroupsModalCtrl'
      },
      'addFriend': {
        temp: 'addFriendModal.html',
        cont: 'addFriendModalCtrl'
      },
      'addMember': {
        temp: 'addMemberModal.html',
        cont: 'addMemberModalCtrl'
      },
      'addGroup': {
        temp: 'addGroupModal.html',
        cont: 'addGroupModalCtrl'
      }
    };
    modalManager = {
      open: function(modaltype, data) {
        if (configs[modaltype] != null) {
          if (data.config == null) {
            data.config = listConfigs[data.itemtype];
          }
          return $uibModal.open({
            animation: true,
            templateUrl: configs[modaltype].temp,
            controller: configs[modaltype].cont,
            size: 'lg',
            resolve: {
              modaldata: function() {
                return data;
              }
            }
          });
        }
      }
    };
    return modalManager;
  }
]);
