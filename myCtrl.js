app.controller("myCtrl", function ($scope, $http) {
    $scope.lenders = [];
    $scope.hasError = false;
    $scope.errorMsg = '';

    $scope.isLoading = true;
    $http.get("lenders.json").then(response => {
        $scope.isLoading = false;
        if (response.status === 200 && response.data && response.data.data) {
            $scope.lenders = response.data.data.map(data => data.attributes);
        }
    }, error => {
        $scope.isLoading = false;
        $scope.hasError = true;
        $scope.errorMsg = error;
    });
});