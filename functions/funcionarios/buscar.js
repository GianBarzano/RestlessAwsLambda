const { createResponse } = require("../../lib/utilitarios");
const { buscar } = require("../../model/funcionarioModel");

/**
 * Busca um funcionário pelo id
 * @param {} event 
 * @param {*} context 
 */
module.exports.handler = async (event, context) => {
  try {
    // Busco funcionário
    const funcionario = await buscar(event.pathParameters.id);

    // Retorno resposta
    return createResponse(200, {
      funcionario: funcionario
    });
  } catch (error) {
    if (error == 'nao-encontrado') {
      return createResponse(404, {
        message: 'Funcionário não encontrado'
      });
    }

    return createResponse(500, {
      message: 'Ocorreu um erro ao processar a requisição'
    });
  }
}