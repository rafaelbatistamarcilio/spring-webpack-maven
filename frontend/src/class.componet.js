import { Constantes } from './constantes';

export class ClassComponent {
    static name = 'appClassComponent';
    static controller = this;
    static templateUrl = 'angular-templates/class.component.html';

    $onInit() {
        console.log('ClassComponent 3' +Constantes.VERSAO_APLICACAO + ' TESTE 3');
        this.umaVariavel = 'TESTE COMPONENT';
    }
}
