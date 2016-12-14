/**
 * Created by dhaouadi_a on 14/12/2016.
 */


var app = angular.module('CommentsApp', []);

app.controller('CommentsCtrl', function ($scope, $filter) {


    // decrarer les date en milliseconde
      $scope.chiffre = 3.14888898;

    // Filtrer directement à partir du controleur
    // $scope.chiffre = $filter('complexe_round')(3.14888898, 2);


});

/** Creer  un nouveau filter AngularJs round **/
app.filter('simple_round', function () {
    return function (integer) {
        return Math.round(integer);
    }
});

app.filter('complexe_round', function () {
    return function (input, precision) {
        //  return Math.round(input * Math.pow(10, precision)) / Math.pow(10, precision);
        // oubien
        chiffre = Math.round(input * Math.pow(10, precision)) / Math.pow(10, precision);
        return chiffre.toString().replace('.', ',');
    }
});
