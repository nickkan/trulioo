///<reference path='../typings/main/ambient/node/node.d.ts'/>
///<reference path='../typings/main/ambient/express/express.d.ts'/>
///<reference path='../typings/main/ambient/angular/angular.d.ts'/>
///<reference path='../typings/main/ambient/ng-dialog/ng-dialog.d.ts'/>

angular.module('profile', ['ngDialog'])

.controller('mainController', function($scope, $http, ngDialog) {
  $scope.passwordChange = {};
  $scope.emailChange = {};

  $scope.changePassword = function() {
    $http.post('/changePassword', $scope.passwordChange)
  };

  $scope.changeEmail = function() {
    $http.post('/changeEmail', $scope.emailChange)
    .success(function() {
      ngDialog.open({ template: 'success' });
    })
  };
});
