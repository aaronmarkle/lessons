app = angular.module('dashboard', []);

app.controller('UserInfoController', function(userInfo, updateBio, updateTimes) {
  var vm = this;
  userInfo.getUserInfo().then(function(response) {
    vm.userInfo = response.data;
  });
  vm.updateBio = function() {
    newBio = {bio: vm.userInfo.bio};
    updateBio.setBio(newBio).then(function(response) {
      if (response.data.error) {
        vm.error = response.data.error;
      } else {
        vm.message = response.data.message;
      }
    });
  }
  vm.updateTimes = function() {
    newTimes = {availableTimes: vm.userInfo.availableTimes};
    updateTimes.setTimes(newTimes).then(function(response) {
      if (response.data.error) {
        vm.error = response.data.error;
      } else {
        vm.message = response.data.message;
      }
    });
  }
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
  function setBio(newBio) {
    return $http.post('setBio', newBio);
  }
  return {
    setBio: setBio
  }
});

app.factory('updateTimes', function($http) {
  function setTimes(newTimes) {
    return $http.post('setTimes', newTimes);
  }
  return {
    setTimes: setTimes
  }
});