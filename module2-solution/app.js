(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
			.controller('ToBuyShoppingController', ToBuyShoppingController)
			.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
			.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyShoppingController(ShoppingListCheckOffService){
		var toBuy = this;
		toBuy.items = ShoppingListCheckOffService.getToBuyItems();

		toBuy.removeItem = function (itemIndex) {
    		ShoppingListCheckOffService.removeItem(itemIndex);
  		};
	}

	AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtShoppingController(ShoppingListCheckOffService){
		var alreadyBought = this;
		alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
	}

	function ShoppingListCheckOffService() {
		var service = this;

		// List of toBuy shopping items
		var toBuyItems = [	{name: "cookie", quantity: 1}, 
							{name: "eggs", quantity: 2}, 
							{name: "carrots", quantity: 3},
							{name: "tomatoes", quantity: 4},
							{name: "slices of cheese", quantity: 5},
							{name: "bottles of milk", quantity: 6}
						];

		//List of bought shopping items
		var boughtItems = [];

		service.removeItem = function (itemIndex) {
			boughtItems.push(toBuyItems[itemIndex]);
			toBuyItems.splice(itemIndex, 1);
		};

		service.getToBuyItems = function () {
			return toBuyItems;
		};

		service.getBoughtItems = function () {
			return boughtItems;
		};
	}

}) ();