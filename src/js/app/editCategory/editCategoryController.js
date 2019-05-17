(function () {
    'use strict';

    angular
        .module('app')
        .controller('editCategoryController', editCategoryController);

    editCategoryController.$inject = ['$scope', '$rootScope', '$filter', '$stateParams', '$mdDialog', '$mdToast'];

    function editCategoryController($scope, $rootScope, $filter, $stateParams, $mdDialog, $mdToast) {
        $scope.editableCategory = $filter('filter')($rootScope.category, { id: $stateParams.id }, true)[0];
        var type = $scope.editableCategory.type;
        var index = $rootScope.category.indexOf($scope.editableCategory);
        $scope.name = $scope.editableCategory.name;
        $scope.icon = $scope.editableCategory.icon;

        $scope.openDialog = function (event) {
            $mdDialog.show({
                controller: 'dialogController',
                templateUrl: 'views/iconsDialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            })
                .then(function (icon) {
                    $scope.icon = icon.icon;
                });
        }

        $scope.save = function () {
            var category = $filter('filter')($rootScope.category, { name: $scope.name, type: type }, true)[0];
            if (category && category.name === $scope.name) {
                $mdToast.show({
                    position: 'bottom',
                    templateUrl: 'views/message.html'
                });
            } else {
                var editableOperation = $filter('filter')($rootScope.operation, { category: $scope.editableCategory.name, type: type }, true);
                var operationsIndex = [];
                $rootScope.category[index].name = $scope.name;
                $rootScope.category[index].icon = $scope.icon;

                for (var i = 0; i < editableOperation.length; i++) {
                    operationsIndex.push($rootScope.operation.indexOf(editableOperation[i]));
                }

                for (var o = 0; o < operationsIndex.length; o++) {
                    $rootScope.operation[operationsIndex[o]].category = $scope.name;
                }

                localStorage.setItem('category', JSON.stringify($rootScope.category));
                localStorage.setItem('operation', JSON.stringify($rootScope.operation));
                history.back();
            }
        };
    }
})();
