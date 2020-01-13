var fs = require('fs');

/** VARIAVEIS */
const PATH_POM = '../pom.xml';
const PATH_DEPLOY_TEMPLATE = '../target/classes/templates/app.html';

const obterVersaoPom = () => {
    const pom = fs.readFileSync(PATH_POM, 'utf8');
    const texto = pom.toString();
    const dados = /<versao>(.*?)<\/versao>/g.exec(texto);
    return dados[1];
}

const obterVersaoPackageJson = () => {
    const packageJson = require('./package.json');
    return packageJson.version;
}

const substituirTextoNoArquivo = (pathArquivo, expressaoRegularTexto, novoTexto) => {
    const textoArquivo = fs.readFileSync(pathArquivo, 'utf8');
    let arquivoComNovoTexto = textoArquivo.replace(expressaoRegularTexto, novoTexto);
    fs.writeFileSync(pathArquivo, arquivoComNovoTexto, 'utf8');
}

const substituirVersaoDoPomNoJavaScript = versaoPom => {
    const pathJs = `../src/main/resources/static/js/app.bundle-${versaoPom}.js`;
    substituirTextoNoArquivo(pathJs, /@{VERSAO_APLICACAO}/g, versaoPom);

    const pathJsBuild = `../target/classes/static/js/app.bundle-${versaoPom}.js`;
    substituirTextoNoArquivo(pathJsBuild, /@{VERSAO_APLICACAO}/g, versaoPom);
}

const substituirVersaoJavaScriptAplicacao = versaoPom => {
    substituirTextoNoArquivo(PATH_DEPLOY_TEMPLATE, /@{VERSAO_APLICACAO}/g, versaoPom);
}

const substituirVersaoJavaScriptTerceiros = versaoPackageJson => {
    substituirTextoNoArquivo(PATH_DEPLOY_TEMPLATE, /@{VERSAO_TERCEIROS}/g, versaoPackageJson);
}

module.exports = {
    obterVersaoPom,
    obterVersaoPackageJson,
    substituirVersaoDoPomNoJavaScript,
    substituirVersaoJavaScriptAplicacao,
    substituirVersaoJavaScriptTerceiros
}