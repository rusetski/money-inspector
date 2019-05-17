(function () {
    'use strict';

    angular
        .module('app')
        .controller('statisticsController', statisticsController);

    statisticsController.$inject = ['$scope', '$rootScope', 'piechartService', 'percentService'];

    function statisticsController($scope, $rootScope, piechartService, percentService) {
        percentService.countPercent($rootScope.operation, $rootScope.category, 'Расходы', $rootScope.colors, function (data) {
            $scope.costData = data;
        });

        percentService.countPercent($rootScope.operation, $rootScope.category, 'Доходы', $rootScope.colors, function (data) {
            $scope.incomesData = data;
        });

        $scope.piechartCosts = function () {
            var canvasCosts = document.getElementById('piechartCosts');
            piechartService.drawPiechart({
                canvas: canvasCosts,
                data: $scope.costData,
                colors: $rootScope.colors
            });
        }
        $scope.piechartIncomes = function () {
            var canvasIncomes = document.getElementById('piechartIncomes');
            piechartService.drawPiechart({
                canvas: canvasIncomes,
                data: $scope.incomesData,
                colors: $rootScope.colors
            });
        }
    }
})();