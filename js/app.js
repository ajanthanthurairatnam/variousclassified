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
        controller: 'addController'
    })    

      .when('/editclass/:num', {
        templateUrl: 'pages/editclassified.html',
        controller: 'editController'
    })
    
    
       .when('/ClassifiedsByCategory/:num', {
        templateUrl: 'pages/classifiedsbycategory.html',
        controller: 'ClassifiedsByCategoryController'
    })
 
});

myApp.controller('mainController', ['$scope','$location', '$http', function ($scope,$location,  $http) {   
    
  $http.get('http://127.0.0.1/VariousClassifiedWeb/api')
        .success(function (result) {
            $scope.classifieds = result;
            $scope.chunkedData = chunk(result, 4);
        });
}]);


myApp.controller('viewController', ['$scope', '$log', '$routeParams', '$http', function($scope, $log, $routeParams,$http) {  
    $http.get('http://127.0.0.1/VariousClassifiedWeb/api', {
    params: { id: $routeParams.num }
}).success(function (result) {
            $scope.classified = result;            
        });    
}]);

myApp.controller('ClassifiedsByCategoryController', ['$scope', '$log', '$routeParams', '$http', function($scope, $log, $routeParams,$http) {  
    $http.get('http://127.0.0.1/VariousClassifiedWeb/api/ClassifiedsByCategoryID', {
    params: { id: $routeParams.num }
}).success(function (result) {
            $scope.classified = result;    
        console.log($scope.classified);
        });    
}]);


myApp.controller('editController', ['$scope', '$log', '$routeParams', '$http','$location', function($scope, $log, $routeParams,$http,$location) { 
    $http.get('http://127.0.0.1/VariousClassifiedWeb/api/Categories')
        .success(function (result) {
            $scope.Categories = result;           
        });
    $http.get('http://127.0.0.1/VariousClassifiedWeb/api', {
    params: { id: $routeParams.num }
}).success(function (result) {
            $scope.classified = result;            
        });    
        $scope.CategoryID=0;    
     $scope.addRule = function () {
        
         if(angular.isUndefined($scope.IsActive))      
             {
                 $scope.IsActive=false;
                 
                  alert($scope.IsActive);
             }        
        
         
         console.log($scope.classified);
        $http.post('http://127.0.0.1/VariousClassifiedWeb/api', { id: $scope.classified[0].ClassifiedID,ClassifiedTitle: $scope.classified[0].ClassifiedTitle,ClassifiedDescription: $scope.classified[0].ClassifiedDescription,CategoryID:$scope.classified[0].CategoryID,ClassifiedImage:$scope.classified[0].ClassfiedImage,IsActive:$scope.classified[0].IsActive})
            .success(function (result) {
                  if ($http.pendingRequests.length > 0) {                   
                } else {                    
                      var landingUrl = '/';  
                 $location.url(landingUrl);
                }
            

            })
    };   
    
         $scope.deleteRule = function () {
        $http.post('http://127.0.0.1/VariousClassifiedWeb/Api/Delete', { id: $scope.classified[0].ClassifiedID})
            .success(function (result) {
                  if ($http.pendingRequests.length > 0) {                   
                } else {                    
                      var landingUrl = '/';  
                 $location.url(landingUrl);
                }
            

            })
    }; 
    
    $scope.showMyImage = function (fileInput) {
        var files = fileInput.files;
        for (var i = 0; i < files.length; i++) {           
            var file = files[i];
            var imageType = /image.*/;     
            if (!file.type.match(imageType)) {
                continue;
            }           
            var img=document.getElementById("img");            
            img.file = file;    
            var reader = new FileReader();
            reader.onload = (function(aImg) { 
                return function(e) {                                        
                    aImg.src = e.target.result;                     
         document.getElementById("img").value=e.target.result;                  
                   $scope.classified[0].ClassfiedImage=e.target.result;
                     console.log($scope.classified[0].ClassfiedImage);
                     $scope.$digest();
                }; 
            })(img);
            reader.readAsDataURL(file);
        }    
    };

}]);

myApp.controller('addController', ['$scope', '$http','$location', function ($scope,  $http,$location) {       
  $http.get('http://127.0.0.1/VariousClassifiedWeb/api/Categories')
        .success(function (result) {
            $scope.Categories = result;           
        });
            $scope.ClassifiedTitle = '';
        $scope.ClassifiedDescription = '';
     $scope.CategoryImage = '';
   $scope.uploadedFile = function(element) {
 $scope.$apply(function($scope) {
   $scope.files = element.files;        
     console.log($scope.files);
 });
}
    $scope.CategoryID=0;    
     $scope.addRule = function () {
        
         if(angular.isUndefined($scope.IsActive))      
             {
                 $scope.IsActive=false;
                 
                  alert($scope.IsActive);
             }
        $http.post('http://127.0.0.1/VariousClassifiedWeb/api', { ClassifiedTitle: $scope.ClassifiedTitle,ClassifiedDescription: $scope.ClassifiedDescription,CategoryID:$scope.CategoryID,ClassifiedImage:$scope.ClassfiedImage,IsActive:$scope.IsActive})
            .success(function (result) {
                  if ($http.pendingRequests.length > 0) {                   
                } else {                    
                      var landingUrl = '/';  
                 $location.url(landingUrl);
                }
            

            })
    };   
    
    $scope.showMyImage = function (fileInput) {
        var files = fileInput.files;
        for (var i = 0; i < files.length; i++) {           
            var file = files[i];
            var imageType = /image.*/;     
            if (!file.type.match(imageType)) {
                continue;
            }           
            var img=document.getElementById("img");            
            img.file = file;    
            var reader = new FileReader();
            reader.onload = (function(aImg) { 
                return function(e) {                                        
                    aImg.src = e.target.result;                    
         document.getElementById("img").value=e.target.result;
                   $scope.ClassfiedImage=e.target.result;
                     $scope.$digest();
                }; 
            })(img);
            reader.readAsDataURL(file);
        }    
    };

}]);

  function chunk(arr, size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr;
}



