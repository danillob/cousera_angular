(function () {
"use strict";

angular.module('public')
.service('UserService', UserService);


UserService.$inject = ['$http', 'ApiPath'];
function UserService($http, ApiPath) {
  var service = this;
  service.user = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    favoriteDish: ""
  };

  service.setUser = function(user){
    service.user = user;
  };

  service.getUser = function(){
    return service.user;
  };

}



})();