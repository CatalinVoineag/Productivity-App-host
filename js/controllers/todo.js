// TODO CONTROLLER
app.controller('TodoController', function($scope, $firebase, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, Count) {

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);
	$scope.todos = $firebaseArray(ref);

	$scope.visible = true;

	$scope.toggle = function() {
		$scope.visible = !$scope.visible;
	}

	auth.$onAuth(function(authUser){
		if (authUser) {
			var todosRef = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id + '/todos');
			var todosInfo = $firebaseArray(todosRef);

			todosInfo.$loaded().then(function(data){
				$scope.todos = data;
			})
		}




	$scope.addTodo = function() {
		todosInfo.$add({
			name: $scope.todoname,
			completed: false,
			date: Firebase.ServerValue.TIMESTAMP
		}).then(function() {
			$scope.todoname = '';
		}); 			
	} //addTodo

	$scope.deleteTodo = function(key) {
		todosInfo.$remove(key);
	} //deleteTodo

	// Mark all todos as completed
	$scope.checkAll = function(){
		if ($scope.selectedAll) {
			$scope.selectedAll = false;
		} else {
			$scope.selectedAll = true;
		}
		angular.forEach($scope.todos, function(todo) {
			todo.completed = $scope.selectedAll;
		});
	};

	$scope.clearCompletedTodos = function(key) {
		angular.forEach($scope.todos, function(todo, key) {
			if (todo.completed) {
				todosInfo.$remove(key)
			}
		});
	}

	});

});