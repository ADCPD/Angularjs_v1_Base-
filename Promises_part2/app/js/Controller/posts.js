/**
 * Created by dhaouadi_a on 13/12/2016.
 */



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

