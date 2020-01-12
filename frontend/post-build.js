const {
    obterVersaoPom,
    obterVersaoPackageJson,
    substituirVersaoDoPomNoJavaScript,
    substituirVersaoJavaScriptAplicacao,
    substituirVersaoJavaScriptTerceiros
} = require('./utils');


obterVersaoPom().then( versaoPom => {
    const versaoPackageJson = obterVersaoPackageJson();

    substituirVersaoJavaScriptAplicacao(versaoPom);
    substituirVersaoJavaScriptTerceiros(versaoPackageJson);
    substituirVersaoDoPomNoJavaScript(versaoPom);
});
