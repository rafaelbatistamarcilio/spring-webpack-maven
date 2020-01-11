(function () {

    function HomeController() {
        var vm = this;

        vm.$onInit = $onInit;


        function $onInit() {
            testeArrowFunction();
            testeAwait();
        }

        function testeArrowFunction() {
            setTimeout(() => console.log('TESTE ARROW FUNCTION '))
        }

        async function testeAwait() {
            console.log('ANTES AWAIT');
            const response = await testeAsync();
            console.log(response);
        }

        async function testeAsync() {
            return new Promise(resolve => resolve({ teste: 'TESTE ASYNC' }))
        }
    }



    angular.module('app').component('appHome', {
        controller: HomeController,
        template: 'TESTE'

    })

})();