angular.module('sgaAdminApp').controller('GamesProfileDetailsCtrl', [
	'$scope', '$stateParams', '$location', 'modalManager', 'GamesApi', 'LeaderboardsApi', 'AchievementsApi', 'SkillsApi',
	function($scope, $stateParams, $location, modalManager, GamesApi, LeaderboardsApi, AchievementsApi, SkillsApi) {

		$scope.itemId = $stateParams.itemId;

		$scope.CreateNewData = false;

		$scope.isEditing = [];
		$scope.EditButtonText = [];

    $scope.gameName = "";
    $scope.showGameSeed = false;
    $scope.gameSeed = {};

		$scope.init = function()
		{
			// if (!$scope.hasGetGameDetailsPermission)
			// {
			// 	return;
			// }

			GamesApi['games'].get($scope.itemId).then(function(res){
				if (res.status === 200 && res.data['response'] != null)
				{
          $scope.item = res.data['response'];
          var keys = Object.keys($scope.item);
          $scope.items = [];
          for (var i=0; i<keys.length; i++)
          {
            $scope.items[i] = {};
            $scope.items[i].index = i;
            $scope.items[i].key = keys[i];
            $scope.items[i].value = $scope.item[keys[i]];

            $scope.isEditing[i] = false;
            $scope.EditButtonText[i] = "Edit";
            if (keys[i] == 'name')
            {
              $scope.gameName = $scope.items[i].value;
            }
          }
				}
			});
		}
		$scope.addData = function()
		{
			$scope.CreateNewData = !$scope.CreateNewData;
		}
		$scope.create = function(formData)
		{
			// var formActorData = {groupId: $scope.itemId, key: formData.key, value: formData.value};

			// GamesApi['details'].create(formActorData).then(function(res){
			// 	$scope.init();
			// 	$scope.CreateNewData = false;
			// });
		}
		$scope.update = function(index, itemkey, newValue) {
			if (newValue == null)
			{
				// do nothing
				return;
      }
      var keys = Object.keys($scope.item);
      for (var i=0; i<keys.length; i++)
      {
        if (keys[i] == itemkey)
        {
          $scope.item[keys[i]] = newValue;
        }
      }
			// Update the detail
			GamesApi['games'].update($scope.itemId, $scope.item).then(function(res){
				$scope.init();
				$scope.isEditing[index] = false;
				$scope.EditButtonText[index] = "Edit";
			})
		}
		$scope.edit = function(index)
		{
			$scope.isEditing[index] = !$scope.isEditing[index];
			$scope.EditButtonText[index] = $scope.isEditing[index] ? "Cancel" : "Edit";
    }
    $scope.ShowGameSeed = function()
    {
      var gameSeed = {};
      // Game Name
      gameSeed.game = $scope.gameName;

      // Achievements
      AchievementsApi['achievements'].list($scope.itemId).then(function(res) {
				if (res.status === 200 && res.data['response'] != null) {
					gameSeed.achievements = res.data['response'];
          for (var i=0; i<gameSeed.achievements.length; i++)
          {
            delete gameSeed.achievements[i].id;
            gameSeed.achievements[i].gameId = null;
            for (var j=0; j<gameSeed.achievements[i].evaluationCriterias.length; j++)
            {
              delete gameSeed.achievements[i].evaluationCriterias[j].id;
            }
            for (var k=0; k<gameSeed.achievements[i].rewards.length; k++)
            {
              delete gameSeed.achievements[i].rewards[k].id;
            }
          }
        }

        // Leaderboards
        LeaderboardsApi['leaderboard'].list($scope.itemId).then(function(res){
          if (res.status === 200 && res.data['response'] != null) {
            gameSeed.leaderboards = res.data['response'];
            for (var i=0; i<gameSeed.leaderboards.length; i++)
            {
              delete gameSeed.leaderboards[i].id;
              gameSeed.leaderboards[i].gameId = null;

            }
          }

          // Skills
          SkillsApi['skills'].listSkills($scope.itemId).then(function(res) {
            if (res.status === 200 && res.data['response'] != null) {
              gameSeed.skills = res.data['response'];
              for (var i=0; i<gameSeed.skills.length; i++)
              {
                delete gameSeed.skills[i].id;
                gameSeed.skills[i].gameId = null;

                for (var j=0; j<gameSeed.skills[i].evaluationCriterias.length; j++)
                {
                  delete gameSeed.skills[i].evaluationCriterias[j].id;
                }
                for (var k=0; k<gameSeed.skills[i].rewards.length; k++)
                {
                  delete gameSeed.skills[i].rewards[k].id;
                }
              }
            }

            $scope.gameSeed = gameSeed;
            $scope.showGameSeed = true
          });
        });
      });
    }
    $scope.hideGameSeed = function()
    {
      $scope.showGameSeed = false;
    }
  }
]);
