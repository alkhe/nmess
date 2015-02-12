let __name__App = angular.module('__name__App', ['ngRoute']);

__name__App.config(['$routeProvider', ($route) => {
	$route
		.when('/', {
			controller: 'MainCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

__name__App.controller('MainCtrl', ['$scope', ($scope) => {

}]);
