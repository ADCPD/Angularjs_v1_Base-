/**
 * Created by dhaouadi_a on 13/12/2016.
 */

app.controller('CommentCtrl', function ($scope, PostFactory, $routeParams) {
    $scope.loading = true;
    $scope.newComment = {};

    /** recuperer la route du  comments par {id} post **/
    $scope.$routeParams = $routeParams;
    /** recuperer l'ensemble de comments de chaque article **/
    PostFactory.getPost($scope.$routeParams.id).then(function (post) {
            $scope.loading = false;
            $scope.title = post.name;
            $scope.comments = post.comments;
        }, function (message) {
            alert(message);
        }
    );

    /** Ajouter un commentaires**/

    $scope.addComment = function (username, city, email, content) {
        var add = $scope.newComment;
        $scope.comments.push(add);

        PostFactory.add($scope.newComment).then(function () {

        }, function () {
            alert("Votre commentaire n'est pas pu etre sauvegardé !")
        });
    }


});
