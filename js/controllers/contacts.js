// ContactsController
app.controller('ContactsController', function($scope, $firebaseAuth, $rootScope, $firebaseArray,
  Authentication, FIREBASE_URL, Count) {

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	 $scope.visible = true;

   $scope.toggle = function() {
      $scope.visible =!$scope.visible;
   };

	auth.$onAuth(function(authUser){
		if (authUser) {
			var contactsRef = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id + '/contacts');
			var contactsInfo = $firebaseArray(contactsRef);

			contactsInfo.$loaded().then(function(data){
				$scope.contacts = data;
			}); // make sure contacts data is loaded




			$scope.addContact = function() {
				contactsInfo.$add({
					name: $scope.contactname,
					phone: $scope.contactphone,
					email: $scope.contactemail,
					date: Firebase.ServerValue.TIMESTAMP
				}).then(function(){
					$scope.contactname = '';
					$scope.contactphone = '';
					$scope.contactemail = '';
				});
			}; //addContact

			$scope.deleteContact = function(key) {
				contactsInfo.$remove(key);
			}; //deleteContacts
		}
	});
});