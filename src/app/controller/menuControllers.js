var menuControllers = angular.module('menuControllers', 
    [
        //'localDataService', 
        'ngAnimate', 'ngSanitize', 'ui.bootstrap'
    ]);

menuControllers.controller('menu',
    ['$scope', function ($scope) {
        var self = this;

        $scope.isNavCollapsed = true;
        $scope.isCollapsed = false;

    }]);


