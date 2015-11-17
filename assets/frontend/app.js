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
    }

});

angular.bootstrap(document.getElementById('search'), ["app"]);