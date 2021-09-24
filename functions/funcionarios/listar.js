const { createResponse } = require("../../lib/utilitarios");

/**
 * Retorna a lista de funcionários
 * @param {} event 
 * @param {*} context 
 */
module.exports.handler = async (event, context) => {
  return createResponse(200, {
    message: 'Funcionários listados',
    event
  });
}