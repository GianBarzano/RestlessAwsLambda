const { createResponse } = require("../../lib/utilitarios");

/**
 * Cria um funcionário e retorna objeto do funcionario criado
 * @param {} event 
 * @param {*} context 
 */
module.exports.handler = async (event, context) => {
  return createResponse(200, {
    message: 'Funcionário criado',
    event
  });
}