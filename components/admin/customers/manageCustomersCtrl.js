(function(){

  angular
  .module('admin', ['auth'])
  .controller('manageCustomersCtrl', manageCustomersCtrl);

  manageCustomersCtrl.inject = ['$scope', '$http', '$state', 'authFactory'];

  function manageCustomersCtrl($scope, $http, $state, authFactory){
    $scope.customers;
    $scope.formData = {};

    $http.get('api/admin/customerSelect.php').then(
      function(response){
        $scope.customers = response.data.items;
      }
    );

    $scope.addCustomer = function(){
      $http.post('api/signup.php', $scope.formData);
      $scope.customers.unshift($scope.formData);
      $scope.customers;
      $scope.formData = {};
    }


  };
}());
