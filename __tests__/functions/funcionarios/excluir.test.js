const { test, describe, beforeAll, expect, afterEach } = require("@jest/globals");

const { handler } = require("../../../functions/funcionarios/excluir");
const funcionarioModel = require("../../../model/funcionarioModel");

jest.mock('../../../model/funcionarioModel');

describe('Sucesso', () => {
  beforeAll(() => {
    // Crio mock da função excluir do model de funcionario para retornar sucesso
    funcionarioModel.excluir.mockImplementation((id) => Promise.resolve());
  })

  test('Deve retornar 200', () => {
    // Realizo chamada a função
    const event = {
      body: JSON.stringify({}),
      pathParameters: {
        id: 'xpto'
      }
    };
    const context = {}
    return handler(event, context).then((retorno) => {
      // Retorno 200
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.statusCode).toBe(200);
    });
  })

  afterEach(() => {
    // Limpo mock de excluir
    funcionarioModel.excluir.mockReset();
  })
})

describe('Falha', () => {
  beforeAll(() => {
    // Crio mock da função excluir do model de funcionario para retornar erro
    funcionarioModel.excluir.mockImplementation((funcionario) => Promise.reject());
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
      expect(funcionarioModel.excluir.mock.calls.length).toBe(1);
    });
  })

  test('Deve retornar 404', () => {
    // Crio mock da função excluir do model de funcionario para retornar erro não encontrado
    funcionarioModel.excluir.mockImplementation((funcionario) => Promise.reject('nao-encontrado'));

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
      expect(funcionarioModel.excluir.mock.calls.length).toBe(1);
    });
  })

  afterEach(() => {
    // Limpo mock de excluir
    funcionarioModel.excluir.mockReset();
  })
})