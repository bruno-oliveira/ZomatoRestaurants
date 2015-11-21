var app = angular.module('app', ['gservice']);

app.controller('RestaurantCtrl', function($scope,$http,gservice) {
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
                var arrayCoords = [];
                var arrayNames = [];
                for(var i = 0; i < resp2["restaurants"].length; i++) {
                    arrayNames.push(resp2["restaurants"][i]["restaurant"]["name"]);
                    arrayCoords.push([resp2["restaurants"][i]["restaurant"]["location"]["latitude"] , resp2["restaurants"][i]["restaurant"]["location"]["longitude"]]);
                }
                document.getElementById("estado").setAttribute("hidden","true");
                $scope.restName=resp2["restaurants"];
                gservice.drawMap(37.75,-9.1);
                gservice.AddMarkersBulk(arrayCoords,
                    arrayNames
                );

            })

        })
    };

});

//angular.bootstrap(document.getElementById('search'),["app"]);