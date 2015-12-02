(function() {

    angular
    .module('admin', ['auth'])
    .controller('manageCustomersCtrl', manageCustomersCtrl);

    manageCustomersCtrl.inject = ['$scope', '$http', '$state', 'authFactory'];

    function manageCustomersCtrl ($scope, $http, $state, authFactory) {
        $scope.formData = {};
        $scope.model = {
            showForm : undefined,
            rowData : undefined,
            recordValue : undefined,
            column: undefined
        };

        $http.get('api/admin/customerSelect.php')
            .then(function (response) {
                $scope.customers = response.data.items;
            });

        $scope.addCustomer = function () {
            var validForm = (Object.keys($scope.formData).length === 4);

            if (!validForm) {
                toastr.error('Please complete the form');
            } else {
                $http.post('api/signup.php', $scope.formData)
                    .then(function (res) {
                        $scope.customers.push($scope.formData);  //unshift looked cooler:)
                        $scope.formData = {};
                    });
            }
        }

        $scope.deleteCustomer = function (index) {
            $http
            .post('api/admin/deleteUser.php', $scope.customers[index])
                .then(function (res) {
                  $scope.customers.splice(index, 1);
                    console.log(res);
                });
        };

        $scope.showEditForm = function (index, element){
          $scope.model.showForm = ""+index+element;   // display form for that record
          $scope.model.rowData = $scope.customers[index];
          $scope.model.recordValue = $scope.model.rowData[element];

          //get the name of the key the user is trying to edit
          for (var key in $scope.model.rowData ){
            if(isNaN(key)){
              if($scope.model.rowData[key] == $scope.model.recordValue){
                $scope.model.column = key;
              }
            }
          }
        }

        $scope.editCustomer = function(){
          //prepare statement
          var preparedStatement = "UPDATE Customer SET "+ $scope.model.column +" = '" +$scope.model.recordValue+ "' WHERE customerId = '" +$scope.model.rowData['customerId']+ "'"
          $http.post('api/admin/updateCustomer.php', preparedStatement).then(
            function(response){
              console.log(response);
              $state.reload();
            }
          )
        }
    };
}());
