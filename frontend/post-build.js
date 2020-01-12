var fs = require('fs')
const { obterVersaoPom, obterVersaoPackageJson } = require('./utils');
// const { dependencias } = require('./src/terceiros');

/** VARIAVEIS */
const PATH_DEPLOY_TEMPLATE = '../target/classes/templates/app.html';

const substituirVersaoJavaScriptAplicacao = versaoPom => {
    const template = fs.readFileSync(PATH_DEPLOY_TEMPLATE, 'utf8');
    let templateComVersao = template.replace(/@{VERSAO_APLICACAO}/g, versaoPom);
    fs.writeFileSync(PATH_DEPLOY_TEMPLATE, templateComVersao, 'utf8');
}

const substituirVersaoJavaScriptTerceiros = versaoPackageJson => {
    const template = fs.readFileSync(PATH_DEPLOY_TEMPLATE, 'utf8');
    let templateComVersao = template.replace(/@{VERSAO_TERCEIROS}/g, versaoPackageJson);
    fs.writeFileSync(PATH_DEPLOY_TEMPLATE, templateComVersao, 'utf8');
}

obterVersaoPom().then(versaoPom => {
    substituirVersaoJavaScriptAplicacao(versaoPom);
    const versaoPackageJson = obterVersaoPackageJson();
    substituirVersaoJavaScriptTerceiros(versaoPackageJson);
});

