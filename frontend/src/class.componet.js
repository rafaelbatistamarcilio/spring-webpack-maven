(() => {
    class ClassComponent {
        static name = 'appClassComponent';
        static controller = this;
        static templateUrl = 'angular-templates/class.component.html';

        $onInit() {
            console.log('ClassComponent 3');
        }
    }

    angular.module('app').component(ClassComponent.name, ClassComponent);
})()
