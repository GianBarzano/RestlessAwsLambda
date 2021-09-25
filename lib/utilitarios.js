var uuid = require('node-uuid');

/**
 * Cria objeto de resposta padrão Lambda
 * @param {*} statusCode 
 * @param {*} body 
 */
module.exports.createResponse = (statusCode = 200, body = {}, headers = {}) => {
  return {
    statusCode,
    headers: {
      "content-type": "application/json",
      ...headers
    },
    body: JSON.stringify(body)
  }
}

/**
 * Gera uma chave uuid
 */
module.exports.getNewUuId = () => {
  return uuid.v4();
}