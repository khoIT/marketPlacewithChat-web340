var chatApp = angular.module("chatApp", ["AngularSocketIO", "ui.bootstrap",'wu.masonry', 'ngStorage']);

$(document).on('ready page:load', function(arguments) {
    angular.bootstrap(document.body, ['chatApp'])
});

 chatApp.factory('dataFactory', function($http){
      var result;
      var data = function(url, callback){
         $http.get(url).success(function(data) {
           result = data;
           callback(result);
          });
      };

      return data;
    });

    chatApp.controller('MainCtrl', function ($scope, $localStorage, $http, dataFactory) {

      function getPhotos(url){
        dataFactory(url, function(results){
          //check for duplicates
          if ($localStorage.photos !== undefined){
           if(JSON.parse($localStorage.photos)[0].url ==  results.data[0].url + "/fit/400x300"){
              $scope.photos = JSON.parse($localStorage.photos);
              return;
            }//end if
          }
          $scope.data = results;
          updateDisplay();
        });
      }

      function updateDisplay(){
        $localStorage.id == null ? $localStorage.id = 0:null;
        //if reach the end of api
        if ($localStorage.nextPage === null){
          restart();
        }

        //if gallery not exist
        if ($localStorage.photos === undefined ||$localStorage.photos[0] == undefined ){
          $scope.photos = [];
        } else { //copy the existing database to $scope.photos
          $scope.photos = JSON.parse($localStorage.photos);
        }
        var photoLinks = $scope.data.data;
        for (var key in photoLinks){
          var photo = {};
          photo.url = photoLinks[key].url + "/fit/400x300";
          photo.id = ++$localStorage.id;
          $scope.photos.push(photo);
        }
        //update storage version of photos
        $localStorage.photos = angular.toJson($scope.photos);
        $localStorage.nextPage = $scope.data.pagination.next_page;
      }

      //intialize gallery
      first_url = 'https://api.getchute.com/v2/albums/aus6kwrg/assets?per_page=5&page=1';
      getPhotos(first_url);

      $scope.add = function add() {
        $http.get($localStorage.nextPage).
            success(function(data, status, headers, config) {
              $scope.urls_from_chute = data.data;
              for (var key in $scope.urls_from_chute){
                var photo = {};
                photo.url = $scope.urls_from_chute[key].url + "/fit/400x300";
                photo.id = ++$localStorage.id;
                $scope.photos.push(photo);
              }
              //update storage version of photos
              $localStorage.photos = angular.toJson($scope.photos);
              $localStorage.nextPage = data.pagination.next_page;
            }).error(function(data, status, headers, config) {
              // log error
            });
      };

      //clear all current products and load next batch
      $scope.clear = function clear() {
          $scope.photos = [];
          delete $localStorage.photos;
          getPhotos($localStorage.nextPage);
      };

      $scope.restart = function restart() {
        $scope.photos = [];
        $localStorage.$reset();
        getPhotos(first_url);
      };
    });

    chatApp.directive('scroller', function () {
      return {
        restrict: 'A', link: function (scope, elem, attrs) {
            elem.bind('scroll', function () {
                var div = $(this);
                  console.log(div.height());
                 if (div[0].scrollHeight - div.scrollTop() == div.height())
                {
                    scope.$apply('add()');
                }
            });
        }
    };
    });

chatApp.controller("ProductController", ["$scope", "$http", function($scope, $http) {
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
chatApp.controller("ChatAllController", ["$scope", "socket", "$window", function($scope, socket, $window) {
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
chatApp.controller("ChatController", ["$scope", "socket", "$window", "$location", function($scope, socket, $window, $location) {
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
chatApp.directive('ngEnter', function(){
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
