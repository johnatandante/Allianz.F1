var local = angular.module('localDataService', ['ngResource']);
var urlRandom = "?" + +Math.random();

local.factory('RacesData', ['$resource',
  function($resource){
      return $resource('/app/mocks/races.json' + urlRandom, {}, {
        query: {
            method: 'GET',
            isArray: false
        }
    });
  }]);

  
local.factory('DriversData', ['$resource', function($resource){
      return $resource('/app/mocks/drivers.json', {}, {
        query: {
            method: 'GET',
            isArray: false
        }
    });
}]);


local.factory('CircuitsData', ['$resource', function($resource){
      return $resource('/app/mocks/circuits.json', {}, {
        query: {
            method: 'GET',
            isArray: false
        }
    });
}]);