/* Bookmarks Controller */

app.controller('BookmarksController', function($scope, $firebase, $firebaseArray, $rootScope, FIREBASE_URL, $firebaseAuth){

	var ref = new Firebase(FIREBASE_URL);
   var auth = $firebaseAuth(ref);

   $scope.visible = true;

   $scope.toggle = function() {
      $scope.visible =!$scope.visible;
   };

   auth.$onAuth(function(authUser) {
      if (authUser) {
         var bookmarksRef = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id + '/bookmarks');
         var bookmarksInfo = $firebaseArray(bookmarksRef);

         bookmarksInfo.$loaded().then(function(data){
            $scope.bookmarks = data;
         }); //make sure bookmarks data is loaded
      }


	


   $scope.addBookmark = function() {
   	bookmarksInfo.$add({
   		name: $scope.bookmarkname,
   		url: $scope.bookmarkurl,
   		date: Firebase.ServerValue.TIMESTAMP
   	}).then(function() {
   		$scope.bookmarkname = '';
   		$scope.bookmarkurl = '';
   	});
   } // addBookmark

   $scope.deleteBookmark = function(key){
   	bookmarksInfo.$remove(key);
   }; //deleteBookmark
 })
});