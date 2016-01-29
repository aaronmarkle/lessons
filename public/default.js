app = angular.module('surfSearch', ['beachesModule']);

app.controller('SearchController', function(beaches, $http) {
  var vm = this;
  vm.options = beaches.getBeaches();
  vm.selectedBeach = {};
  vm.search = function() {
    $http.post('search', vm.selectedBeach)
      .success(function(data) {
        vm.results = data;
      })
  }
});