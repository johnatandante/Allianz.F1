angular.module('menuControllers', 
    [
        //'localDataService', 
        'ngAnimate', 'ngSanitize', 'ui.bootstrap'
    ])
    .controller('menuController',
    ['$scope', function ($scope) {
        
        $scope.isNavCollapsed = true;
        $scope.isCollapsed = false;

        $scope.userProfile = {
            imgUrl: '../../assets/img-news.png',
            userName: 'JohnatanDante'
        };

    }])
    .directive('menuNavigation', function(){
        return {
            restrict: 'E',
            templateUrl: '../../app/views/shared/menu.html'
            , controller: 'menuController'
        };

    });


