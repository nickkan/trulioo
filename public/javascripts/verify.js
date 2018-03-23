/// <reference path='../../typings/main/ambient/node/node.d.ts'/>
/// <reference path='../../typings/main/ambient/express/express.d.ts'/>
/// <reference path='../../typings/main/ambient/angular/angular.d.ts'/>
angular.module('verify', [])
    .controller('mainController', function ($scope, $http) {
        $scope.comics = [];
        $scope.verified = false;
        $scope.failed = false;

        // Get all todos
        // $http.get('/api/v1/project/')
        //     .success(function (data) {
        //     $scope.comics = data;
        //     console.log(data);
        // })
        //     .error(function (error) {
        //     console.log('Error: ' + error);
        // });
        $scope.callSearch = function () {
            $http.post('api/v1/verify', {data: {firstname: $scope.firstname, lastname: $scope.lastname, birthdate: $scope.birthdate}})
                .success(function (data) {
                    console.log(data);
                    if (data.verified) {
                        $scope.verified = true;
                        $scope.failed = false;
                    } else {
                        $scope.failed = true;
                        $scope.verified = false;
                    }
                })
        }
    });
//# sourceMappingURL=feed.js.map