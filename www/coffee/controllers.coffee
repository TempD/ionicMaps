angular.module('ionicMaps.controllers', [])
.controller('MapCtrl', ['$scope', ($scope) ->
  initialize = ->
    # Set map options and point to downtown Austin.
    mapOptions =
      center: new google.maps.LatLng(30.266608, -97.743359)
      zoom: 14
      mapTypeId: google.maps.MapTypeId.ROADMAP

    map = new google.maps.Map(document.getElementById('map'), mapOptions)

    # Attach map to controller scope
    $scope.map = map

    # Now apply GeoJSON data to map.
    map.data.loadGeoJson('./data/coa_parks.json')

  # Allow map to initialize one the 'load' event has fired.
  google.maps.event.addDomListener(window, 'load', initialize)
])
