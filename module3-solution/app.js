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
				items: '<',
				error: '<',
				onRemove: '&'
			}
		};

  		return ddo;
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var nidc = this;
		
		nidc.searchTerm = "";
		nidc.foundItems = "";
		nidc.errorMessage = "";

		nidc.getMatchedMenuItems = function(searchTerm){

			nidc.foundItems = "";
			nidc.errorMessage = "";

			if (nidc.searchTerm === ""){
				nidc.errorMessage = 'Nothing found.';
				console.log('Empty input.');
			}
			else{
				var found = MenuSearchService.getMatchedMenuItems(nidc.searchTerm);
				
				found.then(function (foundItems) {
					if (foundItems.length != 0){
						nidc.foundItems = foundItems;
						console.log('Found ' + foundItems.length + ' item(s).');
					}
					else{
						nidc.errorMessage = 'Nothing found.';
						console.log('Nothing found.');
					} 
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		}

		nidc.removeItem = function(itemIndex){
			var item = nidc.foundItems[itemIndex];
			console.log("Item " + item.name + " (" + item.short_name + ", " + item.description + ") removed.");
			nidc.foundItems.splice(itemIndex, 1);
			console.log("New array size: " + nidc.foundItems.length);

			if (nidc.foundItems.length === 0){
				nidc.errorMessage = "All items removed.";
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