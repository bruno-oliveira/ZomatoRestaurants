var app = angular.module('app', []);
app.controller('RestaurantCtrl', function($scope,$http) {
    var cityID = -1;
    $scope.GetCities=function(city) {
        document.getElementById("restaurantes").removeAttribute("hidden");
        document.getElementById("estado").removeAttribute("hidden");
        city = document.getElementById("cityname").value;
        alert("Testing API...city is " + city);
        $http.post("http://localhost:3000/cityquery", {"city": city}).success(function (resp) {
            alert("Response is " + resp);

            $http.post("http://localhost:3000/restlist", {"data": [city,resp[1]]}).success(function (resp2) {

                alert("Response after "+resp2["restaurants"].length);
                document.getElementById("estado").setAttribute("hidden","true");
                $scope.restName=resp2["restaurants"];

            })

        })
    };



});


app.controller('RestaurantCtrl2', function($scope,$http) {

    function initMap() {
        alert("Creating map");
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -33.8688, lng: 151.2195},
            zoom: 13
        });

        var input = document.getElementById('pac-input');

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var infowindow = new google.maps.InfoWindow();

        var circle = new google.maps.Circle({
            map: map,
            editable: true,
            fillColor: '#ff0000',
            fillOpacity: 0,
            strokeColor: '#ff0000',
            strokeOpacity: 1.0,
            strokeWeight: 1.5,
            radius: 80        // 50 MILES in meters
        });
        var marker = new google.maps.Marker({
            map: map
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        alert("End of callbacks func");
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
    }
    // This example creates circles on the map, representing populations in North
// America.

//





});

angular.bootstrap(document.getElementById('search'), ["app"]);