'use strict';

app.directive('landingPage', function () {
    return {
        templateUrl: 'landing-page.html',
        scope: {},
        controller: 'landingPageController'
    }
});

app.controller('landingPageController', ['$scope', '$http', function($scope, $http) {

    $http.get("http://localhost:5000/todos")
        .then(function(response) {
            $scope.todos = response.data;
            console.log($scope.todos);

        });



}]);
