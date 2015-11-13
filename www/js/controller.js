appContext.controller("HomeController", function(HomeService, $scope, $interval, $ionicLoading, $cordovaMedia, $ionicPlatform, $timeout) {

  var soundPlaying ;
  var imgDisplaying ;
$ionicPlatform.ready(function() {

      $interval(callAtInterval, 500);
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

                if(image != ''){

                  HomeService.fileExist(image,function(fileName){
                    if ("404" == fileName) {
                      HomeService.downloadImg( image, "http://ec2-52-33-106-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/"+image, function(imgURL){
                        if (imgDisplaying != imgURL) {
                          $scope.imgSrc = imgURL+"?"+new Date().getTime();
                          $scope.show = true;
                          console.log("-*-*-*-*-**---*");
                        }

                          imgDisplaying = imgURL;
                      });
                    } else {
                      console.log("------image found------- : "+fileName);
                      if (imgDisplaying != imgURL) {
                        $scope.imgSrc = fileName+"?"+new Date().getTime();
                        $scope.show = true;
                        console.log("-------****--------");
                      }
                      imgDisplaying = imgURL;
                    }
                  });
                }

                if(sound != ''){

                  HomeService.fileExist(sound,function(fileName){
                    if ("404" == fileName) {
                      HomeService.downloadImg( sound, "http://ec2-52-33-106-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/"+sound, function(mp3URL){

                        var media = new Media(mp3URL, null, null, mediaStatusCallback);

                        var iOSPlayOptions = {
                          numberOfLoops: 2,
                          playAudioWhenScreenIsLocked : false
                        }
                        if(ionic.Platform.isIOS() &&  soundPlaying != mp3URL ) {
                            media.play(iOSPlayOptions);

                        }
                        else if(soundPlaying != mp3URL ){
                            media.play();
                            console.log("not found after play "+soundPlaying);
                        }
                          soundPlaying = mp3URL;
                      });
                    } else {

                      var media = new Media(fileName, null, null, mediaStatusCallback);

                      var iOSPlayOptions = {
                        numberOfLoops: 2,
                        playAudioWhenScreenIsLocked : false
                      }

                      if(ionic.Platform.isIOS() &&  soundPlaying != fileName ) {
                          media.play(iOSPlayOptions);
                          soundPlaying = fileName;
                      }
                      else if(soundPlaying != fileName ){
                          media.play();
                          soundPlaying = fileName;
                          console.log(" found after play "+soundPlaying);
                      }
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
