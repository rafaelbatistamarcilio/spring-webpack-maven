var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

/** VARIAVEIS */
const PATH_POM = '../pom.xml';

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

module.exports = {
    obterVersaoPom,
    obterVersaoPackageJson
}
