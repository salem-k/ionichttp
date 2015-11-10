appContext.controller("HomeController", function(HomeService, $scope,$interval,$ionicLoading, $cordovaMedia) {


  $interval(callAtInterval, 200);

    /**
     * $interval payload
     */
     function callAtInterval() {
        HomeService.getOperation()
            .success(function(response, status, headers, config) {
              label = response[0];
              text = response[1];
              textcolor = response[2];
              bgcolor = response[3];
              image = response[4];
              sound = response[5];

              $scope.bgColor = bgcolor;
              $scope.text = text;
              $scope.textcolor = textcolor;
              $scope.imgSrc = image;
              if( image == "" )
                $scope.show = false;
              /*
                if("color" == response[0]){
                  $scope.bgColor = "#"+response[1];
                  $scope.show = false;
                }else if("image"== response[0]) {
                */
                if(image != ''){
                  $ionicLoading.show({
                    template: 'Loading...'
                  });

                  HomeService.fileExist(image,function(fileName){
                    if ("404" == fileName) {
                      HomeService.downloadImg( image, "http://ec2-52-33-124-74.us-west-2.compute.amazonaws.com/BRbackoffice/symfony/web/uploads/"+image, function(imgURL){
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

                if(sound != ''){
                  $ionicLoading.show({
                    template: 'Loading...'
                  });

                  HomeService.fileExist(sound,function(fileName){
                    if ("404" == fileName) {
                      HomeService.downloadImg( sound, "http://ec2-52-33-124-74.us-west-2.compute.amazonaws.com/BRbackoffice/symfony/web/uploads/"+sound, function(imgURL){
                        //$scope.imgSrc = imgURL+"?"+new Date().getTime();
                        //$scope.show = true;
                        console.log("SRCCC " + src);
                        var src = imgURL;
                        var media = $cordovaMedia.newMedia(src);

                        //media.play(options); // iOS only!
                        media.play(); // Android

//                        media.setVolume(0.5);

                      });
                    } else {
                      console.log("------sound found------- : "+fileName);
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
