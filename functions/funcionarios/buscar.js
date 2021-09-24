const { createResponse } = require("../../lib/utilitarios");

/**
 * Busca um funcionário pelo id
 * @param {} event 
 * @param {*} context 
 */
module.exports.handler = async (event, context) => {
  return createResponse(200, {
    message: 'Funcionário encontrado',
    event
  });
}