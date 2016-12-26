var app = angular.module('F1AzApp',
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
                templateUrl: "./views/index.html",
                controller: "mainController",
                controllerAs: "home"
            })
            //.when("/about", {
            //    templateUrl: "app/views/about.html",
            //    controller: "profileController",
            //    controllerAs: "profile"
            //})
            .otherwise({
                redirectTo: '/'
            })
            ;

        $locationProvider
            .html5Mode(true);

    }]);
