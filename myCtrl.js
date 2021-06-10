app.controller("myCtrl", function ($scope, $http, $mdDialog) {
    $scope.lenders = [];
    $scope.hasError = false;
    $scope.errorMsg = '';
    $scope.isLoading = false;

    $scope.loadLenderData = function () {
        $scope.isLoading = true;
        $http.get("lenders.json").then(response => {
            $scope.isLoading = false;
            if (response.status === 200 && response.data && response.data.data) {
                $scope.lenders = response.data.data;
            }
        }, error => {
            $scope.isLoading = false;
            $scope.hasError = true;
            $scope.errorMsg = error;
        });
    }

    $scope.showEditDialog = function (lender) {
        $mdDialog.show({
            locals: { data: lender },
            controller: DialogController,
            templateUrl: 'edit-lender-dialog.html',
            parent: angular.element(document.body),
            targetEvent: lender,
            clickOutsideToClose: true,
            fullscreen: false
        }).then(function (lender) {
            $scope.isLoading = true;
            var targetLenderIndex = $scope.lenders.findIndex(l => l.id === lender.id);
            $scope.lenders[targetLenderIndex] = lender;
            $scope.isLoading = false;
        });
    };

    function DialogController($scope, $mdDialog, data) {
        $scope.lender = angular.copy(data);
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.onSave = function () {
            $mdDialog.hide($scope.lender);
        };

    }

    $scope.loadLenderData();


});