const { test, describe, beforeAll, expect, afterEach } = require("@jest/globals");

const { handler } = require("../../../functions/funcionarios/atualizar");
const funcionarioModel = require("../../../model/funcionarioModel");

jest.mock('../../../model/funcionarioModel');

describe('Validação de formulário', () => {
  beforeAll(() => {
    // Antes de todos os testes, crio mock da função atualizar do model de funcionario
    funcionarioModel.atualizar.mockImplementation((funcionario) => Promise.resolve(funcionario));
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
      expect(funcionarioModel.atualizar.mock.calls.length).toBe(0);
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
      expect(funcionarioModel.atualizar.mock.calls.length).toBe(0);
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
      expect(funcionarioModel.atualizar.mock.calls.length).toBe(0);
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
      expect(funcionarioModel.atualizar.mock.calls.length).toBe(0);
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
      expect(funcionarioModel.atualizar.mock.calls.length).toBe(0);
    });
  });

  afterAll(() => {
    funcionarioModel.atualizar.mockReset();
    //mockClear, mockRestore
  })
})

describe('Sucesso', () => {
  beforeAll(() => {
    // Crio mock da função atualizar do model de funcionario para retornar funcionario
    funcionarioModel.atualizar.mockImplementation((funcionario) => Promise.resolve(funcionario));
  })

  test('Deve retornar 200', () => {
    // Realizo chamada a função
    const funcionarioReq = {
      id: 'xpto',
      nome: 'Maria',
      cargo: 'Analista',
      idade: 20
    };
    const event = {
      body: JSON.stringify(funcionarioReq),
      pathParameters: {
        id: funcionarioReq.id
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
      expect(retornoBodyParsed.funcionario.id).toBe(funcionarioReq.id);
      expect(retornoBodyParsed.funcionario.nome).toBe(funcionarioReq.nome);
      expect(retornoBodyParsed.funcionario.cargo).toBe(funcionarioReq.cargo);
      expect(retornoBodyParsed.funcionario.idade).toBe(funcionarioReq.idade);
    });
  })

  afterEach(() => {
    // Limpo mock de atualizar
    funcionarioModel.atualizar.mockReset();
  })
})

describe('Falha', () => {
  beforeAll(() => {
    // Crio mock da função atualizar do model de funcionario para retornar erro
    funcionarioModel.atualizar.mockImplementation((funcionario) => Promise.reject());
  })

  test('Deve retornar 500', () => {
    // Realizo chamada a função
    const funcionarioReq = {
      id: 'xpto',
      nome: 'Maria',
      cargo: 'Analista',
      idade: 20
    };
    const event = {
      body: JSON.stringify(funcionarioReq),
      pathParameters: {
        id: funcionarioReq.id
      }
    };
    const context = {}
    return handler(event, context).then((retorno) => {
      // Retorno 500
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.statusCode).toBe(500);
      expect(funcionarioModel.atualizar.mock.calls.length).toBe(1);
    });
  })

  test('Deve retornar 404', () => {
    // Crio mock da função atualizar do model de funcionario para retornar erro não encontrado
    funcionarioModel.atualizar.mockImplementation((funcionario) => Promise.reject('nao-encontrado'));

    // Realizo chamada a função
    const funcionarioReq = {
      id: 'xpto',
      nome: 'Maria',
      cargo: 'Analista',
      idade: 20
    };
    const event = {
      body: JSON.stringify(funcionarioReq),
      pathParameters: {
        id: funcionarioReq.id
      }
    };
    const context = {}
    return handler(event, context).then((retorno) => {
      // Retorno 404
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.statusCode).toBe(404);
      expect(funcionarioModel.atualizar.mock.calls.length).toBe(1);
    });
  })

  afterEach(() => {
    // Limpo mock de atualizar
    funcionarioModel.atualizar.mockReset();
  })
})