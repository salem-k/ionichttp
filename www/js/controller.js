appContext.controller("HomeController", function(HomeService, $scope,$interval,$ionicLoading, $cordovaMedia, $ionicPlatform, $timeout) {

$ionicPlatform.ready(function() {

      $interval(callAtInterval, 6000);

      /*
       var mediaStatusCallback = function(status) {
           if(status == 1) {
               $ionicLoading.show({template: 'Loading...'});
           } else {
               $ionicLoading.hide();
           }
       }

       function getMediaURL(s) {
           var isAndroid = ionic.Platform.isAndroid();
           if(isAndroid) return "/android_asset/www/" + s;
           return s;
        }
        */

   });



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
              //$scope.imgSrc = image;
              console.log();
              if( image == "" )
                $scope.show = false;
              /*
                if("color" == response[0]){
                  $scope.bgColor = "#"+response[1];
                  $scope.show = false;
                }else if("image"== response[0]) {
                */
                if(image != ''){

                  HomeService.fileExist(image,function(fileName){
                    if ("404" == fileName) {
                      HomeService.downloadImg( image, "http://192.168.1.105/BRbackoffice/web/uploads/"+image, function(imgURL){
                        $scope.imgSrc = imgURL+"?"+new Date().getTime();
                        $scope.show = true;
                      });
                    } else {
                      console.log("------image found------- : "+fileName);
                      $scope.imgSrc = fileName+"?"+new Date().getTime();
                      $scope.show = true;
                    }
                  });
                }

                if(sound != ''){

                  HomeService.fileExist(sound,function(fileName){
                    if ("404" == fileName) {
                      HomeService.downloadImg( sound, "http://192.168.1.105/BRbackoffice/web/uploads/"+sound, function(mp3URL){

                        var media = new Media(mp3URL, null, null, mediaStatusCallback);

                        var iOSPlayOptions = {
                          numberOfLoops: 2,
                          playAudioWhenScreenIsLocked : false
                        }
                        if(ionic.Platform.isIOS())
                        media.play(iOSPlayOptions);
                        else
                        media.play();


                      });
                    } else {
                      console.log("------sound found------- : "+fileName);

                      var media = new Media(fileName, null, null, mediaStatusCallback);

                      var iOSPlayOptions = {
                        numberOfLoops: 2,
                        playAudioWhenScreenIsLocked : false
                      }
                      if(ionic.Platform.isIOS())
                      media.play(iOSPlayOptions);
                      else
                      media.play();
                    }

                  });
                }

            })
            .error(function(response, status, headers, config) {
                console.log("/******************/");
                console.log(JSON.stringify(config));
                console.log("/*******************/");
            });
    }

    function getMediaURL(s) {
        var isAndroid = ionic.Platform.isAndroid();
        if(isAndroid) return "/android_asset/www/" + s;
        return s;
     }

     var mediaStatusCallback = function(status) {
         if(status == 1) {
             $ionicLoading.show({template: 'Loading...'});
         } else {
             $ionicLoading.hide();
         }
     }
});
