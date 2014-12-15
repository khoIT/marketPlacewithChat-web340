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

      //take in url and set $scope.data to be an array of url
      function getPhotos(url){
        dataFactory(url, function(results){
          //if there is photos then display them and skip loading
          if ($localStorage.photos !== undefined){
            $scope.photos = JSON.parse($localStorage.photos);
            return;
          }
          $scope.data = results;
          updateDisplay($scope.data);
        });
      }

      function getProducts(url){
        dataFactory(url, function(results){
          $scope.products = {};
          $.each(results, function(index, value){
            $scope.products[index] = value;
          });
        });
      }


      function updateDisplay(data){
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

        var photoLinks = data.data;

        for (var key in photoLinks){
          var photo = {};
          photo.url = photoLinks[key].url + "/fit/400x300";
          photo.id = ++$localStorage.id;
          var product = $scope.products[photo.id-1];
          if (product){
            photo.title = product.name;
            photo.price = product.price;
            $scope.photos.push(photo);
          }
        }
        if($scope.photos[9] !== undefined)
          $scope.photos.splice(9, 1);
        //update storage version of photos
        $localStorage.photos = angular.toJson($scope.photos);
        $localStorage.nextPage = $scope.data.pagination.next_page;
        //scroll();
        window.setTimeout(scroll, 100);
      }

      function scroll(){
       document.getElementById('gallery-bottom').scrollIntoView();
      };

      //intialize gallery
      first_url = 'https://api.getchute.com/v2/albums/aus6kwrg/assets?per_page=5&page=1';
      getProducts('http://localhost:3000/products');
      getPhotos(first_url);

      $scope.add = function add() {
        $http.get($localStorage.nextPage).
            success(function(data, status, headers, config) {
              $scope.urls_from_chute = data.data;
              for (var key in $scope.urls_from_chute){
                var photo = {};
                photo.url = $scope.urls_from_chute[key].url + "/fit/400x300";
                photo.id = ++$localStorage.id;
                var product = $scope.products[photo.id-1];
                if (product){
                  photo.title = product.name;
                  photo.price = product.price;
                  $scope.photos.push(photo);
                }
              }
              if($scope.photos[9] !== undefined)
                $scope.photos.splice(9, 1);
              //update storage version of photos
              $localStorage.photos = angular.toJson($scope.photos);
              $localStorage.nextPage = data.pagination.next_page;
            }).error(function(data, status, headers, config) {
              // log error
            });
      };

      //clear all current products and load next batch
      //temporary deprecate
      $scope.clear = function clear() {
          $scope.photos = [];
          delete $localStorage.photos;
          getPhotos($localStorage.nextPage);
      };

      $scope.restart = function restart() {
        $scope.photos = [];
        $localStorage.$reset();
        getProducts('http://localhost:3000/products');
        getPhotos(first_url);
        $("#category-wall a").toggleClass('btn-default', true)
                           .toggleClass('btn-primary', false);

        };
      $scope.updateCategory = function change(){

        var selected_categories = $("#category-wall .btn-primary");
        if (selected_categories[0] === undefined){
          return;
        }
        var ids = [];
        $.each( selected_categories, function( index, value ){
            ids.push(value.id);
        });

        $.ajax({
          type: 'post',
          url: 'http://localhost:3000/category',
          data: JSON.stringify(ids),
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          success: function(data){
            console.log(data);
            //loop through all $scope.photos and keep only those with
            //product id
            $scope.products = {};   //set products empty
            $.each(data, function(index, product){
              $scope.products[product.id] = product;
            });
            $scope.photos = [];
            $.each(JSON.parse($localStorage.photos), function(index, photo){
              if (photo.id in $scope.products){
                $scope.photos.push(photo);
              }
            });
            //upon refresh category will be cleared
            $scope.$apply();
            window.setTimeout(scroll, 100);
          }
        });
      };
    });

    chatApp.directive('scroller', function () {
      return {
        restrict: 'A', link: function (scope, elem, attrs) {
            elem.bind('scroll', function () {
                var div = $(this);
                 if (div[0].scrollHeight - div.scrollTop() == div.height())
                {
                    scope.$apply('add()');
                }
            });
        }
    };
    });

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
      socket.emit('addUser', 'khoi');
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
      var name = document.getElementById('hidden').getAttribute('data-username');
      socket.emit('addUser',name );
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
