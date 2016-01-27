var app = angular.module('formlyApp', ['formly', 'formlyBootstrap']);

app.controller('MainController', function(beaches, $http) {
  var vm = this;
  vm.processForm = function() {
    $http.post('signup-submit', vm.instructor)
      .success(function(data) {
        console.log('form submitted');
      });
    console.log(vm.instructor);
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
app.factory('beaches', function() {
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
      }
    ];
  }
  return {
    getBeaches: getBeaches
  }
});