var menuControllers = angular.module('menuControllers', 
    [
        //'localDataService', 
        'ngAnimate', 'ngSanitize', 'ui.bootstrap'
    ]);

menuControllers.controller('menuController',
    ['$scope', function ($scope) {
        var self = this;

        $scope.isNavCollapsed = true;
        $scope.isCollapsed = false;

    }]);


