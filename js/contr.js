app.controller('main', function ($scope,$http) {

    $scope.rootForms = {}

    $scope.getData = function (blocks) {

        $http({
            method: 'POST',
            url: '/api/get.api',
            data: {'blocs':blocks.join()}
        }).then(function successCallback(response) {
            //console.log (response);
            
            var res = response.data.split("\n");
            //console.log (res.length)
            for (var i=0;res.length>i;i++){
              var item = res[i].split("=");
              if (item.length>1) {
                  var nameVar = item[0].split(".");
                  item.splice(0,1);
                  var value = item.join('=');
                  //console.log (nameVar , value);
                  
                // console.log ($scope.rootForms.netConfig);
                 eval (   'var block = $scope.rootForms.' + nameVar[0])
                 if ( block == undefined )  eval ('$scope.rootForms.'+nameVar[0]+' = {}');
                 eval ('$scope.rootForms.'+nameVar[0]+'.'+ nameVar[1]+' = value');
                  
              }
            }
            
        }, function errorCallback(response) {
            
             $scope.message = 'Ошибка! (getData) - ' + response.status;
            $('#Modal').foundation('reveal', 'open');
            
        });

    }

    $scope.setData = function (blocks) {
        data='';
        
        for (var i=0;blocks.length>i;i++){
            eval ('var item = $scope.rootForms.' +blocks[i]);
            //console.log(item);
            for (key in item) {
                data += blocks[i] + '.' + key +"=" + item[key] + "\n";
            }
        }
                       
        $http({
            method: 'POST',
            url: '/api/set.api' ,
            data: data
        }).then(function successCallback(response) {
            
        }, function errorCallback(response) {
            
            $scope.message = 'Ошибка! (setData) - ' + response.status;
            $('#Modal').foundation('reveal', 'open');
                        
        });

    }

});

