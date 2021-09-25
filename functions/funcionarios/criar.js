const { createResponse } = require("../../lib/utilitarios");
const { criar } = require("../../model/funcionarioModel");

/**
 * Cria um funcionário e retorna objeto do funcionario criado
 * @param {} event 
 * @param {*} context 
 */
module.exports.handler = async (event, context) => {
  try {
    // Busco dados da requisição
    const { idade, nome, cargo } = JSON.parse(event.body);
    
    // Realizo validações
    if (!idade || !nome || !cargo) {
      return createResponse(400, {
        message: 'Alguns dados não foram preenchidos!'
      }); 
    }

    // Crio funcionário no banco de dados
    const funcionarioReq = {
      idade,
      nome,
      cargo
    }

    const funcionarioCriado = await criar(funcionarioReq);

    // Retorno resposta
    return createResponse(201, {
      funcionario: funcionarioCriado
    });
  } catch (error) {
    return createResponse(500, {
      message: 'Ocorreu um erro ao processar a requisição'
    });
  }
}