(function () {
    'use strict';

    angular
        .module('app')
        .controller('sidenavLinkController', sidenavLinkController);

    sidenavLinkController.$inject = ['$scope', '$state', '$mdSidenav'];

    function sidenavLinkController($scope, $state, $mdSidenav) {
        $scope.goto = function (page) {
            $state.go(page);
            $mdSidenav('sidenav').toggle();
        }
    };
})();
