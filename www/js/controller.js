appContext.controller("HomeController", function(HomeService, $scope,$interval) {


  $interval(callAtInterval, 200);


     function callAtInterval() {
        HomeService.getOperation()
            .success(function(response, status, headers, config) {
                if("color" == response[0]){
                  $scope.bgColor = "#"+response[1];
                }else {

                }
            })
            .error(function(response, status, headers, config) {
                console.log(response);
            });
    };
})
