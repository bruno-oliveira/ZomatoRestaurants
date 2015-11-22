// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function($rootScope, $http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};
        googleMapService.clickLat  = 0;
        googleMapService.clickLong = 0;
        var map;
        var circle;
        var markerBulk;

        // Array of locations obtained from API calls
        var locations = [];
        var locationsInside=[];
        var LatLngPozVec = [];

        // User Selected Location (initialize to center of America)
        var selectedLat = 37.5;
        var selectedLong = -9.1;

        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Takes three parameters (lat, long, and filtering results)
        googleMapService.drawMap = function(latitude, longitude){


            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = latitude;
            selectedLong = longitude;

            initialize();
        };

        // Private Inner Functions
        // --------------------------------------------------------------

        googleMapService.AddMarker = function(latitude, longitude,namerest){
           // initialize();
            var myLatLng = [latitude, longitude];
            alert("Adding");
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(myLatLng[0],myLatLng[1]),
                map: map,
                title: namerest
            });
            marker.setVisible(true);
        };

        googleMapService.AddMarkersBulk = function(arrayCoords,arrayNames){
            // initialize();
            alert("Adding in Bulk");
            for(var poz = 0; poz < arrayCoords.length; poz++){
            markerBulk = new google.maps.Marker({
                position: new google.maps.LatLng(arrayCoords[poz][0],arrayCoords[poz][1]),
                map: map,
                title: arrayNames[poz]
            });
                var markerBulkGreen = new google.maps.Marker({
                    position: new google.maps.LatLng(arrayCoords[poz][0],arrayCoords[poz][1]),
                    map: map,
                    title: arrayNames[poz]
                });
                markerBulkGreen.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                markerBulkGreen.setMap(map);
                markerBulkGreen.setVisible(true);
                locationsInside.push(markerBulkGreen);
                markerBulkGreen.setVisible(false); //the green markers start invisible

                locations.push(markerBulk);
                LatLngPozVec.push([arrayCoords[poz][0],arrayCoords[poz][1]]);
                markerBulk.setVisible(true);}
        };


        // Initializes the map
        var initialize = function() {

           map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 37.75, lng: -9},
                zoom: 14
            });

            var input = document.getElementById('pac-input');

            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);

            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            var infowindow = new google.maps.InfoWindow();

             circle = new google.maps.Circle({
                map: map,
                editable: true,
                fillColor: '#ff0000',
                fillOpacity: 0,
                strokeColor: '#ff0000',
                strokeOpacity: 1.0,
                strokeWeight: 1.5,
                radius: 280
            });
            //circle.addListener('bounds_changed', UpdateMarkers);

            var marker = new google.maps.Marker({
                map: map
            });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });

            autocomplete.addListener('place_changed', function() {
                infowindow.close();
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    return;
                }

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }

                // Set the position of the marker using the place ID and location.
                marker.setPlace({
                    placeId: place.place_id,
                    location: place.geometry.location
                });
                marker.setVisible(true);
                circle.setVisible(true);
                circle.setCenter(place.geometry.location);


                marker.bindTo("position", circle, "center");

                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    'Place ID: ' + place.place_id + '<br>' +
                    place.formatted_address);
                infowindow.open(map, marker);
            });

            google.maps.event.addListener(circle, 'radius_changed', function() {
                var newmarker=new google.maps.Marker({});
                alert("Event listener");
                // var latLngCenter = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                var bounds = circle.getBounds();
                // alert("LAT ALERT is: "+locations[0].position.lat);
                for(var nmarkers=0; nmarkers< locations.length;nmarkers++){
                    if( bounds.contains(new google.maps.LatLng(LatLngPozVec[nmarkers][0],LatLngPozVec[nmarkers][1])) === true){
                        alert("cmpworked");
                      /*  newmarker = new google.maps.Marker({
                            position: new google.maps.LatLng(LatLngPozVec[nmarkers][0],LatLngPozVec[nmarkers][1]),
                            map: map
                        }); */
                        locations[nmarkers].setVisible(false); //apaga o vermelho existente
                        locationsInside[nmarkers].setVisible(true); //mostra o verde correspondente
                        //Cria novo na posição do vermelho
                 /*       newmarker = new google.maps.Marker({
                            position: new google.maps.LatLng(LatLngPozVec[nmarkers][0],LatLngPozVec[nmarkers][1]),
                            map: map
                        });
                        newmarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                        newmarker.setMap(map);
                        newmarker.setVisible(true); //mostra o novo */

                    }
                    else{
                        locationsInside[nmarkers].setVisible(false); //esconde o verde pois este vai sair do circulo
                        locations[nmarkers].setVisible(true); //mostra o antigo
                       // newmarker.setMap(null); //REMOVE o verde
                    }

                }
            });





        };
        return googleMapService; });

