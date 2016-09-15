(function () {
	'use strict';

	angular.module('LunchCheck', [])

		.controller('LunchCheckController', LunchCheckController);

		LunchCheckController.$inject = ['$scope', '$filter'];

		function LunchCheckController($scope, $filter){
			$scope.lunchItems = '';
			$scope.lunchMessage = '';

			$scope.checkLunch = function (){
				var items = $scope.lunchItems;
				var count = (items.match(/,/g) || []).length;
				
				if (items == ''){
					$scope.lunchMessage = "Please Enter Data First";
				}
				else{
					if (count < 3){
						$scope.lunchMessage = "Enjoy!";
					}
					else{
						$scope.lunchMessage = "Too Much!";
					}
				}
			};

		}
}) ();