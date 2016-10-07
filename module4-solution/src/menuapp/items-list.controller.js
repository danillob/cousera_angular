(function () {
'use strict';

angular.module('MenuApp')
	.controller('ItemsListController', ItemsListController);

ItemsListController.$inject = ['MenuDataService', '$stateParams'];
function ItemsListController(MenuDataService, $stateParams) {
  var itemsList = this;
  itemsList.category = $stateParams.shortName;
  var item = MenuDataService.getItemsForCategory(itemsList.category);

  item.then(function (response){
  	itemsList.items = response.menu_items;  	
  });
}

})();
