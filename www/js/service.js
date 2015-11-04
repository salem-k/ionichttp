appContext.factory("HomeService", function($http) {
    var getOperation = function() {
        var request = {
            url: "http://ec2-52-32-10-107.us-west-2.compute.amazonaws.com/back/server/operation.txt",
            method: "GET",
            cache: false,
            transformResponse: function(data) {
                var array = new Array();
                array = data.split(";");
                return array;
            },
            timeout: 200,
        }

        return $http(request);
    };

    var checkExistFile = function(nameFile, callBack) {

      if (window.cordova) {
          if (/Android|BlackBerry Mini/i.test(navigator.userAgent)) {
              path = cordova.file.applicationStorageDirectory;
          } else if (ionic.Platform.isWindowsPhone()) {
              path = "//";
          } else {
              path = cordova.file.documentsDirectory;
          }

          $cordovaFile.checkFile(path, nameFile)
              .then(function(success) {
                  // success
                  if (window.localStorage.getItem('encours' + nameFile)) {
                      callBack("img/photo_top_title.jpg");
                  } else {
                      callBack(success.nativeURL);
                  }

              }, function(error) {
                  // error
                  callBack("img/photo_top_title.jpg");

              });
            }

        };

    return {
        getOperation: getOperation,
    }

})
