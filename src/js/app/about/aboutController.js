(function () {
    'use strict';
    
    angular
    .module('app')
    .controller('aboutController', aboutController);
    
    aboutController.$inject = ['$scope'];
    
    function aboutController ($scope) {
        $scope.version = '0.1';
    }
})();