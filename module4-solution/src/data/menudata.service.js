(function () {
  'use strict';

  angular.module('Data')
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  MenuDataService.$inject = ['$http', 'ApiBasePath'];
  function MenuDataService($http, ApiBasePath) {
    var service = this;

    // Returns a promise, NOT items array directly
    service.getAllCategories = function () {
    
      var result = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json"),
      })
      .then(function (response){
        var items = response.data;
        return items;
      });

      return result;
    };

    service.getItemsForCategory = function (shortName){
     var result = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
        params: {"category": shortName}
      })
      .then(function (response){
        var items = response.data.menu_items;
        return items;
      });

      return result;
    }; 

  }

})();
