/**
 * Created by dhaouadi_a on 13/12/2016.
 *
 * Project angularjs config file
 */


var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {templateUrl: './app/partials/home.html', controller: 'PostCtrl'})   // defenir les routes
        .when('/comments/:id', {templateUrl: './app/partials/comments.html', controller: 'CommentCtrl'}) //definir quel controle gere la vue
        .otherwise({redirectTo: '/'}); //s'il  ne trouve pas plus d'url, il se redirige vers la page index
});
