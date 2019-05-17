(function () {
    'use strict';
    
    angular
    .module('app')
    .controller('singleController', singleController);
    
    singleController.$inject = ['$scope', '$rootScope', '$filter', '$stateParams', 'operationService'];
    
    function singleController ($scope, $rootScope, $filter, $stateParams, operationService) {
        $scope.single = $filter('filter')($rootScope.operation, {id:$stateParams.id})[0];
        $scope.icon = $filter('filter')($rootScope.category, $scope.single.category)[0].icon;
    }
    
})();