const { test, describe, beforeAll, expect, afterEach } = require("@jest/globals");

const { handler } = require("../../../functions/funcionarios/listar");
const funcionarioModel = require("../../../model/funcionarioModel");

jest.mock('../../../model/funcionarioModel');

describe('Sucesso', () => {
  const arrFuncionariosBd = [];
  arrFuncionariosBd.push({
    id: 'xpto',
    nome: 'Maria',
    cargo: 'Analista',
    idade: 20
  });
  arrFuncionariosBd.push({
    id: 'xpto02',
    nome: 'José',
    cargo: 'Testador',
    idade: 25
  });

  beforeAll(() => {
    // Crio mock da função listar do model de funcionario para retornar sucesso
    funcionarioModel.listar.mockImplementation((qryParams) => Promise.resolve({
      lista: arrFuncionariosBd,
      count: arrFuncionariosBd.length
    }));
  })

  test('Deve retornar 200', () => {
    // Realizo chamada a função
    const event = {
      body: JSON.stringify({}),
      queryStringParameters: {}
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
      expect(retornoBodyParsed.dados).toBeDefined();
      expect(retornoBodyParsed.dados).not.toBeNull();
      expect(retornoBodyParsed.dados.lista).toBeDefined();
      expect(Array.isArray(retornoBodyParsed.dados.lista)).toBeTruthy();
      expect(retornoBodyParsed.dados.lista.length).toBe(2);
      expect(retornoBodyParsed.dados.count).toBeDefined();
      expect(retornoBodyParsed.dados.count).toBe(2);
    });
  })

  afterEach(() => {
    // Limpo mock de listar
    funcionarioModel.listar.mockReset();
  })
})

describe('Falha', () => {
  beforeAll(() => {
    // Crio mock da função listar do model de funcionario para retornar erro
    funcionarioModel.listar.mockImplementation((id) => Promise.reject());
  })

  test('Deve retornar 500', () => {
    // Realizo chamada a função
    const event = {
      body: JSON.stringify({}),
      queryStringParameters: {}
    };
    const context = {}
    return handler(event, context).then((retorno) => {
      // Retorno 500
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.statusCode).toBe(500);
      expect(funcionarioModel.listar.mock.calls.length).toBe(1);
    });
  })

  afterEach(() => {
    // Limpo mock de listar
    funcionarioModel.listar.mockReset();
  })
})