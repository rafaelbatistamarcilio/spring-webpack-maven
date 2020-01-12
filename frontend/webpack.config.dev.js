const path = require('path');
const { obterVersaoPom, obterVersaoPackageJson, substituirVersaoDoPomNoJavaScript } = require('./utils');
const exec = require('child_process').exec;

/** VARIAVEIS */
const PATH_ENTRY_POINT_APP = './src/main.js';
const PATH_ENTRY_POINT_TERCEIROS = './src/terceiros.js';
const PATH_DEPLOY_JS = '../target/classes/static/js';

const configPromise = new Promise(async resolve => {

    const versaoPom = await obterVersaoPom();
    const nomeBundleAplicacao = `app.bundle-${versaoPom}`;
    const versaoPackageJson = obterVersaoPackageJson();
    const nomeBundleTerceiros = `terceiros-${versaoPackageJson}`;

    const configuracaoWebpack = {
        mode: 'development',
        devtool: 'source-map',
        node: { fs: "empty" },
        watch: true,
        entry: {
            [nomeBundleAplicacao]: PATH_ENTRY_POINT_APP,
            [nomeBundleTerceiros]: PATH_ENTRY_POINT_TERCEIROS
        },
        node: { fs: "empty" },
        output: {
            path: path.resolve(__dirname, PATH_DEPLOY_JS),
            filename: `[name].js`
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cwd: __dirname,
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: "usage",
                                        modules: false,
                                        debug: true,
                                        corejs: { version: 3, proposals: true },
                                        targets: {
                                            ie: "11"
                                        }
                                    }
                                ]
                            ],
                            plugins: [ "@babel/plugin-transform-runtime", '@babel/plugin-proposal-class-properties' ]
                        }
                    }
                },
            ]
        },
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('POST BUILD', compilation => {
                        substituirVersaoDoPomNoJavaScript(versaoPom);
                    });
                }
            }
        ]
    }
    resolve(configuracaoWebpack);
});

module.exports = configPromise;