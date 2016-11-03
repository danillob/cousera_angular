(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserService'];
function SignUpController(UserService) {
  var signUpCtrl = this;
  signUpCtrl.success = false;
  signUpCtrl.error = false;

  signUpCtrl.submit = function () {
    UserService.setUser(signUpCtrl.user);
    signUpCtrl.success = true;
  };

}


})();