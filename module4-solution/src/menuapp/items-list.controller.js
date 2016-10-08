(function () {
'use strict';

angular.module('MenuApp')
	.controller('ItemsListController', ItemsListController);

ItemsListController.$inject = ['$stateParams', 'items'];
function ItemsListController($stateParams, items) {
  var itemsList = this;
  itemsList.category = $stateParams.shortName;
  itemsList.items = items;
}

})();
