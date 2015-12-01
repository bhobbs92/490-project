(function() {

    angular
    .module('admin', ['auth'])
    .controller('manageCustomersCtrl', manageCustomersCtrl);

    manageCustomersCtrl.inject = ['$scope', '$http', '$state', 'authFactory'];

    function manageCustomersCtrl ($scope, $http, $state, authFactory) {
        $scope.formData = {};

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
    };
}());
