(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['user'];
function MyInfoController(user) {
  var myInfoCtrl = this;
  myInfoCtrl.user = user;
  myInfoCtrl.flag = true;

  if (myInfoCtrl.user.firstName != ""){
  	myInfoCtrl.flag = false;
  }

}


})();