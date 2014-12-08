// This is a wrapper for socket.io for use within angular modules.
var services = angular.module("AngularSocketIO", []);

services.factory('socket', ["$rootScope", "$window", "$http",
  function ($rootScope, $window, $http) {
    var chatUri = "http://khoi-chat-server.herokuapp.com:80";
    //var chatUri = "http://localhost:5000";
    var socket = io.connect(chatUri);

    return {
      handshake: function handshake(cb) {
        var payload = {
          username: $window.localStorage.getItem('email')
        };

        $http.post(chatUri+'/login/', payload)
          .success(function (data) {
            console.log('connecting to Socket.IO server...');
            socket = io.connect(chatUri, {
              query: 'token=' + data.token
            });
            cb();
            console.log('connected to Socket.IO server');
          })
          .error(function () {
            alert('Cannot login to chatserver!');
          });
      },

      on: function on(eventName, cb) {
        function wrapper() {
          var args = arguments;
          $rootScope.$apply(function () {
            cb.apply(socket, args);
          });
        };

        socket.on(eventName, wrapper);

        return function () {
          socket.removeListener(eventName, wrapper);
        };
      },

      emit: function emit(eventName, data, cb) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (cb) {
              cb.apply(socket, args);
            }
          });
        });
      },

      disconnect: function disconnect(cb) {
        if (socket) {
          socket.disconnect(cb);
        }
      }
    }
}]);

