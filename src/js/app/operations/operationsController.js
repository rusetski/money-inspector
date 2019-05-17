(function () {
    'use strict';

    angular
        .module('app')
        .controller('operationsController', operationsController);

    operationsController.$inject = ['$scope', '$rootScope', '$filter'];

    function operationsController($scope, $rootScope, $filter) {
        var firstDate = $rootScope.operation[$rootScope.operation.length - 1].data.split('.').reverse();
        var lastDate = $rootScope.operation[0].data.split('.').reverse();
        $scope.minDate = new Date(firstDate);
        $scope.maxDate = new Date(lastDate);
        $scope.limit = 10;
        $scope.onFilterChanged = function () {
            $scope.changedDate = $filter('date')($scope.changeDate, 'dd.MM.yyyy');
            $scope.limit = 10;
            console.log($scope.changedDate);
        }
        $scope.more = function () {
            $scope.limit = $scope.limit + 10;
        }

        $scope.icon = function (category) {
            return $filter('filter')($rootScope.category, category)[0].icon;
        }
    };
})();
