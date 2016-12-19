angular.module('sgaAdminApp').controller('GamesProfileAchievementsCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'AchievementsApi',
	function($scope, $stateParams, $location, modalManager, AchievementsApi) {
		$scope.itemtype = $stateParams.itemtype;
		$scope.itemId = $stateParams.itemId;

		$scope.items = [];
		$scope.criterias = 1;

		$scope.gameName = '';
		$scope.gameFound = true;

		$scope.isViewing = [];

		$scope.pagination = {
			perPage: 10,
			currentPage: 1
		};
		$scope.init = function() {
			if ($scope.itemId != "global")
			{
				AchievementsApi['achievements'].list($scope.itemId).then(function(res) {
					if (res.status === 200 && res.data != null) {
						$scope.items = res.data['response'];
						$scope.range();
						for (var i=0; i<$scope.items.length; i++)
						{
							$scope.isViewing.push(false);
						}
					}
				});
				AchievementsApi['games'].get($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data != null) {
					$scope.gameName = res.data['response'].name;
				} else {
					$scope.gameFound = false;
				}
				}).catch(function() {
					$scope.gameFound = false;
				});
			}
			else
			{
				AchievementsApi['achievements'].global().then(function(res){
					if (res.status === 200 && res.data != null) {
						$scope.items = res.data['response'];
						$scope.range();
					}
				});
				$scope.gameName = "Global";
				$scope.gameFound = true;
			}
			
		};
		$scope.range = function(min, max, step) {
			if ($scope.items == null)
				return 0;
			step = step || 1;
			min = 0;
			max = $scope.items.length - 1;
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
			var max = $scope.items[index].evaluationCriterias.length;
			var input = [];
			for (var i = min; i <= max; i += step) {
				input.push(i);
			}
			return input;
		};
		
		$scope.toggleView = function(n){
			// hide all other achievements
			for (var i=0; i<$scope.isViewing.length; i++)
			{
				if (i != n)
				{
					$scope.isViewing[i] = false;
				}
			}
			$scope.isViewing[n] = !$scope.isViewing[n];
		}

		$scope.remove = function(item) {
			return modalManager.open('deleteAchievement', {
				item: item,
				itemId: $scope.itemId
			});
		};

		$scope.back = function() {
			//go back to achievements game list
			$location.path("/achievements");
		};

		return $scope.$on('savedItem', function(event, args) {
			return $scope.init();
		});
		
	}
])