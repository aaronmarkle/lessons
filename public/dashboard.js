app = angular.module('dashboard', []);

app.controller('UserInfoController', function(userInfo) {
  var vm = this;
  userInfo.getUserInfo().then(function(response) {
    vm.userInfo = response.data;
  });
});

app.factory('userInfo', function($http) {
  function getUserInfo() {
    return $http.get('userInfo');
  }
  return {
    getUserInfo: getUserInfo
  }
})