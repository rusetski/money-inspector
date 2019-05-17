(function () {
    'use strict';
    
    angular
    .module('app')
    .controller('dialogController', dialogController);
    
    dialogController.$inject = ['$scope', '$mdDialog'];
    
    function dialogController ($scope, $mdDialog) {
        $scope.icons = ['cart', 'car', 'cake', 'flight', 'kitchen', 'restaurant', 'taxi', 'weekend', 'credit_card', 'videogame', 'store', 'education', 'gas_station', 'bar', 'star', 'fitness', 'favorite', 'bus', 'bank', 'wallet'];
        
        $scope.cancel = function () {
            $mdDialog.cancel()
        }
        
        $scope.selectedIcon = function (icon) {
            $mdDialog.hide(icon);
        }
    };
    
})();