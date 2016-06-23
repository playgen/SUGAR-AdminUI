// Generated by CoffeeScript 1.10.0
'use strict';

/**
  * @ngdoc service
  * @name sgaAdminApp.listConfigs
  * @description
  * # listConfigs
  * Service in the sgaAdminApp.
 */
angular.module('sgaAdminApp').service('listConfigs', [
  '$http', 'config', function($http, config) {
    return {
      'users': {
        enabled: {
          create: true,
          edit: true,
          "delete": true
        },
        display: {
          listed: true,
          title: 'Users',
          single: 'user',
          plural: 'users',
          individualTitle: function(item) {
            return item.Name;
          },
          individualId: 'Id',
          icon: 'fa-users'
        },
        columns: [
          {
            title: 'ID',
            key: 'Id' 
          },
          {
            title: 'Name',
            key: 'Name'
          }
        ],
        editables: {
          view: [
            {
              display: 'ID',
              key: 'Id',
              type: 'text',
              viewonly: true
            }, {
              display: 'Name',
              key: 'Name',
              type: 'text'
            }, {
              display: 'Password',
              key: 'password',
              type: 'password'
            }
          ],
          create: [
            {
              key: 'Name',
              type: 'text'
            }, {
              key: 'Password',
              type: 'password'
            }
          ]
        },
        defaultNew: {
          'Name': '',
          'Password': ''
        },
        friends: {
          enabled: {
            create: true,
            edit: true,
            "delete": true
          },
          display: {
            listed: false,
            title: 'Friends',
            single: 'friend',
            plural: 'friends',
            individualTitle: function(item) {
              return item.Name;
            },
            individualId: 'Id',
            icon: 'fa-users'
          },
          ExistingPlayer: {
            exists: true
          },
          requests:{
              hasRequests: false
          },
          columns: [
            {
              title: 'Username',
              key: 'Name'
            }
          ]
        },
        userGroups: {
          enabled: {
            create: true,
            edit: true,
            "delete": true
          },
          display: {
            listed: false,
            title: 'Friends',
            single: 'friend',
            plural: 'friends',
            individualTitle: function(item) {
              return item.Name;
            },
            individualId: 'Id',
            icon: 'fa-users'
          },
          ExistingGroup: {
            exists: true
          },
          columns: [
            {
              title: 'Group Name',
              key: 'Name'
            // }, {
            //   title: 'Date Joined',
            //   key: 'createdDate'
            }
          ]
        }
      },
      'groups': {
        enabled: {
          create: true,
          edit: true,
          "delete": true
        },
        display: {
          listed: true,
          title: 'Groups',
          single: 'group',
          plural: 'groups',
          individualTitle: function(item) {
            return item.Name;
          },
          individualId: 'Id',
          icon: 'fa-users'
        },
        columns: [
          {
            title: 'Name',
            key: 'Name'
        //   }, {
        //     title: 'Members',
        //     key: 'members.length'
          }
        ],
        editables: {
          view: [
            {
              display: 'Description',
              key: 'description',
              type: 'text'
            }
          ],
          create: [
            {
              display: 'Name',
              key: 'Name',
              type: 'text'
            }
          ]
        },
         defaultNew: {
          'Name': ''
        },
        members: {
          enabled: {
            create: true,
            edit: true,
            "delete": true
          },
          display: {
            listed: false,
            title: 'Members',
            single: 'member',
            plural: 'members',
            individualTitle: function(item) {
              return item.Name;
            },
            individualId: 'Id',
            icon: 'fa-users'
          },
          ExistingPlayer: {
            exists: true
          },
          columns: [
            {
              title: 'Player Name',
              key: 'Name'
            // }, {
            //   title: 'Acceptor ID',
            //   key: 'AcceptorId'
            // }, {
            //     title: 'Accepted',
            //     key: 'Accepted'
            }
          ]
        }
      },
       'games': {
        enabled: {
          create: true,
          edit: true,
          "delete": true
        },
        display: {
          listed: true,
          title: 'Games',
          single: 'game',
          plural: 'games',
          individualTitle: function(item) {
            return item.Name;
          },
          individualId: 'Id',
          icon: 'fa-users'
        },
        columns: [
          {
            title: 'Name',
            key: 'Name'
          }
        ],
        editables: {
          view: [
            {
              display: 'Name',
              key: 'Name',
              type: 'text'
            }
          ],
          create: [
            {
              key: 'Name',
              type: 'text'
            }
          ]
        },
        defaultNew: {
          'Name': '',
        },
          achievements: {
          enabled: {
            create: true,
            edit: true,
            "delete": true
          },
            display: {
              listed: true,
              title: 'Achievements',
              single: 'achievement',
              plural: 'achievements',
              individualTitle: function(item) {
                return item.Name;
              },
              individualId: 'Id',
              icon: 'fa-users'
           },
           columns: [
           {
              title: 'Achievement Name',
              key: 'Name'
           }, {
               title: 'Key',
              key: 'Key'
            }, {
                title: 'Data Type',
              key: 'DataType'
            }, {
                title: 'Comparison Type',
              key: 'ComparisonType'
            }, {
                title: 'Value',
              key: 'Value'
           }
           ],
           editables: {
           view: [
           {
                display: 'Name',
                key: 'Name',
                type: 'text'
           }, {
                display: 'UpdatedDate',
                key: 'updatedDate',
                type: 'text',
                viewonly: true
           }, {
                display: 'CreatedDate',
                key: 'createdDate',
                type: 'text',
                viewonly: true
                }
            ],
            create: [
              {
                Description: 'Achievement Name',
                key: 'Name',
                type: 'text'
              }, {
                  Description: 'Key',
                  key: 'Key',
                  type: 'text'
              }, {
                  Description: 'DataType',
                  key: 'DataType',
                  type: 'dropdown',
                  values: [
                      {
                          id: '1',
                          Name: 'String'
                      },
                      {
                          id: '2',
                          Name: 'Long'
                      },
                      {
                          id: '3',
                          Name: 'Float'
                      },
                      {
                          id: '4',
                          Name: 'Boolean'
                      }
                  ]
                }, {
                    Description: 'ComparisonType',
                  key: 'ComparisonType',
                  type: 'dropdown',
                  values: [
                      {
                          id: '1',
                          Name: 'Equals'
                      },
                      {
                          id: '2',
                          Name: 'NotEqual'
                      },
                      {
                          id: '3',
                          Name: 'Greater'
                      },
                      {
                          id: '4',
                          Name: 'GreaterOrEqual'
                      },
                      {
                          id: '5',
                          Name: 'Less'
                      },
                      {
                          id: '6',
                          Name: 'LessOrEqual'
                      }
                  ]
                }, {
                    Description: 'Value',
                  key: 'Value',
                  type: 'text'
                }
            ]
            },
            defaultNew: {
              'Name': '',
              'Key': '',
              'DataType': 'float',
              'ComparisonType': 'GreaterOrEqual',
              'Value': '10'
            }
        }
      }
    };
  }
]);
