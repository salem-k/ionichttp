appContext.factory("HomeService", function($http, $cordovaFile, $cordovaFileTransfer) {

    var getOperation = function() {
        var request = {
          //  url: "http://ec2-52-33-106-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/operation/operation.txt?tmp="+ (new Date().getTime()), //prod
            url: "http://ec2-52-25-133-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/operation/operation.txt?tmp="+ (new Date().getTime()), //dev
            method: "GET",
            cache: false,
            transformResponse: function(data) {
                var array = new Array();
                array = data.split(";");
                return array;
            },
            timeout: 2000,
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

}).factory("RunService",function($http){
  var register = function(deviceId, deviceToken){
    registerRequest = {
        url : " http://ec2-52-25-133-148.us-west-2.compute.amazonaws.com/BRbackoffice/web/app_dev.php/register/create",
        method : "POST",
        data : {
          deviceId : deviceId,
          deviceToken : deviceToken
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for ( var p in obj)
            str.push(encodeURIComponent(p) + "="
                    + encodeURIComponent(obj[p]));
          return str.join("&");
        },
    };
    return $http(registerRequest);
  };
  return {
      register : register,
  }
});
