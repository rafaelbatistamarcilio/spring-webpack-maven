const fs = require('fs');
const Path = require('path');

/** VARIAVEIS */
const PATH_DEPLOY_JS = '../src/main/resources/static/js';

const diretorioExiste = diretorio => fs.existsSync(diretorio);
const obterArquivos = diretorio => fs.readdirSync(diretorio);
const ehUmDiretorio = caminho => fs.lstatSync(caminho).isDirectory();
const excluirDiretorio = diretorio => fs.rmdirSync(diretorio);
const excluirCoteudoDiretorio = diretorio => {

    if (ehUmDiretorio(diretorio)) {
        excluirArquivosAntigos(diretorio);
    } else {
        fs.unlinkSync(diretorio);
    }
}

/** EXCLUI OS ARQUIVOS ANTIGOS */
function excluirArquivosAntigos(diretorio) {

    if (diretorioExiste(diretorio)) {

        const arquivos = obterArquivos(diretorio);

        arquivos.forEach(arquivo => {
            const diretorioAtual = Path.join(diretorio, arquivo);
            excluirCoteudoDiretorio(diretorioAtual);
        });

        excluirDiretorio(diretorio);
    }
};

excluirArquivosAntigos(PATH_DEPLOY_JS);