app.factory('Count', function($firebaseArray,
  $rootScope, FIREBASE_URL) {

  $rootScope.currentUser.$watch(function()  {
    var ref = new Firebase(FIREBASE_URL + '/users/' +
    $rootScope.currentUser.$id + '/contacts');
    var contactsArray = $firebaseArray(ref);

    contactsArray.$loaded(function(data) {
      $rootScope.howManyContacts = contactsArray.length;
    });

    contactsArray.$watch(function(data) {
      $rootScope.howManyContacts = contactsArray.length;
    });

  });

  return true;

}); //CountMeetings
