/**
 * Created by dhaouadi_a on 13/12/2016.
 */

var app = angular.module('CommentsApp', []);

app.controller('CommentsCtrl', function ($scope, $http) {

    // Declarer comments en array
    $scope.comments = [];

    // decrarer les date en milliseconde
    $scope.date = 1288323623006;

    // Declarer search en Object
    $scope.search = {};

    $http.get('https://jsonplaceholder.typicode.com/comments').then(function (response) {
        $scope.comments = response.data;
    });

});

