(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'UserService', 'ApiPath'];
function SignUpController(MenuService, UserService, ApiPath) {
  var signUpCtrl = this;
  signUpCtrl.success = false;
  signUpCtrl.error = false;
  signUpCtrl.errorMessage; //"No such menu number exists."

  signUpCtrl.submit = function () {
  	
  	//Test to see if there's the menu item inserted
  	if (signUpCtrl.user.favoriteDish === "" || signUpCtrl.user.favoriteDish === undefined){
  		signUpCtrl.errorMessage = "Please insert a favorite dish.";
  		signUpCtrl.error = true;
  		return false;
  	}

  	signUpCtrl.data = MenuService.getMenuItem(signUpCtrl.user.favoriteDish);

  	signUpCtrl.data.then(function (response) {
      	// Deu tudo certo
	  	signUpCtrl.error = false;
	  	signUpCtrl.user.dishName = response.data.name;
	  	signUpCtrl.user.dishDescription = response.data.description;
	    signUpCtrl.user.dishImage = ApiPath + '/images/' + signUpCtrl.user.favoriteDish + '.jpg';
	    UserService.setUser(signUpCtrl.user);
	    signUpCtrl.success = true;
  	}, function(){
  		// Erro 500
  		signUpCtrl.errorMessage = "No such menu number exists.";
  		signUpCtrl.error = true;
  	});
 	
  };

}


})();