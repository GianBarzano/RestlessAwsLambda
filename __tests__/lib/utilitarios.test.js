const { test } = require("@jest/globals");
const { 
  getNewUuId, 
  createResponse 
} = require("../../lib/utilitarios");

test('Deve gerar um novo uuid', () => {
  const uuid = getNewUuId();

  expect(uuid).not.toBeNull();
  expect(uuid).toBeDefined();
  expect(uuid.length).toBeGreaterThan(0);
})

test('Deve criar uma resposta padrão', () => {
  const resposta = createResponse();

  // Verifica se resposta está definida
  expect(resposta).not.toBeNull();
  expect(resposta).toBeDefined();
  // Verifica status de resposta
  expect(resposta.statusCode).toBe(200);
  // Verifica Headers
  expect(resposta.headers).not.toBeNull();
  expect(resposta.headers).toBeDefined();
  expect(resposta.headers['content-type']).toBe("application/json");
  // Verifica corpo
  expect(resposta.body).not.toBeNull();
  expect(resposta.body).toBeDefined();
  expect(resposta.body).toBe(JSON.stringify({}));
})

test('Deve criar uma resposta com código de retorno passado', () => {
  const resposta = createResponse(404);

  // Verifica se resposta está definida
  expect(resposta).not.toBeNull();
  expect(resposta).toBeDefined();
  // Verifica status de resposta
  expect(resposta.statusCode).toBe(404);
})

test('Deve criar uma resposta com corpo passado', () => {
  const body = {
    nome: 'Joaquim da Silva',
    cargo: 'Scrum Master'
  }
  const resposta = createResponse(201, body);

  // Verifica se resposta está definida
  expect(resposta).not.toBeNull();
  expect(resposta).toBeDefined();
  // Verifica status de resposta
  expect(resposta.statusCode).toBe(201);
  // Verifica corpo de resposta
  expect(resposta.body).not.toBeNull();
  expect(resposta.body).toBeDefined();
  expect(resposta.body).toBe(JSON.stringify(body));
})

test('Deve criar uma resposta com headers passado', () => {
  headers = {
    'Authorization': 'XPTO',
    'Access-Control-Allow-Origin': '*'
  }
  const resposta = createResponse(200, {}, headers);

  // Verifica se resposta está definida
  expect(resposta).not.toBeNull();
  expect(resposta).toBeDefined();
  // Verifica status de resposta
  expect(resposta.statusCode).toBe(200);
  // Verifica headers
  expect(resposta.headers).not.toBeNull();
  expect(resposta.headers).toBeDefined();
  expect(resposta.headers['content-type']).toBe("application/json");
  expect(resposta.headers['Authorization']).toBe(headers['Authorization']);
  expect(resposta.headers['Access-Control-Allow-Origin']).toBe(headers['Access-Control-Allow-Origin']);
  // Verifica corpo de resposta
  expect(resposta.body).not.toBeNull();
  expect(resposta.body).toBeDefined();
  expect(resposta.body).toBe(JSON.stringify({}));
})