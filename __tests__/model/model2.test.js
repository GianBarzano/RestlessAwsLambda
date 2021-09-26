const { describe, test, afterEach, beforeEach, expect } = require("@jest/globals")

const AWS = require('aws-sdk');
const { criar, atualizar, excluir, buscar, listar } = require("../../model/model");

jest.mock('aws-sdk', () => {
  const DocumentClient = {
    put: jest.fn((params) => {
      return {
        promise: () => Promise.resolve()
      }
    }),
    update: jest.fn((params) => {
      return {
        promise: () => Promise.resolve()
      }
    }),
    delete: jest.fn((params) => {
      return {
        promise: () => Promise.resolve()
      }
    }),
    get: jest.fn((params) => {
      return {
        promise: () => Promise.resolve()
      }
    }),
    scan: jest.fn((params) => {
      return {
        promise: () => Promise.resolve()
      }
    })
  }

  return {
    __esModule: true,
    DynamoDB: {
      DocumentClient: jest.fn().mockImplementation(() => DocumentClient)
    },
    DocumentClient
  };
});

const tabelaBD = 'funcionarios';

describe('Criar', () => {
  test('Deve retornar sucesso', () => {
    const funcionarioReq = {
      id: 'xpto',
      nome: 'Maria',
      cargo: 'Scrum Master',
      idade: 30
    }

    return criar(tabelaBD, funcionarioReq).then(() => {
      // Valido chamada ao método put do Dynamo
      expect(AWS.DocumentClient.put.mock.calls.length).toBe(1);
      const args = AWS.DocumentClient.put.mock.calls[0]
      expect(args.length).toBe(1);
      expect(args[0]).toBeDefined();
      expect(args[0].TableName).toBe(tabelaBD);
      expect(args[0].Item).toBeDefined();
      expect(args[0].Item.id).toBe(funcionarioReq.id);
      expect(args[0].Item.nome).toBe(funcionarioReq.nome);
      expect(args[0].Item.cargo).toBe(funcionarioReq.cargo);
      expect(args[0].Item.idade).toBe(funcionarioReq.idade);
    });
  })
})

describe('Atualizar', () => {
  test('Deve retornar sucesso', () => {
    const funcionarioReq = {
      id: 'xpto',
      nome: 'Maria',
      cargo: 'Analista',
      idade: 25
    }

    return atualizar(tabelaBD, funcionarioReq).then(() => {
      // Valido chamada ao método update do Dynamo
      expect(AWS.DocumentClient.update.mock.calls.length).toBe(1);
      const args = AWS.DocumentClient.update.mock.calls[0]
      expect(args.length).toBe(1);
      expect(args[0]).toBeDefined();
      expect(args[0].TableName).toBe(tabelaBD);
      expect(args[0].Item).toBeDefined();
      expect(args[0].Item.id).toBe(funcionarioReq.id);
      expect(args[0].Item.nome).toBe(funcionarioReq.nome);
      expect(args[0].Item.cargo).toBe(funcionarioReq.cargo);
      expect(args[0].Item.idade).toBe(funcionarioReq.idade);
      expect(args[0].Key).toBeDefined();
      expect(args[0].Key.id).toBe(funcionarioReq.id);
      expect(args[0].UpdateExpression).toBe("set nome = :nome, cargo = :cargo, idade = :idade");
      expect(args[0].ExpressionAttributeValues).toBeDefined();
      expect(args[0].ExpressionAttributeValues[':id']).toBe(funcionarioReq.id);
      expect(args[0].ExpressionAttributeValues[':nome']).toBe(funcionarioReq.nome);
      expect(args[0].ExpressionAttributeValues[':cargo']).toBe(funcionarioReq.cargo);
      expect(args[0].ExpressionAttributeValues[':idade']).toBe(funcionarioReq.idade);
      expect(args[0].ReturnValues).toBe("UPDATED_NEW");
    });
  })
})

describe('Excluir', () => {
  test('Deve retornar sucesso', () => {
    const funcionarioReq = {
      id: 'xpto'
    }

    return excluir(tabelaBD, funcionarioReq.id).then(() => {
      // Valido chamada ao método delete do Dynamo
      expect(AWS.DocumentClient.delete.mock.calls.length).toBe(1);
      const args = AWS.DocumentClient.delete.mock.calls[0]
      expect(args.length).toBe(1);
      expect(args[0]).toBeDefined();
      expect(args[0].TableName).toBe(tabelaBD);
      expect(args[0].Key).toBeDefined();
      expect(args[0].Key.id).toBe(funcionarioReq.id);
      expect(args[0].ConditionExpression).toBe("id = :id");
      expect(args[0].ExpressionAttributeValues).toBeDefined();
      expect(args[0].ExpressionAttributeValues[':id']).toBe(funcionarioReq.id);
      expect(args[0].ReturnValues).toBe("ALL_OLD");
    });
  })
})

describe('Buscar', () => {
  const funcionarioReq = {
    id: 'xpto',
    nome: 'Maria',
    cargo: 'Analista',
    idade: 25
  }

  beforeAll(() => {
    // Antes de todos os testes, crio mock da função excluir do model
    AWS.DocumentClient.get.mockImplementation((params) => {
      return {
        promise: () => Promise.resolve({
          Item: funcionarioReq
        })
      }
    })
  })

  test('Deve retornar sucesso', () => {
    return buscar(tabelaBD, funcionarioReq.id).then((retorno) => {
      // Valido retorno
      expect(retorno).toBeDefined();
      expect(retorno.id).toBe(funcionarioReq.id);
      expect(retorno.nome).toBe(funcionarioReq.nome);
      expect(retorno.cargo).toBe(funcionarioReq.cargo);
      expect(retorno.idade).toBe(funcionarioReq.idade);
      // Valido chamada ao método get do Dynamo
      expect(AWS.DocumentClient.get.mock.calls.length).toBe(1);
      const args = AWS.DocumentClient.get.mock.calls[0]
      expect(args.length).toBe(1);
      expect(args[0]).toBeDefined();
      expect(args[0].TableName).toBe(tabelaBD);
      expect(args[0].Key).toBeDefined();
      expect(args[0].Key.id).toBe(funcionarioReq.id);
    });
  })
})

describe('Listar', () => {
  const arrFuncionarios = [];

  beforeEach(() => {
    // Antes de todos os testes, crio mock da função excluir do model
    AWS.DocumentClient.scan.mockImplementation((params) => {
      return {
        promise: () => Promise.resolve({
          Items: arrFuncionarios,
          Count: arrFuncionarios.length
        })
      }
    })
  })

  test('Deve retornar sucesso', () => {
    const configPag = {}
    return listar(tabelaBD, configPag).then((retorno) => {
      // Valido retorno
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.lista).toBeDefined();
      expect(Array.isArray(retorno.lista)).toBeTruthy();
      expect(retorno.lista.length).toBe(arrFuncionarios.length);
      expect(retorno.count).toBeDefined();
      expect(retorno.count).toBe(arrFuncionarios.length);
      // Valido chamada ao método scan do Dynamo
      expect(AWS.DocumentClient.scan.mock.calls.length).toBe(1);
      const args = AWS.DocumentClient.scan.mock.calls[0]
      expect(args.length).toBe(1);
      expect(args[0]).toBeDefined();
      expect(args[0].TableName).toBe(tabelaBD);
      expect(args[0].Limit).toBe(5);
    });
  })

  test('Deve retornar sucesso. Passagem de configurações de paginação', () => {
    const configPag = {
      pages: 3,
      lastqryid: 'xpto'
    }
    return listar(tabelaBD, configPag).then((retorno) => {
      // Valido retorno
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.lista).toBeDefined();
      expect(Array.isArray(retorno.lista)).toBeTruthy();
      expect(retorno.lista.length).toBe(arrFuncionarios.length);
      expect(retorno.count).toBeDefined();
      expect(retorno.count).toBe(arrFuncionarios.length);
      // Valido chamada ao método scan do Dynamo
      expect(AWS.DocumentClient.scan.mock.calls.length).toBe(1);
      const args = AWS.DocumentClient.scan.mock.calls[0]
      expect(args.length).toBe(1);
      expect(args[0]).toBeDefined();
      expect(args[0].TableName).toBe(tabelaBD);
      expect(args[0].Limit).toBe(configPag.pages);
      expect(args[0].ExclusiveStartKey).toBeDefined();
      expect(args[0].ExclusiveStartKey.id).toBe(configPag.lastqryid);
    });
  })

  afterEach(() => {
    AWS.DocumentClient.scan.mockReset();
  })
})