app = angular.module('dashboard', []);

app.controller('UserInfoController', function(userInfo, updateBio) {
  var vm = this;
  vm.updateBio = function() {
    updateBio.setBio(vm.bio).then(function(response) {
      console.log(response);
    });
  }
  vm.updateTimes = function() {
    console.log('times submitted');
  }
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
});

app.factory('updateBio', function($http) {
  function setBio() {
    return $http.post('setBio', newBio);
  }
  return {
    setBio: setBio
  }
});