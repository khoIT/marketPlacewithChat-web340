var khoiApp2 = angular.module("khoiApp", ["AngularSocketIO", "ui.bootstrap"]);

$(document).on('ready page:load', function(arguments) {
    angular.bootstrap(document.body, ['khoiApp'])
});


khoiApp2.controller("ProductController", ["$scope", "$http", function($scope, $http) {
	$scope.products = [];

	$http.get("http://localhost:3000/products.json").
	  success(function(data, status, headers, config) {
	    console.log(data);
			$scope.products = data;
	  }).
	  error(function(data, status, headers, config) {
	    console.error("Something is wrong");
	  });
}]);

//chat app
khoiApp2.controller("ChatAllController", ["$scope", "socket", "$window", function($scope, socket, $window) {
   $scope.messages = [];

    //everything in here happens when I click the send button
    $scope.sendMessage = function() {
      var message = {
        user: "",
        text: $scope.chatmessage
      };
      //this chatmessage has been binded to chatbox via ng-model
      //we sets the field blank and add its content to messages[]
      $scope.chatmessage = '';
      // $scope.messages.push(message);

      //As a client, send a socket to server
      socket.emit("sendchat", message.text);
    };

    //check if current room is main room
    socket.emit('checkRoom', 'checking');
    socket.on('checkRoom', function(currentRoom){
      if (currentRoom != 'mainRoom'){
        console.log('server returns current room: ' + currentRoom);
        socket.emit('newRoom', 'mainRoom');
      }
    });

    $scope.newRoom = function(){
      socket.emit('newRoom', prompt("Choose a room number and give it to your friend [1..100]"));
    };

    socket.on('connect', function(){
      // call the server-side function 'adduser' and send one parameter (value of prompt)
      socket.emit('addUser', prompt("What's your name?"));
    });

    // listener, whenever the server emits 'updatechat', this updates the chat body
    socket.on('updatechat', function(username, data) {
      var message={user: username, text: data};
      $scope.messages.push(message);
    });

    socket.on("server respond", function(msg){
      $scope.messages.push(msg);
    });
}]);

//chat app
khoiApp2.controller("ChatController", ["$scope", "socket", "$window", "$location", function($scope, socket, $window, $location) {
   $scope.messages = [];
   $scope.id=(/products\/(\d+)/.exec($location.absUrl())[1]);

    //everything in here happens when I click the send button
    $scope.sendMessage = function() {
      var message = {
        user: "",
        text: $scope.chatmessage
      };
      //this chatmessage has been binded to chatbox via ng-model
      //we sets the field blank and add its content to messages[]
      $scope.chatmessage = '';
      // $scope.messages.push(message);

      //As a client, send a socket to server
      socket.emit("sendchat", message.text);
    };

    //default new room to 12
    socket.emit('newRoom', $scope.id);

    socket.on('connect', function(){
      // call the server-side function 'adduser' and send one parameter (value of prompt)
      socket.emit('addUser', prompt("What's your name?"));
    });

    // listener, whenever the server emits 'updatechat', this updates the chat body
    socket.on('updatechat', function(username, data) {
      var message={user: username, text: data};
      $scope.messages.push(message);
    });

    socket.on("server respond", function(msg){
      $scope.messages.push(msg);
    });
}]);
khoiApp2.directive('ngEnter', function(){
    return function (scope, element, attrs){
      element.bind("keydown keypress", function(event){
        if(event.which === 13){
          scope.$apply(function (){
            scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }
      });
    };
});
