angular
  .module('ie8Linter', ['angular-loading-bar', 'angular-ladda', 'ngResource', 'ui.bootstrap'])
  .factory('Problems', ['$resource', function($resource) {
    return $resource('/lint/:address', {address:'@id'}, {});
  }])
  .controller('LinterCtrl', ['$scope', 'Problems', '$modal', '$location', function($scope, Problems, $modal, $location){
    $scope.address;
    $scope.loading = false;

    $scope.init = function(){
      if($location.search().address){
        $scope.address = $location.search().address;
        $scope.submit();
      }
    };

    $scope.submit = function(){
      $scope.loading = true;
      $location.search('address', $scope.address);

      Problems.get({ address: $scope.address },
        function(response){
          $scope.loading = false;

          if(response.success){
            $scope.problems = response.data;
          }
        },
        function(response){
          $scope.loading = false;

          if(response.data && response.data.error){
            $scope.error = response.data.error;
          } else {
            if(!$scope.address){
              $scope.error = "Asking me to lint an empty url, aren't we?";
            } else {
              $scope.error = "Something went wrong. If only I knew what...";
            }
          }

          var modalInstance = $modal.open({
            templateUrl: 'oopsModal.html',
            scope: $scope
          });
        }
      );

    };
  }]);
