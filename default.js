var app = angular.module('formlyApp', ['formly', 'formlyBootstrap']);

app.controller('MainController', function(beach) {
  var vm = this;
  vm.rental = {};
  vm.rentalFields = []
});

app.factory('beach', function() {
  function getBeaches() {
    return [
      {
        "name": "Huntington Beach",
        "value": "huntington"
      },
      {
        "name": "Seal Beach",
        "value": "seal"
      },
      {
        "name": "Newport Beach",
        "value": "newport"
      }
    ];
  }
  return {
    getBeaches: getBeaches
  }
});