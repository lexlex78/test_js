var app = angular.module('app', ['ui.router']);


app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('views', {
      url: "/view/{view}",
      templateUrl: function(item) { return "views/" + item.view + ".html";}
    })
  
});

