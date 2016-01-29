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

//Signup form Module
var formlyApp = angular.module('formlyApp', ['formly', 'formlyBootstrap', 'beachesModule']);

formlyApp.controller('MainController', function(beaches, $http) {
  var vm = this;
  vm.processForm = function() {
    $http.post('signup-submit', vm.instructor)
      .success(function(data) {
        console.log(data);
      })
  }

//Formly Config
  vm.instructor = {};
  vm.instructorFields = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email address',
        placeholder: 'Enter email',
        required: true
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: 'Choose a password',
        required: true
      }
    },
    {
      key: 'firstName',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'First Name',
        placeholder: 'Enter your first name',
        required: true
      }
    },
    {
      key: 'lastName',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Last Name',
        placeholder: 'Enter your last name',
        required: true
      }
    },
    {
      key: 'phone',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Phone:',
        placeholder: 'Enter your phone number',
        required: true
      }
    },
    {
      key: 'beaches',
      type: 'select',
      templateOptions: {
        label: 'Beaches',
        options: beaches.getBeaches(),
        required: true
      }
    },
  ];
});

//Services
angular.module('beachesModule', []).factory('beaches', function() {
  function getBeaches() {
    return [
      {
        "name": "Huntington Beach",
        "value": "Huntington Beach"
      },
      {
        "name": "Seal Beach",
        "value": "Seal Beach"
      },
      {
        "name": "Newport Beach",
        "value": "Newport Beach"
      },
      {
        "name": "Manhattan Beach",
        "value": "Manhattan Beach"
      },
            {
        "name": "Redondo Beach",
        "value": "Redondo Beach"
      }
    ];
  }
  return {
    getBeaches: getBeaches
  }
});