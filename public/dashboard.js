app = angular.module('dashboard', ['ngFileUpload']);

app.controller('UserInfoController', function(userInfo, updateBio, updateTimes) {
  var vm = this;
  userInfo.getUserInfo().then(function(response) {
    vm.userInfo = response.data;
  });
  vm.updateBio = function() {
    newBio = {bio: vm.userInfo.bio};
    updateBio.setBio(newBio).then(function(response) {
      if (response.data.error) {
        vm.bioError = response.data.bioError;
      } else {
        vm.bioMessage = response.data.bioMessage;
      }
    });
  }
  vm.updateTimes = function() {
    newTimes = {availableTimes: vm.userInfo.availableTimes};
    updateTimes.setTimes(newTimes).then(function(response) {
      if (response.data.error) {
        vm.timesError = response.data.timesError;
      } else {
        vm.timesMessage = response.data.timesMessage;
      }
    });
  }
});

app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', 'userInfo', function($scope, Upload, $timeout, userInfo) {
  $scope.uploadFiles = function(file, errFiles) {
    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
        url: 'upload',
        data: {file: file}
      });
      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }   
  }
}]);

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