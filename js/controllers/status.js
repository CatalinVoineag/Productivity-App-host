// STATUS CONTROLLER
app.controller('StatusController', function($scope, $location, Authentication){

	$scope.logout = function() {
		Authentication.logout();
		$location.path('#/');
	} //logout

});