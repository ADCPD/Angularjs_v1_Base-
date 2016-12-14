/**
 * Created by dhaouadi_a on 13/12/2016.
 */

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
        },

        // si on veut sauvegarder les données dans la base des données
        add: function (comment) {
            //declarer un promise
            var deferred = $q.defer();
            // ....
            deferred.resolve();
            return deferred.promise;


        }
    };


    return factory;
});