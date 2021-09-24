/**
 * Cria objeto de resposta padrão Lambda
 * @param {*} statusCode 
 * @param {*} body 
 */
module.exports.createResponse = (statusCode, body = {}, headers = {}) => {
  return {
    statusCode,
    headers: {
      "content-type": "application/json",
      ...headers
    },
    body: JSON.stringify(body)
  }
}