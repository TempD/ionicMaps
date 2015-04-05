angular.module('ionicMaps.controllers', []).controller('MapCtrl', [
  '$scope', function($scope) {
    var initialize;
    initialize = function() {
      var map, mapOptions;
      mapOptions = {
        center: new google.maps.LatLng(30.266608, -97.743359),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      $scope.map = map;
      return map.data.loadGeoJson('./data/coa_parks.json');
    };
    return google.maps.event.addDomListener(window, 'load', initialize);
  }
]);

//# sourceMappingURL=maps/controllers.js.map