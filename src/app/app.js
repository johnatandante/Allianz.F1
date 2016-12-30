
var app = angular
    .module('F1AzApp',
        [
            'mainControllers'
            ,'menuControllers'
            , 'raceControllers'
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
            .when('/races', {
                templateUrl: "/app/views/races/index.html",
                controller: "raceController",
                controllerAs: "races"
            })

            //.when('/circuits', {
            //    templateUrl: "/app/views/circuits/index.html",
            //    controller: "circuitController",
            //    controllerAs: "circuits"
            //})
            //.when('/drivers', {
            //    templateUrl: "/app/views/drivers/index.html",
            //    controller: "driversController",
            //    controllerAs: "drivers"
            //})

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