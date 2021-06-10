app.controller("myCtrl", function ($scope, $http, $mdDialog) {
    $scope.lenders = [];
    $scope.hasError = false;
    $scope.errorMsg = '';

    $scope.isLoading = true;

    $scope.showPrompt = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('What would you name your dog?')
            .textContent('Bowser is a common name.')
            .placeholder('Dog name')
            .ariaLabel('Dog name')
            .initialValue('Buddy')
            .targetEvent(ev)
            .required(true)
            .ok('Okay!')
            .cancel('I\'m a cat person');

        $mdDialog.show(confirm).then(function (result) {
            $scope.status = 'You decided to name your dog ' + result + '.';
        }, function () {
            $scope.status = 'You didn\'t name your dog.';
        });
    };

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