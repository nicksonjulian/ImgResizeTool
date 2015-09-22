'use strict';

angular.module('imgResizeToolApp')
  .controller('ResizeCtrl', function ($scope) {
  	$scope.message = "what";
  });
  .directive('adjustableSrc', function() {
  	return {
  		restrict: 'AE',
  		template: '<img src="../../assets/images/file2.png">',

  		link: function(scope, elem, attrs) {
  			console.log(elem.parent().width());
  			console.log(elem[0].offsetHeight);
  		}
  	};
  });
