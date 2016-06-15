// Ionic Starter App
var api_base_url = 'http://localhost:8000/api';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','aCarousel','ngAnimate','pascalprecht.translate'])
.run(function($ionicPlatform,$rootScope,$translate) {
  $ionicPlatform.ready(function() {
    $rootScope.local_lang = "en";
    var app_lang = localStorage.getItem('lang')?localStorage.getItem('lang'):'en';
     $rootScope.change_lang = function force_language(lang)
     {
                    if(lang == "ar"){
                        $rootScope.lang_dir = "rtl";
                        // moment.locale('ar');
                        localStorage.setItem('lang','ar');
                    }else{
                        $rootScope.lang_dir = "ltr";
                        // moment.locale('en');
                        localStorage.setItem('lang','en');
                    }
                    $translate.use(lang);
	    };
    
    $rootScope.change_lang(app_lang);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.constant('$ionicLoadingConfig',{
  template:'<ion-spinner icon="android"></ion-spinner>'
})
.config(function($stateProvider,$translateProvider , $urlRouterProvider,$ionicConfigProvider,$authProvider) {
  $translateProvider.useStaticFilesLoader({   
    prefix: '/languages/',             
    suffix: '_lang.json'                           
  }); 
  $translateProvider.preferredLanguage('en');
  // $translateProvider.useLocalStorage();
  //Back button Config 
  $ionicConfigProvider.backButton.text('').icon('ion-android-arrow-back');
  //Config baseURL
  $authProvider.baseUrl = api_base_url;
  //Login
  $authProvider.loginUrl = '/auth/login';
  
  //Route Config
  $stateProvider
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('auth',{
      url:"/start",
      abstract:true,
      templateUrl:'templates/auth.html'
    })
    //Welcome
    .state('auth.welcome',{
      url:"/welcome",
      templateUrl:'templates/welcome.html'
    })
    //Login
    .state('auth.signup',{
      url: "/register",
      templateUrl: "templates/register.html",
      controller: "RegisterController"
    })
    .state('auth.login',{
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginController"
    })
    //Tabs
    .state('tab.home', {
      url: "/home",
      views: {
        'tab-home': {
          templateUrl: "templates/tab-home.html",
          controller: 'ListController'
        }
      }
    })
    .state('tab.book', {
      url: "/book/:salonId",
      views: {
        'tab-home': {
          templateUrl: "templates/book1.html",
          controller: 'BookController'
        }
      }
    })
    .state('tab.history', {
      url: "/history",
      views: {
        'tab-history': {
          templateUrl: "templates/tab-history.html",
          controller: 'HistoryController'
        }
      }
    })
    .state('tab.offers', {
      url: "/offers",
      views: {
        'tab-offers': {
          templateUrl: "templates/tab-offers.html",
          controller: 'OffersController'
        }
      }
    })
    .state('tab.profile', {
      url: "/profile",
      views: {
        'tab-profile': {
          templateUrl: "templates/tab-profile.html",
          controller: 'ProfileController'
        }
      }
    });
    
   $urlRouterProvider.otherwise("/tab/home");

});
