/*!
 * angular-masonry 0.10.0
 * Pascal Hartig, weluse GmbH, http://weluse.de/
 * License: MIT
 */

 var khoiApp = angular.module('khoiApp', ['wu.masonry', 'ngStorage']);

    khoiApp.controller('MainCtrl', function ($scope, $localStorage, $http, $timeout) {        
        if (typeof $localStorage.photos === 'undefined'){
          $scope.photos = [];
          //pulling data from chute album
          $http.get('https://api.getchute.com/v2/albums/aus6kwrg/assets?per_page=5&page=1').
            success(function(data, status, headers, config) {
              //if storage not exist then create new photos array

              $scope.urls_from_chute = data["data"];
              for (var key in $scope.urls_from_chute){
                var photo = {};
                photo.url = $scope.urls_from_chute[key]["url"] + "/fit/450x300";
                photo.id = $scope.photos.length+1;
                $scope.photos.push(photo);
              }
              //update storage version of photos
              $localStorage.photos = JSON.stringify($scope.photos);
              $localStorage.nextPage = data["pagination"]["next_page"];

            }).error(function(data, status, headers, config) {
              // log error
            });
        } else {
         $scope.photos = JSON.parse($localStorage.photos);
        }

        //pull all images of next page and update $scope.next_page
        $scope.add = function add() {
          $http.get($localStorage.nextPage).
            success(function(data, status, headers, config) {
              $scope.urls_from_chute = data["data"];
              for (var key in $scope.urls_from_chute){
                var photo = {};
                photo.url = $scope.urls_from_chute[key]["url"] + "/fit/450x300";
                photo.id = $scope.photos.length+1;
                $scope.photos.push(photo);
              }
              //update storage version of photos
              $localStorage.photos = angular.toJson($scope.photos);
              $localStorage.nextPage = data["pagination"]["next_page"];
            }).error(function(data, status, headers, config) {
              // log error
            });
        };

        $scope.remove = function remove() {
            var random = Math.random();
            $scope.photos.splice(
                (random * $scope.photos.length), 1
            )
            $localStorage.photos = angular.toJson($scope.photos);
        };
    });


  //masonry display module
  var masonry = angular.module('wu.masonry', []).controller('MasonryCtrl', [
    '$scope',
    '$element',
    '$timeout',
    function controller($scope, $element, $timeout) {
      var bricks = {};
      var schedule = [];
      var destroyed = false;
      var self = this;
      var timeout = null;
      this.preserveOrder = false;
      this.loadImages = true;

      this.scheduleMasonryOnce = function scheduleMasonryOnce() {
        var args = arguments;
        var found = schedule.filter(function filterFn(item) {
            return item[0] === args[0];
          }).length > 0;
        if (!found) {
          this.scheduleMasonry.apply(null, arguments);
        }
      };

      // Make sure it's only executed once within a reasonable time-frame in
      // case multiple elements are removed or added at once
      this.scheduleMasonry = function scheduleMasonry() {
        if (timeout) {
          $timeout.cancel(timeout);
        }
        schedule.push(Array.prototype.slice.call(arguments));
        timeout = $timeout(function runMasonry() {
          if (destroyed) {
            return;
          }
          schedule.forEach(function scheduleForEach(args) {
            $element.masonry.apply($element, args);
          });
          schedule = [];
        }, 30);
      };

      function defaultLoaded($element) {
        $element.addClass('loaded');
      }

      this.appendBrick = function appendBrick(element, id) {
        if (destroyed) {
          return;
        }
        function _append() {

          if (Object.keys(bricks).length === 0) {
            $element.masonry('resize');
          }
          if (bricks[id] === undefined) {
            // Keep track of added elements.
            bricks[id] = true;
            defaultLoaded(element);
            $element.masonry('appended', element, true);
          }
        }
        function _layout() {
          self.scheduleMasonryOnce('layout');
        }
        if (!self.loadImages) {
          _append();
          _layout();
        } else if (self.preserveOrder) {
          _append();
          element.imagesLoaded(_layout);
        } else {
          element.imagesLoaded(function() {
            _append();
            _layout();
          });
        }
      };

      this.removeBrick = function removeBrick(id, element) {
        if (destroyed) {
          return;
        }
        delete bricks[id];
        $element.masonry('remove', element);
        this.scheduleMasonryOnce('layout');
      };

      this.destroy = function destroy(){
        destroyed = true;
        if ($element.data('masonry')) {
          // Gently uninitialize if still present
          $element.masonry('destroy');
        }
        $scope.$emit('masonry.destroyed');
        bricks = [];
      };

    }
  ]);

  masonry.directive('masonry', function masonryDirective() {

    var directiveDefinitionObject = {
      restrict: 'EA',
      controller: 'MasonryCtrl',
      link: {
        pre: function preLink(scope, element, attrs, ctrl) {

          var attrOptions = scope.$eval(attrs.masonry || attrs.masonryOptions);

          var options = angular.extend({
              itemSelector: attrs.itemSelector || '.masonry-photo',
              columnWidth: parseInt(attrs.columnWidth, 10) || attrs.columnWidth
            }, attrOptions || {});
          element.masonry(options);

          var loadImages = scope.$eval(attrs.loadImages);
          ctrl.loadImages = !loadImages;

          var preserveOrder = scope.$eval(attrs.preserveOrder);

          ctrl.preserveOrder = preserveOrder !== false && attrs.preserveOrder !== undefined;

          scope.$emit('masonry.created', element);
          scope.$on('$destroy', ctrl.destroy);
        }
      }
    };
    return directiveDefinitionObject;
  })

  masonry.directive('masonryPhoto', function masonryBrickDirective() {
    return {
      restrict: 'AC',
      require: '^masonry',
      scope: true,
      link: {
        pre: function preLink(scope, element, attrs, ctrl) {
          var id = scope.$id, index;

          ctrl.appendBrick(element, id);

          element.on('$destroy', function () {
            ctrl.removeBrick(id, element);
          });

          //everytime $index changes, relayout the gallery
          scope.$watch('$index', function () {
            if (index !== undefined && index !== scope.$index) {
              ctrl.scheduleMasonryOnce('layout');
            }
            index = scope.$index;
          });
        }
      }
    };
  });
