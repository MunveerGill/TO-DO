/**
 * Created by munveergill on 12/03/2016.
 */
var app = angular.module('app', ['ui.router','ui.bootstrap']);

/**
 * Created by munveergill on 12/03/2016.
 */
app.config(function ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");

    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "home-screen.html",
            controller: "HomeScreen"
        });
});
/**
 * Created by munveergill on 12/03/2016.
 */
app.controller('HomeScreen', function ($scope, $state) {

    var init = function () {

    };

    init();
});
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

/**
 * Created by munveergill on 12/03/2016.
 */
'use strict';

app.directive('navBar', function () {
    return {
        templateUrl: 'nav-bar.html',
        scope: {},
        controller: 'navBarController'
    }
});

app.controller('navBarController', ['$scope', function($scope) {


}]);
