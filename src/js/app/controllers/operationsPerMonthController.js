(function () {
    'use strict';

    angular
        .module('app')
        .controller('operationsPerMonthController', operationsPerMonthController);

    operationsPerMonthController.$inject = ['$scope', '$rootScope', '$filter'];

    function operationsPerMonthController($scope, $rootScope, $filter) {
        $scope.date = new Date;
        $scope.currentMonth = $filter('date')($scope.date, 'MM.yyyy');
        
        $scope.sum = {
            costsSum: 0,
            incomesSum: 0,
            balance: function () {
                return $scope.sum.incomesSum - $scope.sum.costsSum;
            }
        }

        if ($rootScope.operation.length > 0) {
            var costs = $filter('filter')($filter('filter')($rootScope.operation, 'Расходы'), $scope.currentMonth);
            var incomes = $filter('filter')($filter('filter')($rootScope.operation, 'Доходы'), $scope.currentMonth);

            for (var i = 0; i < costs.length; i++) {
                $scope.sum.costsSum = $scope.sum.costsSum + +costs[i].total;
            }

            for (var i = 0; i < incomes.length; i++) {
                $scope.sum.incomesSum = $scope.sum.incomesSum + +incomes[i].total;
            }
        }
    }
})();