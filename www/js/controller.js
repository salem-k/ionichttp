appContext.controller("HomeController", function(HomeService, $scope,$interval,$ionicLoading) {


  $interval(callAtInterval, 200);

    /**
     * $interval payload
     */
     function callAtInterval() {
        HomeService.getOperation()
            .success(function(response, status, headers, config) {
                if("color" == response[0]){
                  $scope.bgColor = "#"+response[1];
                  $scope.show = false;
                }else if("image"== response[0]) {
                  $ionicLoading.show({
                    template: 'Loading...'
                  });
                  HomeService.fileExist(response[1],function(fileName){
                    if ("404" == fileName) {
                      HomeService.downloadImg( response[1], "http://ec2-52-32-10-107.us-west-2.compute.amazonaws.com/back/server/"+response[1], function(imgURL){
                        $scope.imgSrc = imgURL+"?"+new Date().getTime();
                        $scope.show = true;
                      });
                    } else {
                      console.log("------image found------- : "+fileName);
                      $scope.imgSrc = fileName+"?"+new Date().getTime();
                      $scope.show = true;
                    }

                  });
                  $ionicLoading.hide();
                }
            })
            .error(function(response, status, headers, config) {
                console.log("/******************/");
                console.log(JSON.stringify(config));
                console.log("/*******************/");
            });
    }
})
