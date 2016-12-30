// Open Data provided by http://ergast.com/mrd/

var open = angular.module('openDataService', ['ngResource']);
// è un servizio, non dovremmo massacrarlo di chimate: basta la cache
//var urlRandom = "?" + +Math.random();

open.factory('RacesData', ['$resource',
  function($resource){
      return $resource('http://ergast.com/api/f1/current.js' + urlRandom, {}, {
        query: {
            method: 'GET',
            isArray: false
        }
    });
  }]);

open.factory('DriversData', ['$resource', function($resource){
      return $resource('http://ergast.com/api/f1/2016/drivers.json', {}, {
        query: {
            method: 'GET',
            isArray: false
        }
    });
}]);

open.factory('CircuitsData', ['$resource', function($resource){
      return $resource('http://ergast.com/api/f1/2016/circuits.json', {}, {
        query: {
            method: 'GET',
            isArray: false
        }
    });
}]);
