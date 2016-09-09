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
