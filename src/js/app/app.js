(function () {
    angular
    .module('app', ['ngRoute', 'ui.router', 'ngMaterial', 'ngAnimate'])
    .config(config);
    
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    
    function config ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'mainController'
        })
        .state('add', {
            url: '/add',
            templateUrl: 'views/add.html',
            controller: 'addController'
        })
        .state('single', {
            url: '/single?{id:int}',
            templateUrl: 'views/single.html',
            controller: 'singleController'
        })
        .state('operations', {
            url: '/operations',
            templateUrl: 'views/operations.html',
            controller: 'operationsController'
        })
        .state('category', {
            url: '/category',
            templateUrl: 'views/category.html',
            controller: 'categoryController'
        })
        .state('editcategory', {
            url: '/editcategory?{id:int}',
            templateUrl: 'views/editCategory.html',
            controller: 'editCategoryController'
        })
        .state('statistics', {
            url: '/statistics',
            templateUrl: 'views/statistics.html',
            controller: 'statisticsController'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html',
            controller: 'aboutController'
        });
        
        $urlRouterProvider.otherwise('/');
    };

})();