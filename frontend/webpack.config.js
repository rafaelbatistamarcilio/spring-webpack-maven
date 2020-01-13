const path = require('path');
const { obterVersaoPom , obterVersaoPackageJson } = require('./utils');

/** VARIAVEIS */
const PATH_ENTRY_POINT_APP = './src/main.js';
const PATH_ENTRY_POINT_TERCEIROS = './src/terceiros.js';
const PATH_DEPLOY_JS = '../src/main/resources/static/js';

const configPromise = new Promise(async resolve => {

    const versaoPom = obterVersaoPom();
    const nomeBundleAplicacao = `app.bundle-${versaoPom}`;
    const versaoPackageJson = obterVersaoPackageJson();
    const nomeBundleTerceiros = `terceiros-${versaoPackageJson}`;

    const configuracaoWebpack = {
        mode: 'production',
        devtool: 'source-map',
        node: { fs: "empty" },
        entry: {
            [nomeBundleAplicacao]: PATH_ENTRY_POINT_APP,
            [nomeBundleTerceiros]: PATH_ENTRY_POINT_TERCEIROS
        },
        output: {
            path: path.resolve(__dirname, PATH_DEPLOY_JS),
            filename: `[name].js`
        },
    }
    resolve(configuracaoWebpack);
});

module.exports = configPromise;