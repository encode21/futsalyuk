// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','starter.service','ionic-material', 'ionMdInput'])
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

  .state('register',{
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })
.state('tab',{
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tab.html',
    controller: 'tabCtrl'
  })
.state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
.state('tab.sewa', {
      url: '/sewa',
      views: {
        'tab-sewa': {
          templateUrl: 'templates/sewa.html',
          controller: 'sewaCtrl'
        }
      }
    })
  .state('tab.pesan', {
      url: '/pesan',
      views: {
        'tab-pesan': {
          templateUrl: 'templates/list-pesan.html',
          controller: 'pesanCtrl'
        }
      }
    })

  .state('setting',{
    url: '/setting',
    templateUrl: 'templates/setting.html',
    controller: 'setting'
  })

  .state('akun',{
    url: '/akun',
    templateUrl: 'templates/akun.html',
    controller: 'akunCtrl'
  })

  .state('profile',{
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'profile'
  })

  .state('pesan',{
    url: '/pesan/:dtId_user',
    templateUrl: 'templates/pesan_team.html',
    controller: 'pesanTeam'
  })

  .state('detailLapangan',{
    url: '/sewa/:dtId_penyedia',
    templateUrl: 'templates/detail.html',
    controller: 'detailLapangan'
  })
    
  .state('jadwal',{
    url:'/jadwal',
    templateUrl:'templates/jadwal.html',
    controller:'jadwal'
  })
  .state('booking',{
    url:'/booking/:dtId_penyedia',
    templateUrl:'templates/booking.html',
    controller:'booking'
  })
  $urlRouterProvider.otherwise("/");
})