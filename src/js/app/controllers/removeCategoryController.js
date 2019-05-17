(function () {
    'use strict';

    angular
        .module('app')
        .controller('removeCategoryController', removeCategoryController);

    removeCategoryController.$inject = ['$scope', '$rootScope', '$filter', '$mdDialog'];

    function removeCategoryController($scope, $rootScope, $filter, $mdDialog) {
        $scope.removeCategory = function (event, category, type) {
            var confirm = $mdDialog.confirm()
                .title('Удалить категорию')
                .textContent('Так же будут удалены все транзакции этой категории')
                .targetEvent(event)
                .ok('Да')
                .cancel('Нет');
                
            $mdDialog.show(confirm).then(function () {
                var removableCategory = $filter('filter')($rootScope.category, {category: category, type: type}, true)[0];
                var categoryIndex = $rootScope.category.indexOf(removableCategory);
                var remivableOperation = $filter('filter')($rootScope.operation, {category:category, type:type}, true);
                var operationIndex = [];

                for (var i = 0; i < remivableOperation.length; i++) {
                    operationIndex.push($rootScope.operation.indexOf(remivableOperation[i]));
                }

                for (var o = operationIndex.length - 1; o >= 0; o--) {
                    $rootScope.operation.splice(operationIndex[o], 1);
                }

                $rootScope.category.splice(categoryIndex, 1);

                localStorage.setItem('category', JSON.stringify($rootScope.category));
                localStorage.setItem('operation', JSON.stringify($rootScope.operation));
            });
        };
    }
})();
