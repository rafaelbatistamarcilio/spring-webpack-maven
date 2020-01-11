var fs = require('fs')
const { obterVersaoPom } = require('./utils');

/** VARIAVEIS */
const PATH_DEPLOY_TEMPLATE = '../target/classes/templates/app.html';


const substituirVersao = versaoPom => {
    const template = fs.readFileSync(PATH_DEPLOY_TEMPLATE, 'utf8');
    const templateComVersao = template.replace(/@{VERSAO_APLICACAO}/g, versaoPom);
    fs.writeFileSync(PATH_DEPLOY_TEMPLATE, templateComVersao, 'utf8');
}

obterVersaoPom().then(substituirVersao);