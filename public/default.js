app = angular.module('surfSearch', ['beachesModule', 'formlyApp']);

app.controller('SearchController', function(beaches, $http) {
  var vm = this;
  vm.options = beaches.getBeaches();
  vm.search = function() {
    if (vm.selectedBeach) {
      $http.post('search', vm.selectedBeach)
        .success(function(data) {
          vm.results = data;
        })
    }
  }
});