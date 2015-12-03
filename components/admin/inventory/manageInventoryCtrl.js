(function(){

  angular
  .module('admin')
  .controller('manageInventoryCtrl', manageInventoryCtrl);

  manageInventoryCtrl.inject = ['$scope', '$http', '$state', 'authFactory'];

  function manageInventoryCtrl($scope, $http, $state, authFactory){
    $scope.cart = [];
    $scope.purchased = {};

    $scope.addToCart = addToCart;
    $scope.getStock = getStock;
    $scope.getTotalPrice = getTotalPrice;
    $scope.removeItemFromCart = removeItemFromCart;
    $scope.logout = logout;
    $scope.goToInvoice = goToInvoice;

    $scope.formData = {
      showAddForm : false
    };

    $scope.model = {
        showForm : undefined,
        rowData : undefined,
        recordValue : undefined,
        column: undefined
    };


    $http.get('api/inventory.php')
      .then(function (res) {
        var data = res.data;
        console.log(data);
        if (data.success) {
          $scope.items = data.items;
        }
      });

    function addToCart (itemIndex) {
      var currentItem = $scope.items[itemIndex];

      if (currentItem.stock > 0) {

        if ($scope.purchased[currentItem.name]) {
          console.log('Incrementing ' + currentItem.name + ' \'s amount');
          $scope.purchased[currentItem.name].amount++
        } else {
          console.log('Need to create ' + currentItem.name);
          $scope.purchased[currentItem.name] = currentItem;
          $scope.purchased[currentItem.name].amount = 1;
        }

        console.log($scope.purchased);

        currentItem.stock--;
        $scope.cart.push(currentItem);
      }
    }

    function getStock (itemIndex) {
      var currentItem = $scope.items[itemIndex];
      if (currentItem.stock > 30) {
        return 'plenty';
      } else if (currentItem.stock > 10) {
        return 'some';
      } else {
        return 'almostGone';
      }
    }

    function getTotalPrice () {
      var cart = $scope.cart;
      var totalPrice = 0;

      for (var i = 0; i < cart.length; i++) {
        var price = parseInt(cart[i].price);
        totalPrice += price;
      }

      return totalPrice;
    }

    function removeItemFromCart (itemToDelete, itemIndex) {
      if ($scope.purchased[itemToDelete.name].amount === 1) {
        delete $scope.purchased[itemToDelete.name];
      } else {
        $scope.purchased[itemToDelete.name].amount --;
      }

      console.log($scope.purchased[itemToDelete.name]);

      for (var i = 0; i < $scope.items.length; i++) {
        var item = $scope.items[i];

        if (item.itemId === itemToDelete.itemId) {
          item.stock++;
        }
      }

      $scope.cart.splice(itemIndex, 1);
    }

    function logout () {
      authFactory.removeToken();
      $state.go('login');
    }

    function loopThruItems (items, action) {
      for (var i = 0; i < items.length; i++) {
        action(items[i]);
      }
    }

    $scope.showEditForm = function (index, element){
      $scope.model.showForm = ""+index+element;   // unique identifier for displaying form for only that record
      $scope.model.rowData = $scope.items[index];
      $scope.model.recordValue = $scope.model.rowData[element];

      //get the name of the key the user is trying to edit
      for (var key in $scope.model.rowData ){
        if(isNaN(key)){ //filters object by discarding array elements
          if($scope.model.rowData[key] == $scope.model.recordValue){
            $scope.model.column = key;
          }
        }
      }
    }

    var getuniqueId = function(){
      var highestId = 0;
      var currentId;
      for (var element in $scope.items){
        currentId = Number($scope.items[element].itemId); //force coercion to number
        if( highestId <= currentId){
          highestId = currentId;
        }
      }
      return highestId + 1;
    }


    $scope.addToInventory = function(){
      console.log($scope.formData);
      var nextId = getuniqueId();
      //prepare statement
      var preparedStatement = "INSERT INTO Inventory VALUES ("+nextId+", '"+$scope.formData.name+"', "+$scope.formData.price+", "+$scope.formData.stock+") ";

      console.log(preparedStatement);
      $http.post('api/admin/databasePlease.php', preparedStatement).then(
        function(response){
          console.log(response);
          $state.reload();
        }
      )
    }


    $scope.updateInventory = function(){
      //prepare statement
      var preparedStatement = "UPDATE Inventory SET "+ $scope.model.column +" = '" +$scope.model.recordValue+
                                "' WHERE itemId = '" +$scope.model.rowData['itemId']+ "'";

      alert(preparedStatement);
      $http.post('api/admin/databasePlease.php', preparedStatement).then(
        function(response){
          console.log(response);
          $state.reload();
        }
      );
    }

    $scope.deleteInventory = function (index) {
        $http
        .post('api/admin/deleteInventory.php', $scope.items[index])
            .then(function (res) {
              $state.reload();
            });
    };

    function goToInvoice () {
      if (!$scope.cart.length) {
        toastr.error('Your cart has no items!');
      } else {

        $http.post('api/invoice.php', $scope.purchased).then(function(response){
          var data = response.data;
          console.log('response from invoice insertion: ');
          console.log(data);
        });


        $http.post('api/inventoryUpdate.php', $scope.purchased)
          .then(function (res) {
            var data = res.data;
            console.log(res);

            if (data.success) {
              $state.go('invoice', { items: true });
            }
          });

      }
    }
  };
}());
