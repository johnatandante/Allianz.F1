var raceControllers = angular.module('raceControllers'
    , 
    [
        'localDataService'
    ]
    );

raceControllers.controller('raceController',
    ['$scope', 'RacesData', function ($scope, RacesData) {
        var self = this;
        self.Races = [];

        RacesData.query(function (data) {
            if (!data) {
                self.Races.clear();
                return;
            }

            self.Races = data.MRData.RaceTable.Races;
                
        });

    }]);


