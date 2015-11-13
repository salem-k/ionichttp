appContext.controller("EventController", function(HomeService, $scope, $interval, $ionicLoading, $cordovaMedia, $ionicPlatform, $timeout) {

    var soundPlaying;
    var imgDisplaying;
    $ionicPlatform.ready(function() {

        $interval(callAtInterval, 2000);
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
                console.warn(text);
                console.log("text");
                if (image == "" || text !="")
                    $scope.show = false;

                if (image != ''   && text =="") {

                    HomeService.fileExist(image, function(fileName) {
                        if ("404" == fileName) {
                            // HomeService.downloadImg(image, "http://ec2-52-33-106-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + image, function(imgURL) { //prod
                            HomeService.downloadImg(image, "http://ec2-52-25-133-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + image, function(imgURL) { //dev
                                if (imgDisplaying != imgURL) {
                                    $scope.imgSrc = imgURL + "?" + new Date().getTime();
                                    $scope.show = true;
                                }

                                imgDisplaying = imgURL;
                            });
                        } else {
                            if (imgDisplaying != fileName) {
                                $scope.imgSrc = fileName + "?" + new Date().getTime();
                                $scope.show = true;
                            }
                            imgDisplaying = fileName;
                        }
                    });
                }
                if (sound != '') {
                    HomeService.fileExist(sound, function(fileName) {
                        if ("404" == fileName) {
                            // HomeService.downloadImg(sound, "http://ec2-52-33-106-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + sound, function(mp3URL) { //prod
                            HomeService.downloadImg(sound, "http://ec2-52-25-133-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/uploads/" + sound, function(mp3URL) { //dev

                                var media = new Media(mp3URL, null, null, mediaStatusCallback);

                                var iOSPlayOptions = {
                                    numberOfLoops: 2,
                                    playAudioWhenScreenIsLocked: false
                                }
                                if (ionic.Platform.isIOS() && soundPlaying != mp3URL) {
                                    media.play(iOSPlayOptions);

                                } else if (soundPlaying != mp3URL) {
                                    media.play();
                                }
                                soundPlaying = mp3URL;
                            });
                        } else {

                            var media = new Media(fileName, null, null, mediaStatusCallback);

                            var iOSPlayOptions = {
                                numberOfLoops: 2,
                                playAudioWhenScreenIsLocked: false
                            }

                            if (ionic.Platform.isIOS() && soundPlaying != fileName) {
                                media.play(iOSPlayOptions);
                                soundPlaying = fileName;
                            } else if (soundPlaying != fileName) {
                                media.play();
                                soundPlaying = fileName;
                            }
                        }

                    });
                }

            })
            .error(function(response, status, headers, config) {
                console.error(JSON.stringify(config));
            });
    }

    function getMediaURL(s) {
        var isAndroid = ionic.Platform.isAndroid();
        if (isAndroid) return "/android_asset/www/" + s;
        return s;
    }

    var mediaStatusCallback = function(status) {
        if (status == 1) {
            $ionicLoading.show({
                template: 'Loading...'
            });
        } else {
            $ionicLoading.hide();
        }
    }
});
