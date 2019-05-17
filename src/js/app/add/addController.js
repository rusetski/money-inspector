(function () {
    'use strict';

    angular
        .module('app')
        .controller('addController', addController);

    addController.$inject = ['$scope', '$rootScope', '$filter', '$state', '$mdDialog', '$mdToast', 'operationService'];

    function addController($scope, $rootScope, $filter, $state, $mdDialog, $mdToast, operationService) {
        $rootScope.category;
        $scope.newOperation = {};
        $scope.newCategories = {};
        $scope.operations = [
            {
                name: 'Расходы'
            },
            {
                name: 'Доходы'
            }
        ];

        $scope.categories = $rootScope.category;

        $scope.selectedOperation = {
            name: 'Расходы'
        };

        $scope.selectedCategory = {
            name: 'Другое'
        };

        $scope.openDialog = function (event) {
            $mdDialog.show({
                controller: 'dialogController',
                templateUrl: 'views/iconsDialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            })
                .then(function (icon) {
                    $scope.categoryIcon = icon.icon;
                });
        }

        $scope.submitOperation = function () {
            $scope.date = new Date();
            $scope.dataFilter = $filter('date')($scope.date, 'dd.MM.yyyy');
            $scope.timeFilter = $filter('date')($scope.date, 'HH:mm');
            $scope.newOperation.id = $rootScope.operation[0] ? $rootScope.operation[0].id + 1 : 0;
            $scope.newOperation.data = $scope.dataFilter;
            $scope.newOperation.time = $scope.timeFilter;
            $scope.newOperation.total = this.total;
            $scope.newOperation.type = this.selectedOperation.name;
            $scope.newOperation.category = this.selectedCategory.name;
            if ($scope.info) {
                $scope.newOperation.info = this.info;
            } else {
                $scope.newOperation.info = 'Нет';
            }

            $rootScope.operation.unshift($scope.newOperation);
            localStorage.setItem('operation', JSON.stringify($rootScope.operation));
            //            fs.writeFile('../operation.json', $rootScope.operation);
            $scope.newOperation = {};
            history.back();
        }

        $scope.submitCategory = function () {
            $scope.newCategories.id = $rootScope.category[0] ? $rootScope.category[0].id + 1 : 0;
            $scope.newCategories.name = this.categoryName;
            $scope.newCategories.type = this.selectedOperation.name;
            $scope.newCategories.icon = this.categoryIcon;
            var category = $filter('filter')($rootScope.category, {name:$scope.newCategories.name, type:$scope.newCategories.type}, true)[0];
            if (category && category.name === $scope.newCategories.name) {
                $mdToast.show({
                    position: 'bottom right',
                    templateUrl: 'views/message.html'
                });
            } else {
                $rootScope.category.unshift($scope.newCategories);
                localStorage.setItem('category', JSON.stringify($rootScope.category));
                $scope.newCategories = {};
                history.back();
            }
        }
    }

})();
