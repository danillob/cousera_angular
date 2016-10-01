(function () {

	angular.module('NarrowItDownApp', [])
			.controller('NarrowItDownController', NarrowItDownController)
			.service('MenuSearchService', MenuSearchService)
			.directive('foundItems', FoundItems)
			.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

	function FoundItems() {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				foundItems: '=foundItems'
			}
		};

  		return ddo;
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var nitc = this;
		
		nitc.searchTerm = "";
		nitc.foundItems = "";

		nitc.getMatchedMenuItems = function(searchTerm){

			if (nitc.searchTerm === ""){
				console.log ('Nothing found.');
			}
			else{
				var found = MenuSearchService.getMatchedMenuItems(nitc.searchTerm);
				
				found.then(function (foundItems) {
					if (foundItems.length != 0){
						nitc.foundItems = foundItems;
						console.log('Encontrou ' + foundItems.length + ' pratos.');

						for (var i = 0; i < foundItems.length; i++){
							console.log('Nome: ' + foundItems[i].name + ' - Descrição: ' + foundItems[i]	.description);
						}	
					}
					else{
						console.log('Nothing found.');
					} 
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		}
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath', '$q']
	function MenuSearchService($http, ApiBasePath, $q){
		var msSvc = this;

		msSvc.getMatchedMenuItems = function(searchTerm){

			var result = $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json"),
			})
			.then(function (response){
				var items = response.data;
				var foundItems = [];
								
				for(var i = 0; i < items.menu_items.length; i++){
					if(items.menu_items[i].description.indexOf(searchTerm) != -1){
						foundItems.push(items.menu_items[i]);
					}
				}

				return foundItems;				
			});

			return result;
		};

	}

})();