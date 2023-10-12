var map, searchBox, directionsService, directionsDisplay,
  infoWindow, userPosition, selectedMarkerPosition,
  openedInfoWindow = null, markers = {}, openedWindowCode = null;

var messageUnknownPosition = 'Was not possible to get your location';

var ABMap = {};


(function ($) {
  ABMap.initMap = function() {
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    map = new google.maps.Map(document.getElementById('ab-map'), {
      center: {lat: Drupal.settings.ab_map_initial_lat, lng: Drupal.settings.ab_map_initial_lng},
      zoom: 15,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      mapTypeId: 'roadmap',
      styles: [
        {
          featureType: 'poi.business',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{visibility: 'off'}]
        }
      ]
    });

    infoWindow = new google.maps.InfoWindow;

    // Create the search box and link it to the UI element.
    //var input = document.getElementById('pac-input');
    //searchBox = new google.maps.places.SearchBox(input);
    //searchBox.addListener('places_changed', ABMap.placeChange);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    //directionsDisplay.setMap(map);

    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var centerControlDiv = document.getElementById('location-btn');
    centerControlDiv.index = 1;
    centerControlDiv.addEventListener('click', function() {
      if (userPosition !== null) {
        map.setCenter(userPosition);
        map.setZoom(17);
        ABMap.getLocations();
      }
      else {
        alert(messageUnknownPosition);
      }
    });
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);

    google.maps.event.addListenerOnce(map, 'tilesloaded', ABMap.getLocations);
    map.addListener('dragend', ABMap.getLocations);
    map.addListener('zoom_changed', ABMap.getLocations);

    setTimeout(function () {
      ABMap.revealPosition();
    }, 1000);
  };

  ABMap.revealPosition = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setZoom(17);
        map.panTo(userPosition);
        var marker = new google.maps.Marker({
          position: userPosition,
          title: 'My location'
        });
        marker.setMap(map);
        $('#location-btn').removeClass('d-none');
        ABMap.getLocations();
      }, function () {
        //handleLocationError(true, infoWindow, map.getCenter());
        console.log('Error getting current position');
      });
    }
    else {
      // Browser doesn't support Geolocation
      //handleLocationError(false, infoWindow, map.getCenter());
      console.log('Browser does not support Geolocation');
    }
  };

  ABMap.getLocations = function() {
    var bounds = map.getBounds().toJSON();
    $.extend(bounds, {'zoom': map.getZoom()});
    $.ajax({
      type: 'GET',
      url: Drupal.settings.ab_map_api_endpoint,
      data: bounds,
      dataType: 'json',
      success: function (data) {
        $.each(data, function(index, element) {
          // Check if element type is on markers object
          if (!(element['type'] in markers)) {
            markers[element['type']] = {};
          }
          // Check if marker is already on map
          if (!(element['code'] in markers[element['type']])) {
            var latlng = {lat: parseFloat(element['lat']), lng: parseFloat(element['lng'])};
            var _marker = {
              position: latlng,
              map: map,
              title: 'Click for more information'
            };

            _marker['icon'] = Drupal.settings.ab_map_path_icon + element['type'] + '.png';

            var marker = new google.maps.Marker(_marker);

            // Add marker to markers objects
            markers[element['type']][element['code']] = marker;

            var contentString = '<div id="content" class="map-popup">' +
              '<div id="siteNotice">' +
              '</div>' +
              '<h3 id="firstHeading" class="firstHeading">' + element['title'] + '</h3>' +
              '<div id="bodyContent">' +
              '<p>' + element['address'] + '</p>' +
              '<p>' + element['phones'] + '</p>' +
              '</div>' +
              '<a href="#" class="btn" target="_blank" onclick="ABMap.calcRoute();return false;">Directions</a>' +
              '</div>';


            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });

            marker.addListener('click', function () {
              selectedMarkerPosition = latlng;
              if (openedInfoWindow) openedInfoWindow.close();
              openedInfoWindow = infowindow;
              infowindow.open(map, marker);
            });
          }
        });
      }
    });
  };

  ABMap.calcRoute = function() {
    if (!userPosition !== null && userPosition !== undefined) {
      window.open('https://www.google.com/maps/dir/?api=1&origin=' + userPosition.lat + ',' + userPosition.lng + '&destination=' + selectedMarkerPosition.lat + ',' + selectedMarkerPosition.lng);
    }
    else {
      alert(messageUnknownPosition);
    }
  };

  ABMap.calculateAndDisplayRoute = function() {
    if (userPosition !== null) {
      directionsService.route({
        origin: userPosition,
        destination: selectedMarkerPosition,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        }
      });
    }
    else {
      alert(messageUnknownPosition);
    }
  };

  ABMap.placeChange = function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    map.setZoom(17);
    map.panTo(places[0].geometry.location);
    getLocations();
  };

  /**
   * Add Drupal behaviors
   */
  Drupal.behaviors.ABMap = {};

  Drupal.behaviors.ABMap.attach = function(context, settings) {
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id))
        return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://maps.googleapis.com/maps/api/js?key=" + Drupal.settings.ab_map_api_key + '&libraries=places&callback=ABMap.initMap';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-map'));
  };

})(jQuery);
