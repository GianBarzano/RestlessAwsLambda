const { createResponse } = require("../../lib/utilitarios");
const { excluir } = require("../../model/funcionarioModel");

/**
 * Exclui um funcionário pelo id
 * @param {} event 
 * @param {*} context 
 */
module.exports.handler = async (event, context) => {
  try {
    // Exclui funcionário do banco de dados
    await excluir(event.pathParameters.id);

    // Retorna resposta
    return createResponse(200);
  } catch (error) {
    if (error == 'nao-encontrado') {
      return createResponse(404, {
        message: 'Funcionário não encontrado'
      });
    }

    return createResponse(500, {
      message: 'Ocorreu um erro ao processar a requisição',
      error: error
    });
  }
}