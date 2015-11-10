/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('logCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,ionicMaterialMotion,ionicMaterialInk){
	$timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 1000);
	ionicMaterialInk.displayEffect();
})
.controller('profileCtrl', function($scope, $stateParams, $timeout,ionicMaterialMotion,ionicMaterialInk){
	// Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 0);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
	ionicMaterialInk.displayEffect();
})