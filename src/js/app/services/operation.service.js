(function () {
    'use strict';

    angular
        .module('app')
        .factory('operationService', operationService);

    operationService.$inject = ['$rootScope', '$http'];

    function operationService($rootScope, $http) {
        var service = {
            getOperation: function (successCallback) {
                var data = localStorage.getItem('operation');
                successCallback(data);
                //                $http.get('operation.json').then(function (response) {
                //                    var data = response.data;
                //                    successCallback(data);
                //                });
            },
            getCategory: function (successCallback) {
                var data = localStorage.getItem('category');
                successCallback(data);
//                $http.get('category.json').then(function (response) {
//                    var data = response.data;
//                    successCallback(data);
//                });
            }
        }
        return service;
    }

})();
