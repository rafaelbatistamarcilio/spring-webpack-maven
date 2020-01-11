const path = require('path');
const { obterVersaoPom } = require('./utils');

/** VARIAVEIS */
const PATH_ENTRY_POINT = './src/main.js';
const PATH_DEPLOY_JS = '../src/main/resources/static/js';

const configPromise = new Promise(async resolve => {

    const versaoPom = await obterVersaoPom();

    const configuracaoWebpack = {
        entry: PATH_ENTRY_POINT,
        output: {
            path: path.resolve(__dirname, PATH_DEPLOY_JS),
            filename: `app.bundle-${versaoPom}.js`
        }
    }
    resolve(configuracaoWebpack);
});

module.exports = configPromise;