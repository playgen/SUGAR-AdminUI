'use strict'

###*
 # @ngdoc service
 # @name sgaAdminApp.listConfigs
 # @description
 # # listConfigs
 # Service in the sgaAdminApp.
###
angular.module 'sgaAdminApp'
	.service 'listConfigs', ['$http', 'config', ($http, config) ->

		# '':
		# 	enabled: # whether or not the different operations are enabled for this itemtype
		# 		create: true, edit: true, delete: true
		# 	display:
		# 		listed: true # whether or not to link to this in the sidebar
		# 		title: '' # Overall page title
		# 		single: '' # display term for a single instance of item
		# 		plural: '' # display term for multiple instances of item
		# 		individualTitle: (item) -> # generates a display name e.g. username
		# 		individualId: 'Id' # how to correctly identify items
		# 		icon: '' # What icon to display alongside navigation links
		# 	columns: [ # what columns there should be
		# 		{ title: '', type: '', key: '' } # title = what to display in the top (defaults to key), type = how to display value (default: text), key = what property is the value
		# 		{ title: '', type: '', val: ((item) ->) } # val = function that receives item, and returns the val for the cell
		# 	]
		# 	editables: # what values are editable on each modal
		# 		view: [
		# 				{ display: '', key: '', type: '', viewonly: true } # key = what property is the value, display = what to display in the top (defaults to key), type = what kind of input it is, viewonly = not editable (default: false)
		# 				{ display: '', type: 'link', itemtype: '', val: ((item) ->), id: ((item) ->) } # link to another item type
		# 			]
		# 		create: []
		# 	defaultNew: # a 'blank' instance of the object required for creating new items
		# 		'': ''

		'users':
			enabled:
				create: true, edit: true, delete: true
			display:
				listed: true
				title: 'Users'
				single: 'user'
				plural: 'users'
				individualTitle: (item) -> item.username
				individualId: 'id'
				icon: 'fa-users'
			columns: [
				{ title: 'Username', key: 'username' }
				{ title: 'Email', key: 'email' }
			]
			editables:
				view: [
						{ display: 'ID', key: 'id', type: 'text', viewonly: true }
						{ display: 'Username', key: 'username', type: 'text' }
						{ display: 'Email', key: 'email', type: 'email' }
						{ display: 'Is Enabled?', key: 'isEnabled', type: 'checkbox' }
						{ display: 'Type', key: 'type', type: 'text', viewonly: true }
						{ display: 'UpdatedDate', key: 'updatedDate', type: 'text', viewonly: true }
						{ display: 'CreatedDate', key: 'createdDate', type: 'text', viewonly: true }
					]
				create: [
					{ key: 'Username', type: 'text' }
					{ key: 'Password', type: 'password' }
					{ key: 'Email', type: 'email' }
				]
			defaultNew:
				'Username': ''
				'Password': ''
				'Email': ''
				'ActivationCode': '00000000-0000-0000-0000-000000000000'
				'IsEnabled': false
				'Type': 0
				'LastLoginIp': null

		'matches':
			enabled:
				create: false, edit: true, delete: true
			display:
				listed: true
				title: 'Matches'
				single: 'match'
				plural: 'matches'
				individualTitle: (item) -> "#{item.Users[0].Username} vs. #{item.Users[1].Username}"
				individualId: 'id'
				icon: 'fa-futbol-o'
			columns: [
				{ title: 'User - Home', val: ((item) -> item.Users[0].Username) }
				{ title: 'User - Away', val: ((item) -> item.Users[1].Username) }
				{ title: 'Finished?', type: 'boolean', key: 'Finished' }
			]
			editables:
				view: [
					{ display: 'ID', key: 'Id', type: 'text', viewonly: true }
					{
						display: 'User - Home',
						type: 'link',
						itemtype: 'users',
						val: (item) -> item.Users[0].Username,
						id: (item) -> item.Users[0].Id
					},
					{
						display: 'User - Away',
						type: 'link',
						itemtype: 'users',
						val: (item) -> item.Users[1].Username,
						id: (item) -> item.Users[1].Id
					},
					{ display: 'Is finished?', key: 'Finished', type: 'checkbox' }
				]

		'activities':
			enabled:
				create: true, edit: true, delete: true
			display:
				listed: true
				title: 'Activities'
				single: 'activity'
				plural: 'activities'
				individualTitle: (item) -> item.name
				individualId: 'id'
				icon: 'fa-star-o'
			columns: [
				{ title: 'Name', key: 'name' }
				{ title: 'Description', key: 'description' }
				{ title: 'Image', key: 'image' }
			]
			editables:
				view: [
					{ display: 'Name', key: 'name', type: 'text' }
					{ display: 'Description', key: 'description', type: 'text' }
					{ display: 'Image', key: 'image', type: 'text' }
					{ display: 'UpdatedDate', key: 'updatedDate', type: 'text', viewonly: true }
					{ display: 'CreatedDate', key: 'createdDate', type: 'text', viewonly: true }
				]
				create: [
					{ key: 'Name', type: 'text' }
					{ key: 'Description', type: 'text' }
					{ key: 'Image', type: 'text' }
				]
			defaultNew:
				'name': ''
				'description': ''
				'image': ''

		'goals':
			enabled:
				create: true, edit: true, delete: true
			display:
				listed: true
				title: 'Goals'
				single: 'goal'
				plural: 'goals'
				individualTitle: (item) -> item.Name
				individualId: 'Id'
				icon: 'fa-check'
			columns: [
				{ title: 'Description', key: 'description' }
				{ title: 'Image', key: 'image' }
			]
			editables:
				view: [
					{ display: 'Description', key: 'description', type: 'text' }
					{
						display: 'Activity',
						type: 'link',
						itemtype: 'activities',
						val: (item) -> item.activities[0].name,
						id: (item) -> item.activities[0].id
					}
				]
				create: [
					{ display: 'Description', key: 'description', type: 'text' }
					{
						display: 'Activity',
						key: 'activity',
						itemtype: 'activities',
						type: 'dropdown'
					}
				]
			defaultNew:
				'description': ''
				'activity': ''

			# columns: [
			# 	{ title: 'User - Home', val: ((item) -> item.Users[0].Username) }
			# 	{ title: 'User - Away', val: ((item) -> item.Users[1].Username) }
			# 	{ title: 'Finished?', type: 'boolean', key: 'Finished' }
			# ]
	]
