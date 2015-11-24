// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gserviceRoute', [])
    .factory('gserviceRoute', function($rootScope, $http) {

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};
        googleMapService.clickLat = 0;
        googleMapService.clickLong = 0;
        var map;
        // User Selected Location (initialize to center of America)
        var selectedLat = 37.5;
        var selectedLong = -9.1;

        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Takes three parameters (lat, long, and filtering results)
        googleMapService.drawMap = function (latitude, longitude) {


            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = latitude;
            selectedLong = longitude;

            initialize();
        };

        // Private Inner Functions
        // --------------------------------------------------------------

        // Initializes the map
        var initialize = function () {
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            var map = new google.maps.Map(document.getElementById('mapRoute'), {
                zoom: 7,
                center: {lat: 41.85, lng: -87.65}
            });
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById('panel'));

            var onChangeHandler = function() {
                calculateAndDisplayRoute(directionsService, directionsDisplay);
            };
            document.getElementById('start').addEventListener('change', onChangeHandler);
            document.getElementById('end').addEventListener('change', onChangeHandler);
        };

        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
            alert("rekt"+document.getElementById('end').value.substr(1,document.getElementById('end').value.length-1).split(",")[1]);
            var d1, d2;
            var auxi = document.getElementById('end').value.substr(1,document.getElementById('end').value.length-1).split(",")[1];
            alert("Aux is "+ auxi);
            d1 = Number(document.getElementById('end').value.substr(1,document.getElementById('end').value.length-1).split(",")[0]);
            d2 = Number(auxi.substr(0,auxi.length-2));
            alert("d1 "+d1+", d2 "+d2);

            directionsService.route({
                origin: {placeId: document.getElementById('start').value},
                destination: new google.maps.LatLng(d1, d2),//{lat: Number(document.getElementById('end').value.substr(1,document.getElementById('end').value.length-1).split(",")[0]), lng: Number(document.getElementById('end').value.substr(1,document.getElementById('end').value.length-1).split(",")[1].substr(0, document.getElementById('end').value.substr(1,document.getElementById('end').value.length-1).split(",")[1].length))},
                travelMode: google.maps.TravelMode.DRIVING
            }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    alert(status);
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });

        };



        return googleMapService; });

