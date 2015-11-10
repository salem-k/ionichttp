appContext.factory("HomeService", function($http,$cordovaFile,$cordovaFileTransfer) {

    var getOperation = function() {
        var request = {
            url: "http://ec2-52-33-124-74.us-west-2.compute.amazonaws.com/BRbackoffice/symfony/web/operation/operation.txt?tmp="+ (new Date().getTime()),
            method: "GET",
            cache: false,
            transformResponse: function(data) {
                var array = new Array();
                array = data.split(";");
                return array;
            },
            timeout: 1000,
        }
        return $http(request);
    };


    /**
     * check if file exist
     */
    var fileExist = function(fileName, callBack) {

        if (window.cordova) {
            if (/Android|BlackBerry Mini/i.test(navigator.userAgent)) {
                path = cordova.file.applicationStorageDirectory;
            } else if (ionic.Platform.isWindowsPhone()) {
                path = "//";
            } else {
                path = cordova.file.documentsDirectory;
            }

            $cordovaFile.checkFile(path, fileName)
                .then(function(success) {
                    // success
                    if (window.localStorage.getItem('encours' + fileName)) {
                        callBack("404");
                    } else {
                        callBack(success.nativeURL);
                    }

                }, function(error) {
                    // error
                    callBack("404");

                });
        }else{
          console.warn("desktop env");
        }

    };

    /**
     * download photo serveur
     */
    var downloadImg = function( fileName, url, callBack) {

        if (window.cordova) {

          if (/Android|BlackBerry Mini/i.test(navigator.userAgent)) {
              path = cordova.file.applicationStorageDirectory;
          } else if (ionic.Platform.isWindowsPhone()) {
              path = "//";
          } else {
              path = cordova.file.documentsDirectory;
          }

            $cordovaFile.createFile(path, fileName, true)
                .then(function(success) {
                    window.localStorage.setItem('encours' + fileName, true);
                    var targetPath = success.nativeURL;
                    var trustHosts = true;
                    var options = {};
                    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                        .then(function(result) {
                            //successs
                            window.localStorage.removeItem('encours' + fileName);
                            callBack(result.nativeURL);
                        }, function(err) {
                            console.log('erreur download' + err.message);
                            // Error
                            console.log('path' + path);
                            console.log('fileName' + fileName);
                            $cordovaFile.removeFile(path, fileName)
                                .then(function(success) {
                                    window.localStorage.removeItem('encours' + fileName);

                                    callBack("404");
                                }, function(error) {
                                    // error
                                    window.localStorage.removeItem('encours' + fileName);
                                    console.log('erreur remove');
                                    callBack("404");
                                });

                        }, function(progress) {

                        });

                }, function(error) {
                    // error
                    console.error(JSON.stringify(error));
                    callBack("404");
                });

        } else {
          console.log
            callBack("404");
        }
    };

    return {
        getOperation: getOperation,
        fileExist: fileExist,
        downloadImg : downloadImg,
    }

})
