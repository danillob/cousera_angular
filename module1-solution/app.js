(function () {
	'use strict';

	angular.module('LunchCheck', [])

		.controller('LunchCheckController', LunchCheckController);

		LunchCheckController.$inject = ['$scope', '$filter'];

		function LunchCheckController($scope, $filter){
			$scope.lunchItems = '';
			$scope.lunchMessage = '';
			$scope.inputMessage = '';
			$scope.messageClass = '';
			$scope.inputClass = '';

			$scope.checkLunch = function (){
				var items = $scope.lunchItems;
				var count = countItems(items);

				if (count == 0){
					$scope.lunchMessage = "Please Enter Data First";
					$scope.messageClass = 'red';
					$scope.inputClass = 'redBorder';
				}
				else{
					$scope.messageClass = 'green';
					$scope.inputClass = 'greenBorder';
					if (count <= 3){
						$scope.lunchMessage = "Enjoy!";
					}
					else{
						$scope.lunchMessage = "Too Much!";
					}
				}
			};

			function countItems(str){
				$scope.inputMessage = '';
				var num;

				if (str.substr(0,1) == ','){
					$scope.inputMessage += 'There is no item before the first comma. Item will be ignored. ';
					str = str.substr(1, str.length);
					//console.log('%' + str + '%');
				}

				if (str.substr(-1) == ','){
					$scope.inputMessage += 'There is no item after the last comma. Item will be ignored. ';
					str = str.substr(0, str.length - 1);
					//console.log('%' + str + '%');		
				}

				if (str != ''){
					num = (str.match(/,/g) || []).length;

					if (num == 0){
						num = 1;
					}
					else{
						var vetor = str.split(',');
						var numError = 0;
						//console.log(vetor);
						//console.log(vetor.length);
						num = 0;

						for (var i = 0; i <= (vetor.length - 1); i++){
							if (vetor[i].trim() != ''){
								num += 1;
							}
							else{
								numError += 1;
								if (numError == 1){
									$scope.inputMessage += 'There are two consecutive commas without item inside. Item will be ignored. ';
								}
							}
						}

						if (numError > 1){
							$scope.inputMessage += '[' + numError + ' times]';
						}
					}
				}
				else{
					num = 0;
				}

				//console.log(num);
				return num;
			}

		}

}) ();