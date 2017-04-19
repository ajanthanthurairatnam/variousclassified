var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/main', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    }) 
    

    .when('/userlist', {
        templateUrl: 'pages/userlist.html',
        controller: 'userlistController'
    }) 
    
        .when('/adduser', {
        templateUrl: 'pages/edituser.html',
        controller: 'edituserController'
    })   
    
     .when('/logout', {       
        controller: 'logoutController'
    })
    
     .when('/edituser/:num', {
        templateUrl: 'pages/edituser.html',
        controller: 'edituserController'
    })
    
     .when('/', {
        templateUrl: 'pages/allclassifieds.html',
        controller: 'allclassifiedsController'
    }) 
    
        .when('/login', {
        templateUrl: 'pages/login.html',
        controller: 'login'
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



myApp.controller('userlistController', ['$scope','$location', '$http', function ($scope,$location,  $http) { 
  $http.get('http://127.0.0.1/VariousClassifiedWeb/api/users')
        .success(function (result) {   
            $scope.userlist = result;          
        });
}]);





myApp.controller('logoutController', ['$scope','$location','$rootScope', '$http', function ($scope,$location, $rootScope, $http) { 
    $rootScope.username=undefined;
    var landingUrl = '/';  
                                 $location.url(landingUrl);  
}]);

myApp.controller('login', ['$scope','$location', '$rootScope','$http', function ($scope,$location, $rootScope, $http) {     
           $scope.login = function () {              
                 $http.post('http://127.0.0.1/VariousClassifiedWeb/api/login', { UserName: $scope.UserName,Password: $scope.Password })
                    .success(function (result) {                    
                                  if ($http.pendingRequests.length > 0) {                   
                                } else {       
                                   if(result.status=='success') 
                                       {
                                           $rootScope.username=$scope.UserName;
                                        var landingUrl = '/';  
                                 $location.url(landingUrl);   
                                       }                                    
                                
                                }
                            })
               
                    
    }; 
}]);



myApp.controller('edituserController', ['$scope','$location','$routeParams', '$http', function ($scope,$location,$routeParams,  $http) { 
    if($routeParams.num){
                $http.get('http://127.0.0.1/VariousClassifiedWeb/api/users', {
    params: { id: $routeParams.num }
}).success(function (result) {          
            $scope.user = result[0];   
            
        }); 
    } 
       $scope.SaveUser = function () {        
         if(angular.isUndefined($scope.user.IsActive))      
             {
                 $scope.user.IsActive=false;
             }    
           console.log($scope.user.IsActive);
  $http.post('http://127.0.0.1/VariousClassifiedWeb/api/SaveUser', { id:$scope.user.ID, UserName: $scope.user.UserName,Password: $scope.user.Password,EMail:$scope.user.EMail,IsActive:$scope.user.IsActive })
    .success(function (result) {
                  if ($http.pendingRequests.length > 0) {                   
                } else {                    
                      var landingUrl = '/userlist';  
                 $location.url(landingUrl);
                }
            })
    };
    
             $scope.deleteUser = function () {
        $http.post('http://127.0.0.1/VariousClassifiedWeb/Api/DeleteUser', { id:$scope.user.ID})
            .success(function (result) {
                  if ($http.pendingRequests.length > 0) {                   
                } else {                    
                      var landingUrl = '/userlist';  
                 $location.url(landingUrl);
                }
            

            })
    };
    
    
}]);


myApp.controller('allclassifiedsController', ['$scope','$location', '$http', function ($scope,$location,  $http) {    
    $http.get('http://127.0.0.1/VariousClassifiedWeb/api/Categories')
        .success(function (result) {
            $scope.Categories = result;           
        });
  $http.get('http://127.0.0.1/VariousClassifiedWeb/api/AllClassifiedsGroupByCategoryID')
        .success(function (result) {
            $scope.classifieds = result;  
      $scope.chunkedData = chunk(result, 4);
        }); 
    $scope.filterMiscellaneousPropertyJobs = function(category){
    return category.CategoryTitle == 'Miscellaneous' || category.CategoryTitle == 'Property'|| category.CategoryTitle == 'Jobs';
    };
     $scope.filterBeautyServicesOther = function(category){
    return category.CategoryTitle == 'Beauty' || category.CategoryTitle == 'Services'|| category.CategoryTitle == 'Other';
    };
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
         $scope.chunkedData = chunk(result, 2);  
       
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
             }    
        $http.post('http://127.0.0.1/VariousClassifiedWeb/api', { id: $scope.classified[0].ClassifiedID,ClassifiedTitle: $scope.classified[0].ClassifiedTitle,ClassifiedDescription: $scope.classified[0].ClassifiedDescription,CategoryID:$scope.classified[0].CategoryID,ClassifiedImage:$scope.classified[0].ClassfiedImage,ContactDetails:$scope.classified[0].ContactDetails,Notes:$scope.classified[0].Notes,IsActive:$scope.classified[0].IsActive})
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
     $http.get('http://127.0.0.1/VariousClassifiedWeb/api/GetReferenceNo')
        .success(function (result) {        
            $scope.Reference = result; 
        });
            $scope.ClassifiedTitle = '';
        $scope.ClassifiedDescription = '';
     $scope.CategoryImage = '';
   $scope.uploadedFile = function(element) {
 $scope.$apply(function($scope) {
   $scope.files = element.files;   
 });
}
    $scope.CategoryID=0;    
     $scope.addRule = function () {
        
         if(angular.isUndefined($scope.IsActive))      
             {
                 $scope.IsActive=false;                 
                  
             }         
        $http.post('http://127.0.0.1/VariousClassifiedWeb/api', { ClassifiedTitle: $scope.ClassifiedTitle,ClassifiedDescription: $scope.ClassifiedDescription,CategoryID:$scope.CategoryID,ClassifiedImage:$scope.ClassfiedImage,IsActive:$scope.IsActive,ContactDetails:$scope.ContactDetails,Notes:$scope.Notes,RefNo:$scope.Reference[0].NextRefNo})
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



