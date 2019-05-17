(function () {
    'use strict';

    angular
        .module('app')
        .factory('percentService', percentService);

    percentService.$inject = ['$filter'];

    function percentService($filter) {
        var service = {
            countPercent: function (operation, category, type, colors, successCallback) {
                var operation = $filter('filter')(operation, type);
                var category = $filter('filter')(category, type);
                var colors = colors;

                var data = [];
                var categoryFilter = [];
                var operationSum = 0;
                var categorySum = [];

                for (var i = 0; i < operation.length; i++) {
                    operationSum = operationSum + +operation[i].total;
                }

                for (var i = 0; i < category.length; i++) {
                    var categoryName = category[i].name;
                    categoryFilter[i] = $filter('filter')(operation, categoryName, true);
                }

                for (var i = 0; i < categoryFilter.length; i++) {
                    var currentFilter = categoryFilter[i];

                    function countSum() {
                        var sum = 0;
                        for (var i = 0; i < currentFilter.length; i++) {
                            sum += +currentFilter[i].total;
                        }
                        return sum;
                    }
                    countSum();
                    categorySum.push(countSum());
                }
                var colorIndex = 0;
                for (var i = 0; i < category.length; i++) {
                    // if (categorySum[i] > 0) {
                        data.push({
                            percent: (Math.round((categorySum[i] / (operationSum / 100)) * 100)) / 100,
                            name: category[i].name,
                            color: colors[colorIndex]
                        });
                        colorIndex++;
                    // }
                }
                
                successCallback(data);
            }
        }
        return service;
    }
})();