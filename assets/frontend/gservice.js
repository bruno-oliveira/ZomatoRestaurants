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
        var persistGreenPoz=[]; //holds positions for the green markers

        // Array of locations obtained from API calls
        var locations = [];
        var locationsInside=[];
        var LatLngPozVec = [];
        var UsefulInfo = [];

        var targetDiv,targetDivEnd;
        var tableDiv;

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
        googleMapService.listenSelectors = function(){
            alert("dysgf");
            $('#start').on('change', function() {
                alert( this.value );
            });

            $('#end').on('change', function() {
                alert( this.value );
            });
        };

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
                var aux_var = locationsInside[poz];

                markerBulkGreen.setVisible(false); //the green markers start invisible
                UsefulInfo.push([new google.maps.LatLng(arrayCoords[poz][0],arrayCoords[poz][1]), arrayNames[poz]]);
                persistGreenPoz.push([arrayCoords[poz][0], arrayCoords[poz][1]]);
                aux_var.addListener(aux_var,'click',function(aux_var){
                    alert("Teste "+aux_var.position);
                });

                locations.push(markerBulk);
                LatLngPozVec.push([arrayCoords[poz][0],arrayCoords[poz][1]]);
                markerBulk.setVisible(true);}
        };



        // Initializes the map
        var initialize = function() {
            //This will be used to render directions on the map
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;



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
                radius: 80
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

                var START_ID=place.place_id;
                alert("START IS "+START_ID);

                marker.bindTo("position", circle, "center");
               // marker.addListener('click', funcPath);

                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    'Place ID: ' + place.place_id + '<br>' +
                    place.formatted_address);
                targetDiv = $("#startdiv");
                targetDiv.html("");

                var arr = [
                    {val : place.place_id, text: place.name}
                ];

                var sel = $('<select id=\"start\" onchange=onChangeHandler>').appendTo('body');
                $(arr).each(function() {
                    sel.append($("<option>").attr('value',this.val).text(this.text));
                });

                targetDiv.append(sel);
            });

            var arr = [];
            //targetDivEnd;
            google.maps.event.addListener(circle, 'radius_changed', function() {

                arr.length=0; //the circle moves, array is cleaned

                targetDivEnd = $("#enddiv");
                targetDivEnd.html("");




                var newmarker=new google.maps.Marker({});
                alert("Event listener");
                // var latLngCenter = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                var bounds = circle.getBounds();
                // alert("LAT ALERT is: "+locations[0].position.lat);
                for(var nmarkers=0; nmarkers< locations.length;nmarkers++){
                    if( bounds.contains(new google.maps.LatLng(LatLngPozVec[nmarkers][0],LatLngPozVec[nmarkers][1])) === true){
                        alert("cmpworked");

                        arr.push( {val : UsefulInfo[nmarkers][0], text: UsefulInfo[nmarkers][1]});
                        locations[nmarkers].setVisible(false); //apaga o vermelho existente
                        locationsInside[nmarkers].setVisible(true); //mostra o verde correspondente
                    }
                    else{
                        locationsInside[nmarkers].setVisible(false); //esconde o verde pois este vai sair do circulo
                        locations[nmarkers].setVisible(true); //mostra o antigo
                       // arr.length(0); //see if this works...
                       // newmarker.setMap(null); //REMOVE o verde
                    }

                }
                var sel = $('<select id=\"end\" onchange=onChangeHandler>').appendTo('body');
                $(arr).each(function () {
                    sel.append($("<option>").attr('value', this.val).text(this.text));
                });

                targetDivEnd.append(sel);

                tableDiv=$("#table");
                tableDiv.html("");

                var aux = "";
                for(var k = 0; k < arr.length; k++){
                    aux += "<tr> <td>"+arr[k].text+"</td> </tr>";
                }
                aux += "</tbody>";
               // tableDiv.append(aux);
                var endtab = "</table";
                var teste = $('<table id=\"restaurantes2\" st-table=\"restName\" class=\"table table-striped\"> <thead> <tr> <th align=\"center\">Restaurant name</th> </tr> </thead> <tbody> '+aux+endtab);

                tableDiv.append(teste);
                /*<table id="restaurantes" st-table="restName" class="table table-striped" hidden>
                 <thead>
                 <tr>
                 <th align="center">Restaurant name</th>
                 <th align="center">Cuisine</th>
                 </tr>
                 </thead>
                 <tbody>
                 <tr ng-repeat="x in restName">
                 <td><a href={{x.restaurant.url}} >
                 <div style="height:100%;width:100%">
                 {{ x.restaurant.name }}
                 </div>
                 </a></td>
                 <td>{{ x.restaurant.cuisines }}</td>
                 </tr>
                 </tbody>
                 </table>*/
            });



        };

        return googleMapService; });

