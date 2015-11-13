'use strict';
// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var appContext = angular.module('starter', ['ionic','ionic.service.core','ngCordova', 'ionic.service.push'])

.run(function($ionicPlatform, $ionicPush, RunService) {
        $ionicPlatform.ready(function() {


            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(function($stateProvider, $urlRouterProvider) {
       $stateProvider
           .state('home', {
               url: '/home',
               templateUrl: 'template/home.html',
               cache : true
           })
           .state('event', {
               url: '/event',
               templateUrl: 'template/event.html',
               cache : false,
           })

       $urlRouterProvider.otherwise("/home");
   });
