angular.module('mainControllers', [
                    //'localDataService', 'ngAnimate', 'ngSanitize', 
                    //'ui.bootstrap'
    ])
    .controller('mainController',
        ['$scope', function ($scope) {
            // var self = this;

            }])
    .directive("homeFooter", function() {
        return {
            restrict: 'E',
            templateUrl: "/app/views/shared/footer.html"
        }
    });


