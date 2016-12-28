
var app = angular
    .module('F1AzApp',
        [
            'mainControllers'
            ,'menuControllers'
            //, 'elearningControllers'
            //, 'profileControllers'
            , 'ngRoute'
        ]);

// Routing 
app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: "/app/views/home/index.html",
                controller: "mainController",
                controllerAs: "home"
            })
            .when("/about", {
                templateUrl: "/app/views/about/index.html"
            //    controller: "profileController",
            //    controllerAs: "profile"
            })
            .otherwise({
                redirectTo: '/home'
            })
            ;

        $locationProvider
            .html5Mode(true);

    }]);