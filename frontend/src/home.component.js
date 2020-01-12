(function () {

    function HomeController() {
        var vm = this;

        vm.$onInit = $onInit;


        function $onInit() {
            console.log('$onInit');
        }
    }

    angular.module('app').component('appHome', { controller: HomeController, template: 'TESTE' });
})();