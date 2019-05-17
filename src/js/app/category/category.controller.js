(function () {
    'use strict';
    
    angular
    .module('app')
    .controller('categoryController', categoryController);
    
    categoryController.$inject = ['$scope', '$rootScope', '$filter', 'percentService'];
    
    function categoryController ($scope, $rootScope, $filter, percentService) {
        percentService.countPercent($rootScope.operation, $rootScope.category, 'Расходы', $rootScope.colors, function (data) {
            $scope.costData = data;
        });
        
        percentService.countPercent($rootScope.operation, $rootScope.category, 'Доходы', $rootScope.colors, function (data) {
            $scope.incomesData = data;
        });

        $scope.operationLenght = function (category, type) {
            var operationLenght = $filter('filter')($rootScope.operation, {category: category, type: type}, true);
            return operationLenght.length;
        }

        $scope.getCategory = function (category, type, callback) {
            var filter = $filter('filter')($rootScope.category, {name: category, type: type}, true)[0];
            return filter;
        }
    }
    
})();