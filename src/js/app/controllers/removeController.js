(function () {
    'use strict';

    angular
        .module('app')
        .controller('removeController', removeController);

    removeController.$inject = ['$scope', '$rootScope', '$filter', '$stateParams', '$mdDialog'];

    function removeController($scope, $rootScope, $filter, $stateParams, $mdDialog) {
        $scope.remove = function (event) {
            var index = $rootScope.operation.indexOf($filter('filter')($rootScope.operation, {id: $stateParams.id})[0]);
            var confirm = $mdDialog.confirm()
                .title('Удалить транзакцию?')
                .targetEvent(event)
                .ok('Да')
                .cancel('Нет');

            $mdDialog.show(confirm).then(function () {
                $rootScope.operation.splice(index, 1);
                localStorage.setItem('operation', JSON.stringify($rootScope.operation));
                history.back();
            });

        }
    }
})();
