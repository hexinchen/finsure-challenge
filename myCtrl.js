app.controller("myCtrl", function ($scope, $http, $mdDialog, $mdToast) {
    $scope.allLenders = [];
    $scope.lendersResponse = null;
    $scope.hasError = false;
    $scope.errorMsg = '';
    $scope.isLoading = false;
    $scope.PAGE_SIZE = 20;
    $scope.currentPageIndex = 0;
    $scope.currentLenderBatch = [];
    $scope.pageIndexList = [];


    $scope.loadLenderData = function () {
        $scope.isLoading = true;
        $http.get("lenders.json").then(response => {
            $scope.isLoading = false;
            if (response.status === 200 && response.data && response.data.data) {
                $scope.lendersResponse = response.data;
                $scope.allLenders = response.data.data;
                $scope.initPagination();
                $scope.pageIndexList = [...Array($scope.allLenders.length / $scope.PAGE_SIZE).keys()];

            }
        }, error => {
            //todo
        })
    }

    $scope.onPageChange = function (index) {
        $scope.currentPageIndex = index;
        $scope.currentLenderBatch = $scope.allLenders.slice(index * $scope.PAGE_SIZE, index * $scope.PAGE_SIZE + $scope.PAGE_SIZE);
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }

    $scope.onPrev = function () {
        $scope.onPageChange($scope.currentPageIndex - 1);
    }

    $scope.onNext = function () {
        $scope.onPageChange($scope.currentPageIndex + 1);
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
            var targetLenderIndex = $scope.allLenders.findIndex(l => l.id === lender.id);
            $scope.allLenders[targetLenderIndex] = lender;
            $scope.initPagination();
            $scope.isLoading = false;
            $scope.showConfirmToast();

        });
    };

    $scope.initPagination = function () {
        $scope.currentPageIndex = 0;
        $scope.currentLenderBatch = $scope.allLenders.slice(0, $scope.PAGE_SIZE);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    $scope.showConfirmToast = function () {
        $mdToast.show(
            $mdToast.simple()
                .textContent('Your change has been saved!')
                .position('top right')
                .hideDelay(3000))
    }

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