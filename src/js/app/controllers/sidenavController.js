(function () {
    'use strict';

    angular
        .module('app')
        .controller('sidenavController', sidenavController);

    sidenavController.$inject = ['$scope', '$mdSidenav'];

    function sidenavController($scope, $mdSidenav) {
        $scope.toggleMenu = function () {
            $mdSidenav('sidenav').toggle();
        };
    };
})();
