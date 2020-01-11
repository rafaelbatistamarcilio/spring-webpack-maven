const path = require('path');
const webpack = require('webpack');
const { obterVersaoPom } = require('./utils');

/** VARIAVEIS */
const PATH_ENTRY_POINT = './src/main.js';
const PATH_DEPLOY_JS = '../src/main/resources/static/js';

const configPromise = new Promise(async resolve => {

    const versaoPom = await obterVersaoPom();

    const configuracaoWebpack = {
        mode: 'production',
        devtool: 'source-map',
        entry: PATH_ENTRY_POINT,
        output: {
            path: path.resolve(__dirname, PATH_DEPLOY_JS),
            filename: `app.bundle-${versaoPom}.js`
        },
        module: {
            rules: [
                // {
                //     test: /\.js$/,
                //     exclude: /(node_modules)/,
                //     include:[
                //         path.resolve(__dirname, 'node_modules/@babel')
                //     ],
                //     use: {
                //         loader: 'babel-loader',
                //     }
                // }
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cwd: __dirname,
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    }
                }
            ]
        },
        node: {
            fs: "empty"
        }
        // plugins: [
        //     new webpack.SourceMapDevToolPlugin({
        //         sourceRoot: path.resolve(__dirname, './src')
        //     })
        // ]
    }
    resolve(configuracaoWebpack);
});

module.exports = configPromise;