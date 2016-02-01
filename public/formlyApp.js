var formlyApp = angular.module('formlyApp', ['formly', 'formlyBootstrap', 'beachesModule']);

formlyApp.controller('MainController', function(beaches, $http) {
  var vm = this;
  vm.processForm = function() {
    $http.post('signup', vm.instructor)
      .success(function(data) {
        if (data.message) {
          vm.message = data.message;
          vm.error = null;
        }
        if (data.error) {
        vm.error = data.error;
        }
      });
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