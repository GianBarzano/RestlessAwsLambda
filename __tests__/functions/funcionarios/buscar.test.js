const { test, describe, beforeAll, expect, afterEach } = require("@jest/globals");

const { handler } = require("../../../functions/funcionarios/buscar");
const funcionarioModel = require("../../../model/funcionarioModel");

jest.mock('../../../model/funcionarioModel');

describe('Sucesso', () => {
  const funcionarioBd = {
    id: 'xpto',
    nome: 'Maria',
    cargo: 'Analista',
    idade: 20
  }
  beforeAll(() => {
    // Crio mock da função buscar do model de funcionario para retornar sucesso
    funcionarioModel.buscar.mockImplementation((id) => Promise.resolve(funcionarioBd));
  })

  test('Deve retornar 200', () => {
    // Realizo chamada a função
    const event = {
      body: JSON.stringify({}),
      pathParameters: {
        id: funcionarioBd.id
      }
    };
    const context = {}
    return handler(event, context).then((retorno) => {
      // Retorno 200
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.statusCode).toBe(200);
      // Corpo do retorno
      expect(retorno.body).toBeDefined();
      expect(retorno.body).not.toBeNull();
      
      const retornoBodyParsed = JSON.parse(retorno.body);
      expect(retornoBodyParsed).toBeDefined();
      expect(retornoBodyParsed).not.toBeNull();
      expect(retornoBodyParsed.funcionario).toBeDefined();
      expect(retornoBodyParsed.funcionario).not.toBeNull();
      expect(retornoBodyParsed.funcionario.id).toBe(funcionarioBd.id);
      expect(retornoBodyParsed.funcionario.nome).toBe(funcionarioBd.nome);
      expect(retornoBodyParsed.funcionario.cargo).toBe(funcionarioBd.cargo);
      expect(retornoBodyParsed.funcionario.idade).toBe(funcionarioBd.idade);
    });
  })

  afterEach(() => {
    // Limpo mock de buscar
    funcionarioModel.buscar.mockReset();
  })
})

describe('Falha', () => {
  beforeAll(() => {
    // Crio mock da função buscar do model de funcionario para retornar erro
    funcionarioModel.buscar.mockImplementation((id) => Promise.reject());
  })

  test('Deve retornar 500', () => {
    // Realizo chamada a função
    const event = {
      body: JSON.stringify({}),
      pathParameters: {
        id: 'xpto'
      }
    };
    const context = {}
    return handler(event, context).then((retorno) => {
      // Retorno 500
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.statusCode).toBe(500);
      expect(funcionarioModel.buscar.mock.calls.length).toBe(1);
    });
  })

  test('Deve retornar 404', () => {
    // Crio mock da função buscar do model de funcionario para retornar erro não encontrado
    funcionarioModel.buscar.mockImplementation((id) => Promise.reject('nao-encontrado'));

    // Realizo chamada a função
    const event = {
      body: JSON.stringify({}),
      pathParameters: {
        id: 'xpto'
      }
    };
    const context = {}
    return handler(event, context).then((retorno) => {
      // Retorno 404
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.statusCode).toBe(404);
      expect(funcionarioModel.buscar.mock.calls.length).toBe(1);
    });
  })

  afterEach(() => {
    // Limpo mock de buscar
    funcionarioModel.buscar.mockReset();
  })
})