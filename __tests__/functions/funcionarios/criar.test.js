const { test, describe, beforeAll, expect, afterEach } = require("@jest/globals");

const { handler } = require("../../../functions/funcionarios/criar");
const funcionarioModel = require("../../../model/funcionarioModel");

jest.mock('../../../model/funcionarioModel');

describe('Validação de formulário', () => {
  beforeAll(() => {
    // Antes de todos os testes, crio mock da função criar do model de funcionario
    funcionarioModel.criar.mockImplementation((funcionario) => Promise.resolve(funcionario));
  })

  test('Retornar 400 ao nao informar dados', () => {
    // Realizo chamada a função
    const event = {
      body: JSON.stringify({})
    };
    const context = {}
    return handler(event, context).then((retorno) => {
      // Retorno 400
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.statusCode).toBe(400);
      // Model nao pode ser chamado por causa de validação de formulário
      expect(funcionarioModel.criar.mock.calls.length).toBe(0);
    });
  });

  test('Retornar 400 ao nao informar idade', () => {
    // Realizo chamada a função
    const event = {
      body: JSON.stringify({
        nome: 'Maria',
        cargo: 'Analista'
      })
    };
    const context = {}
    return handler(event, context).then((retorno) => {
      // Retorno 400
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.statusCode).toBe(400);
      // Model nao pode ser chamado por causa de validação de formulário
      expect(funcionarioModel.criar.mock.calls.length).toBe(0);
    });
  });

  test('Retornar 400 ao nao informar nome', () => {
    // Realizo chamada a função
    const event = {
      body: JSON.stringify({
        cargo: 'Analista',
        idade: 20
      })
    };
    const context = {}
    return handler(event, context).then((retorno) => {
      // Retorno 400
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.statusCode).toBe(400);
      // Model nao pode ser chamado por causa de validação de formulário
      expect(funcionarioModel.criar.mock.calls.length).toBe(0);
    });
  })

  test('Retornar 400 ao nao informar cargo', () => {
    // Realizo chamada a função
    const event = {
      body: JSON.stringify({
        nome: 'Maria',
        idade: 20
      })
    };
    const context = {}
    return handler(event, context).then((retorno) => {
      // Retorno 400
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.statusCode).toBe(400);
      // Model nao pode ser chamado por causa de validação de formulário
      expect(funcionarioModel.criar.mock.calls.length).toBe(0);
    });
  })

  test('Retornar 400 ao informar idade inválida', () => {
    // Realizo chamada a função
    const event = {
      body: JSON.stringify({
        nome: 'Maria',
        cargo: 'Analista',
        idade: "20 anos"
      })
    };
    const context = {}
    return handler(event, context).then((retorno) => {
      // Retorno 400
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.statusCode).toBe(400);
      // Model nao pode ser chamado por causa de validação de formulário
      expect(funcionarioModel.criar.mock.calls.length).toBe(0);
    });
  });

  afterAll(() => {
    funcionarioModel.criar.mockReset();
  })
})

describe('Sucesso', () => {
  beforeAll(() => {
    // Crio mock da função criar do model de funcionario para retornar funcionario
    funcionarioModel.criar.mockImplementation((funcionario) => Promise.resolve(funcionario));
  })

  test('Deve retornar 201', () => {
    // Realizo chamada a função
    const funcionarioReq = {
      nome: 'Maria',
      cargo: 'Analista',
      idade: 20
    };
    const event = {
      body: JSON.stringify(funcionarioReq)
    };
    const context = {}
    return handler(event, context).then((retorno) => {
      // Retorno 201
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.statusCode).toBe(201);
      // Corpo do retorno
      expect(retorno.body).toBeDefined();
      expect(retorno.body).not.toBeNull();
      
      const retornoBodyParsed = JSON.parse(retorno.body);
      expect(retornoBodyParsed).toBeDefined();
      expect(retornoBodyParsed).not.toBeNull();
      expect(retornoBodyParsed.funcionario).toBeDefined();
      expect(retornoBodyParsed.funcionario).not.toBeNull();
      expect(retornoBodyParsed.funcionario.nome).toBe(funcionarioReq.nome);
      expect(retornoBodyParsed.funcionario.cargo).toBe(funcionarioReq.cargo);
      expect(retornoBodyParsed.funcionario.idade).toBe(funcionarioReq.idade);
    });
  })

  afterEach(() => {
    // Limpo mock de criar
    funcionarioModel.criar.mockReset();
  })
})

describe('Falha', () => {
  beforeAll(() => {
    // Crio mock da função criar do model de funcionario para retornar erro
    funcionarioModel.criar.mockImplementation((funcionario) => Promise.reject());
  })

  test('Deve retornar 500', () => {
    // Realizo chamada a função
    const event = {
      body: JSON.stringify({
        nome: 'Maria',
        cargo: 'Analista',
        idade: 20
      })
    };
    const context = {}
    return handler(event, context).then((retorno) => {
      // Retorno 500
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.statusCode).toBe(500);
      expect(funcionarioModel.criar.mock.calls.length).toBe(1);
    });
  })

  afterEach(() => {
    // Limpo mock de criar
    funcionarioModel.criar.mockReset();
  })
})