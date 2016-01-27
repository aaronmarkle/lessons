var app = angular.module('formlyApp', ['formly', 'formlyBootstrap']);

app.controller('MainController', function(beach) {
  var vm = this;
  vm.instructor = {};
  vm.instructorFields = [
    {
      key: 'first_name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'First Name',
        placeholder: 'Enter your first name',
        required: true
      }
    },
    {
      key: 'last_name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Last Name',
        placeholder: 'Enter your last name',
        required: true
      }
    },
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
  ];
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