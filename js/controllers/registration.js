// Registration Controller
app.controller('RegistrationController', function($scope, $location, $firebaseAuth,
	Authentication, $route) {

		var ref = new Firebase('https://productivity-app.firebaseio.com/contact');
		var auth = $firebaseAuth(ref);

    $scope.pageClass = "page-registration";


    $scope.login = function() {
    	Authentication.login($scope.user)
    	.then(function(user){
    		$location.path('/contacts');
    	}).catch(function(error){
    		$scope.message = error.message;
    	});
    }; //login

    $scope.logout = function() {
    Authentication.logout();
    $location.path('#/');
  } //logout

      $scope.register = function() {
    Authentication.register($scope.user)
      .then(function(user) {
        
        $location.path('/contacts');
      }).catch(function(error) {
        $scope.message = error.message;
      });
  }; //register

  



});
