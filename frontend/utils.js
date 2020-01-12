var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

/** VARIAVEIS */
const PATH_POM = '../pom.xml';
const PATH_DEPLOY_TEMPLATE = '../target/classes/templates/app.html';

const obterVersaoPom = async () => {
    const dadosPom = fs.readFileSync(PATH_POM);
    const pom = await parser.parseStringPromise(dadosPom);
    const versaoPom = pom ? pom.project.version : new Date().getTime();
    return versaoPom;
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