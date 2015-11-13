appContext.controller("HomeController", function($scope, $state, $ionicPush, RunService, $cordovaDevice, $ionicLoading,$rootScope) {

  $ionicLoading.show({
       template: 'Loading...'
     });
  //********************
    Ionic.io();
    $ionicPush.init({
      "debug": true,
      "onNotification": function(notification) {
        alert(JSON.stringify(notification));
        console.warn(notification);
      },
      "onRegister": function(data) {
            var deviceToken ;
            deviceToken = $cordovaDevice.getUUID();
            localStorage.setItem('deviceId', data.token);
            localStorage.setItem('deviceToken',deviceToken);
            RunService.register(deviceToken,data.token)
                .success(function(response,status,headers,config){
                  $ionicLoading.hide();
                }).error(function(response) {
                  $ionicLoading.hide();
                  alert("Network Error");
                });
      }
    });
    $ionicPush.register();
    //********************


    $scope.start = function() {
        $state.go("event");
    };
    $rootScope.cancel = function() {
        $ionicLoading.hide();
    };
});
