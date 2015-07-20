// app.js

var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'firebase'])
	.constant('FIREBASE_URL', 'https://productivity-app.firebaseio.com/');

	app.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError',
  function(event, next, previous, error) {
    if(error === 'AUTH_REQUIRED') {
      $rootScope.message='Sorry, you must log in to access that page';
      $location.path('/login');
    }
  });
}]);

  

app.config(function($routeProvider) {

  $routeProvider

    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'RegistrationController'
    })
    .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationController'
    })
    .when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'ContactsController',
        resolve : {
        	currentAuth: function(Authentication) {
        	return Authentication.requireAuth();
        }
      }
    })
    .when('/todo', {
        templateUrl: 'views/todo.html',
        controller: 'TodoController',
        resolve : {
        	currentAuth: function(Authentication) {
        		return Authentication.requireAuth();
        	}
        }
    })
    .when('/bookmarks', {
        templateUrl: 'views/bookmarks.html',
        controller: 'BookmarksController',
        resolve : {
            currentAuth: function(Authentication) {
            return Authentication.requireAuth();
            }
        }
    })
    .otherwise({
        redirectTo: '/'
    });

});
