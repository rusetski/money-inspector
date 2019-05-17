(function () {
    'use strict'

    angular
        .module('app')
        .controller('historyController', historyController);
    
    historyController.$inject = ['$scope', '$window'];
    
    function historyController ($scope, $window) {
        $scope.canBack = false;
        $scope.back = function () {
        console.log($window.history.length);
//            $scope.$emit('backPressed', $window.history.length - 2);
            $window.history.back();
        }
    }
})();
