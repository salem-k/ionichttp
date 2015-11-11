appContext.factory("HomeService", function($http, $cordovaFile, $cordovaFileTransfer) {

    var getOperation = function() {
        var request = {
            url: "http://192.168.1.105/BRbackoffice/web/operation/operation.txt?tmp="+ (new Date().getTime()),
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
          callBack("img/ionic.png");
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
                          console.error(JSON.stringify(url));
                          console.error(JSON.stringify(targetPath));
                          console.error(JSON.stringify(options));
                          console.error(JSON.stringify(trustHosts));
                            //successs
                            window.localStorage.removeItem('encours ' + fileName);
                            callBack(result.nativeURL);
                        }, function(err) {
                          console.error(JSON.stringify(err));
                            console.log('erreur download ' + err.message);
                            // Error
                            callBack("404");

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
