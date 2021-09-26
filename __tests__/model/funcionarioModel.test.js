const { describe, test, afterEach, beforeEach } = require("@jest/globals")

const model = require("../../model/model");
const { criar, atualizar, listar, buscar, excluir } = require("../../model/funcionarioModel");

jest.mock('../../model/model');

describe('Criar', () => {
  beforeAll(() => {
    // Antes de todos os testes, crio mock da função criar do model
    model.criar.mockImplementation((tabela, funcionario) => Promise.resolve());
  })

  test('Deve retornar sucesso', () => {
    const funcionarioReq = {
      nome: 'Maria',
      cargo: 'Scrum Master',
      idade: 30
    }
    return criar(funcionarioReq).then((retorno) => {
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.id).toBeDefined();
      expect(retorno.id).not.toBeNull();
      expect(retorno.nome).toBe(funcionarioReq.nome);
      expect(retorno.cargo).toBe(funcionarioReq.cargo);
      expect(retorno.idade).toBe(funcionarioReq.idade);
    });
  })

  afterAll(() => {
    model.criar.mockReset();
  })
})

describe('Atualizar', () => {
  beforeAll(() => {
    // Antes de todos os testes, crio mock da função atualizar do model
    model.atualizar.mockImplementation((tabela, funcionario) => Promise.resolve());
  })

  test('Deve retornar sucesso', () => {
    const funcionarioReq = {
      id: 'xpto',
      nome: 'Maria',
      cargo: 'Scrum Master',
      idade: 30
    }
    return atualizar(funcionarioReq).then((retorno) => {
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.id).toBe(funcionarioReq.id);
      expect(retorno.nome).toBe(funcionarioReq.nome);
      expect(retorno.cargo).toBe(funcionarioReq.cargo);
      expect(retorno.idade).toBe(funcionarioReq.idade);
    });
  })

  afterAll(() => {
    model.atualizar.mockReset();
  })
})

describe('Listar', () => {
  beforeEach(() => {
    // Antes de todos os testes, crio mock da função listar do model
    model.listar.mockImplementation((tabela, config) => Promise.resolve({
      lista: [],
      count: 0
    }));
  })

  test('Deve retornar sucesso. Sem query params passados', () => {
    return listar().then((retorno) => {
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.lista).toBeDefined();
      expect(Array.isArray(retorno.lista)).toBeTruthy();
      expect(retorno.lista.length).toBe(0);
      expect(retorno.count).toBeDefined();
      expect(retorno.count).toBe(0);
      
      // Verifico parametros passados para a função listar do model
      expect(model.listar.mock.calls.length).toBe(1);
      expect(model.listar.mock.calls[0][1]).toBeDefined();
      expect(model.listar.mock.calls[0][1].lastqryid).not.toBeDefined();
    });
  })

  test('Deve retornar sucesso. Query params passados', () => {
    const qryParams = {
      lastqryid: 'xpto'
    }
    
    return listar(qryParams).then((retorno) => {
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.lista).toBeDefined();
      expect(Array.isArray(retorno.lista)).toBeTruthy();
      expect(retorno.lista.length).toBe(0);
      expect(retorno.count).toBeDefined();
      expect(retorno.count).toBe(0);
      
      // Verifico parametros passados para a função listar do model
      expect(model.listar.mock.calls.length).toBe(1);
      // Verifico argumento de configuração da primeira chamada
      const modelFnListarArg01 = model.listar.mock.calls[0][1];
      expect(modelFnListarArg01).toBeDefined();
      expect(modelFnListarArg01.lastqryid).toBe(qryParams.lastqryid);
    });
  })

  afterEach(() => {
    model.listar.mockReset();
  })
})

describe('Buscar', () => {
  const funcionarioBD = {
    id: 'xpto',
    nome: 'Maria',
    cargo: 'Scrum Master',
    idade: 30
  }

  beforeAll(() => {
    // Antes de todos os testes, crio mock da função buscar do model
    model.buscar.mockImplementation((tabela, id) => Promise.resolve(funcionarioBD));
  })

  test('Deve retornar sucesso', () => {
    
    return buscar(funcionarioBD.id).then((retorno) => {
      // Verifico retorno
      expect(retorno).toBeDefined();
      expect(retorno).not.toBeNull();
      expect(retorno.id).toBe(funcionarioBD.id);
      expect(retorno.nome).toBe(funcionarioBD.nome);
      expect(retorno.cargo).toBe(funcionarioBD.cargo);
      expect(retorno.idade).toBe(funcionarioBD.idade);
      // Verifico chamada da função buscar
      expect(model.buscar.mock.calls.length).toBe(1);
    });
  })

  afterAll(() => {
    model.buscar.mockReset();
  })
})

describe('Excluir', () => {
  beforeAll(() => {
    // Antes de todos os testes, crio mock da função excluir do model
    model.excluir.mockImplementation((tabela, id) => Promise.resolve());
  })

  test('Deve retornar sucesso', () => {
    
    return excluir('xpto').then((retorno) => {
      // Verifico retorno
      expect(retorno).not.toBeDefined();
      // Verifico chamada da função excluir
      expect(model.excluir.mock.calls.length).toBe(1);
    });
  })

  afterAll(() => {
    model.excluir.mockReset();
  })
})