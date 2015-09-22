'use strict';

angular.module('imgResizeToolApp')
  .directive('adjustableSrc', function() {
  	return {
  		restrict: 'A',
  		replace: true,

  		template: '<img src="../../assets/images/file2.png">'

  		// link: function(scope, elem, attrs) {
  		// 	console.log(elem.parent().width());
  		// 	console.log(elem[0].offsetHeight);
  		// } 
  	};

  });