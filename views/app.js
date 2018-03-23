angular.module('viewContent', [])

.controller('mainController', function($scope, $http) {

    $scope.id = 1;
    $scope.content = {};

    // Get all todos
    $http.get('/api/v1/content/' + $scope.id)
        .success(function(data) {
            $scope.content = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
});
