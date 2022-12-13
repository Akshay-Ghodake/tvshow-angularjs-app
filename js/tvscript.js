const URL = "https://api.tvmaze.com";
let aTry = true;
let app = angular.module("MyApp", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider.
        when("/", {
            templateUrl: "view/home.html",
        }).
        when("/allShows", {
            templateUrl: "view/allShows.html",
        }).
        when("/singlePage/:id", {
            templateUrl: "view/singlePage.html",
            controller: 'singleController'
        }).
        otherwise({
            redirectTo: "index.html",
        })
})
app.controller('singleController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    //Get ID out of current URL
    if (aTry == true) {
        var currentId = $routeParams.id;
        $http.get(`${URL}/shows/${currentId}`)
            .then((res) => {
                $scope.singleData = res;
                $scope.name = $scope.singleData.data.name
                $scope.img = $scope.singleData.data.image.original
                $scope.summary = $scope.singleData.data.summary
                $scope.premiered = $scope.singleData.data.premiered
                $scope.genres = $scope.singleData.data.genres
                $scope.runtime = $scope.singleData.data.runtime
                $scope.rating = $scope.singleData.data.rating.average
            },
                (error) => {
                    console.log("Unable to GET Single TV show Data");
                })
    } else {
        location.reload();
    }
}]);

app.controller('MyCtrn', ($scope, $http) => {

    $http.get(`${URL}/schedule/`).then(
        (res) => {
            //success
            $scope.tvshowdata = res.data;
        },
        (error) => {
            console.log("Unable to fetch Data");
        }
    );

    //get search data
    $scope.get_tvshow = () => {

        let tvShow = $scope.s
        if (tvShow == '') {
            $scope.s_data = undefined;
            return
        }
        $http.get(`${URL}/search/shows?q=${tvShow}`)
            .then((res) => {
                aTry = false;
                $scope.s_data = res.data
            },
                (error) => {
                    console.log("Unable to fetch Data");
                })
    }

});

app.filter('removeHTMLTags', function () {
    return function (text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
});