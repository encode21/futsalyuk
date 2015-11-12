// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','ionic-material', 'ionMdInput', 'starter.service'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

  if(window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  }
  if(window.StatusBar) {
    StatusBar.styleDefault();
  }
});
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('menu', {
    url: '/',
    templateUrl: 'templates/menu.html',
    controller: 'logCtrl'
  })
  .state('login',{
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })
  .state('profile',{
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  })
  .state('register',{
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  });
  $urlRouterProvider.otherwise("/");
})