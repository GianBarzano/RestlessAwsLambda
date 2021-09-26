const { getNewUuId } = require("../lib/utilitarios");
const { criar, buscar, listar, atualizar, excluir } = require("./model");

/**
 * Nome da tabela no banco de dados
 */
const tabelaDB = 'funcionarios';

/**
 * Cria funcionário no banco de dados
 */
module.exports.criar = (funcionario) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Preencho id
      funcionario.id = getNewUuId();

      // Crio funcionário no banco de dados
      await criar(tabelaDB, funcionario);

      // Retorno funcionário criado
      resolve(funcionario);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Atualiza funcionário no banco de dados
 */
module.exports.atualizar = (funcionario) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Atualizo funcionário no banco de dados
      await atualizar(tabelaDB, funcionario);

      // Retorno funcionário atualizado
      resolve(funcionario);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Lista funcionários do banco de dados
 */
module.exports.listar = (qryParams = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let configPag = {};

      if (qryParams.lastqryid) {
        configPag.lastqryid = qryParams.lastqryid;
      }

      // Busco lista de funcionários do banco de dados
      const dados = await listar(tabelaDB, configPag);
      
      // Retorno funcionários
      resolve(dados);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Busca um funcionário do banco de dados
 * @param {*} id 
 */
module.exports.buscar = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Busco funcionário do banco de dados
      const funcionario = await buscar(tabelaDB, id);

      // Retorno funcionário
      resolve(funcionario);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Exclui um funcionário do banco de dados
 * @param {*} id 
 */
module.exports.excluir = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Exclui funcionário do banco de dados
      await excluir(tabelaDB, id);

      // Retorno sucesso
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}