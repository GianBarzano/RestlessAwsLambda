const { createResponse } = require("../../lib/utilitarios");
const { listar } = require("../../model/funcionarioModel");

/**
 * Retorna a lista de funcionários
 * @param {} event 
 * @param {*} context 
 */
module.exports.handler = async (event, context) => {
  try {
    // Busco lista de funcionários
    const dados = await listar(event.queryStringParameters);

    // Retorno resposta
    return createResponse(200, {
      dados
    });
  } catch (error) {
    return createResponse(500, {
      message: 'Ocorreu um erro ao processar a requisição',
      error
    });
  }
}