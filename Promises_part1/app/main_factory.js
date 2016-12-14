/**
 * Created by dhaouadi_a on 13/12/2016.
 */



var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {templateUrl: './vue/home.html', controller: 'PostCtrl'})   // defenir les routes
        .when('/comments/:id', {templateUrl: './vue/comments.html', controller: 'CommentCtrl'}) //definir quel controle gere la vue
        .otherwise({redirectTo: '/'}); //s'il  ne trouve pas plus d'url, il se redirige vers la page index
});


app.factory('PostFactory', function ($http, $q, $timeout) {
    var factory = {
        posts: false,
        // method qui recupere les differents articles
        getPosts: function () {
            //declarer un promise
            var deferred = $q.defer();

            // la condition pour eviter le chargement du json action dans la page
            if (factory.posts != false) {
                deferred.resolve(factory.posts);
            } else {
                $http({
                    method: 'GET',
                    url: './posts.json'
                }).then(function successCallback(data, status) {
                    factory.posts = data.data;
                    // verifie que le chargement fonctionne
                    $timeout(function () {
                        deferred.resolve(factory.posts);
                    }, 800);
                }, function errorCallback(data, status) {
                    deferred.reject('Impossible de recuperer les données ');
                });
            }
            return deferred.promise;
        },
        // recuprere l'article par id show page
        getPost: function (id) {
            var deferred = $q.defer();
            var post = {};
            var posts = factory.getPosts().then(function (posts) {
                //injecter les article afin d'avoir un bon chargement (refresh page)
                angular.forEach(posts, function (value, key) {
                    if (value.id == id) {
                        post = value;
                    }
                });
                return deferred.resolve(post);
            }, function (message) {
                deferred.reject(message);
            });
            return deferred.promise;
            // return post;
        }
    };


    return factory;
});


app.controller('PostCtrl', function ($scope, PostFactory) {

    $scope.loading = true;
    // then pour la promise
    $scope.posts = PostFactory.getPosts().then(function (posts) {
            $scope.loading = false;
            $scope.posts = posts;
        }, function (message) {
            alert(message);
        }
    );
});

app.controller('CommentCtrl', function ($scope, PostFactory, $routeParams) {
    $scope.loading = true;
    $scope.$routeParams = $routeParams;
    var post = PostFactory.getPost($scope.$routeParams.id).then(function (post) {
            $scope.loading = false;
            $scope.title = post.name;
            $scope.comments = post.comments;
        }, function (message) {
            alert(message);
        }
    );

});

