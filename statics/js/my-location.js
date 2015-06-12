function my_loc_initialize() {

    var lat = jQuery('input[name="my-location-lat"]');
    var lng = jQuery('input[name="my-location-lng"]');

    var lat_val = parseFloat(lat.val());
    var lng_val = parseFloat(lng.val());

    if( isNaN(lat_val) || !isFinite( lat_val ) ) { lat_val = 0.0; }
    if( isNaN(lng_val) || !isFinite( lng_val ) ) { lng_val = 0.0; }

    var mapOptions = {
        center: {lat: lat_val, lng: lng_val},
        zoom: 8
    };

    var map = new google.maps.Map(document.getElementById("my-location-map-canvas"), mapOptions);
    var infoWindow = new google.maps.InfoWindow();
    var geocoder = new google.maps.Geocoder();

    if( lat && lng ) {
        map.marker = new google.maps.Marker({
            position:  {lat: lat_val, lng: lng_val},
            map: map
        });
    }

    google.maps.event.addListener(map, 'click', function(event) {

        var position = event.latLng;

        geocoder.geocode({'latLng': position}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    if( map.marker ) {
                        map.marker.setMap(null);
                    }
                    map.marker = new google.maps.Marker({
                        position: position,
                        map: map
                    });

                    var address = results[1].formatted_address;
                    infoWindow.setContent(address);
                    infoWindow.open(map, map.marker);
                    lat.val(position.lat());
                    lng.val(position.lng());
                    jQuery('input[name="my-location-address"]').val(address);
                } else {
                    // alert('No results found');
                    infoWindow.SetContent("No results found");
                    infoWindow.setMap(null);
                }
            } else {
                // alert('Geocoder failed due to: ' + status);
                infoWindow.SetContent('Geocoder failed due to: ' + status);
                infoWindow.setMap(null);
            }
        });
    });
}

google.maps.event.addDomListener(window, 'load', my_loc_initialize);