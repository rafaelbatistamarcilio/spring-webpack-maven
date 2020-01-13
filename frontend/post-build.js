const {
    obterVersaoPom,
    obterVersaoPackageJson,
    substituirVersaoDoPomNoJavaScript,
    substituirVersaoJavaScriptAplicacao,
    substituirVersaoJavaScriptTerceiros
} = require('./utils');

const versaoPom = obterVersaoPom();
const versaoPackageJson = obterVersaoPackageJson();

substituirVersaoJavaScriptAplicacao(versaoPom);
substituirVersaoJavaScriptTerceiros(versaoPackageJson);
substituirVersaoDoPomNoJavaScript(versaoPom);
