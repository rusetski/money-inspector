(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainController', mainController);

    mainController.$inject = ['$scope', '$rootScope', '$http', '$filter', 'operationService', 'percentService'];

    function mainController($scope, $rootScope, $http, $filter, operationService, percentService) {
        $rootScope.operation = [];
        $rootScope.category = [];
        $rootScope.costData = [];
        $rootScope.incomesData = [];
        $rootScope.colors = ['#6d78ad', '#51cda0', '#df7970', '#4c9ca0', '#ae7d99', '#c9d45c', '#5592ad', '#df874d', '#52bca8', '#8e7aa3', '#e3cb64', '#c77b85', '#c39762d', '#8dd17e', '#b57952', '#fcc26c'];
        operationService.getOperation(function (operation) {
            if (operation) {
                $rootScope.operation = JSON.parse(operation);
            }
        });

        operationService.getCategory(function (category) {
            if (category) {
                $rootScope.category = JSON.parse(category);
            }
        });

        // percentService.countPercent($rootScope.operation, $rootScope.category, 'Расходы', $rootScope.colors, function (data) {
        //     $rootScope.costData = data;
        // });

        // percentService.countPercent($rootScope.operation, $rootScope.category, 'Доходы', $rootScope.colors, function (data) {
        //     $rootScope.incomesData = data;
        // });

        $scope.icon = function (category) {
            return $filter('filter')($rootScope.category, category)[0].icon;
        }
    }

})();
