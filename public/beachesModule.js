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