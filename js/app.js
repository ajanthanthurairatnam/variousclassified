var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })  
     .when('/viewclassfied', {
        templateUrl: 'pages/viewclassfied.html',
        controller: 'viewclassfied'
    })
    
    .when('/viewclassfied/:num', {
        templateUrl: 'pages/viewclassfied.html',
        controller: 'viewController'
    })
    
     .when('/addclassified', {
        templateUrl: 'pages/addclassified.html',
        controller: 'mainController'
    })

});

myApp.controller('mainController', ['$scope', '$http', function ($scope,  $http) {   
    
  $http.get('http://127.0.0.1/VariousClassifiedWeb/api')
        .success(function (result) {
            $scope.classifieds = result;
            $scope.chunkedData = chunk(result, 4);
        });
        $scope.ClassifiedTitle = '';
        $scope.ClassifiedDescription = '';
     $scope.addRule = function () {
        $http.post('http://127.0.0.1/VariousClassifiedWeb/api', { ClassifiedTitle: $scope.ClassifiedTitle,ClassifiedDescription: $scope.ClassifiedDescription })
            .success(function (result) {
             $scope.classifieds = result;
            $scope.chunkedData = chunk(result, 4);               
                 $scope.ClassifiedTitle = '';
        $scope.ClassifiedDescription = '';

            })
    };
}]);

myApp.controller('viewController', ['$scope', '$log', '$routeParams', '$http', function($scope, $log, $routeParams,$http) {  
    $http.get('http://127.0.0.1/VariousClassifiedWeb/api', {
    params: { id: $routeParams.num }
}).success(function (result) {
            $scope.classified = result;            
        });    
}]);


  function chunk(arr, size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr;
}

