const { createResponse } = require("../../lib/utilitarios");
const { atualizar } = require("../../model/funcionarioModel");

/**
 * Atualiza um funcionário pelo id
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
      id: event.pathParameters.id,
      idade,
      nome,
      cargo
    }

    let funcionario = await atualizar(funcionarioReq);

    // Retorno resposta
    return createResponse(200, {
      funcionario
    });
  } catch (error) {
    if (error == 'nao-encontrado') {
      return createResponse(404, {
        message: 'Funcionário não encontrado'
      });
    }

    return createResponse(500, {
      message: 'Ocorreu um erro ao processar a requisição',
      error
    });
  }
}