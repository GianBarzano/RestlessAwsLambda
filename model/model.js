// Interface de integração com AWS
const AWS = require('aws-sdk');
// Interface de integração com DynamoDB
let dynamodb = null; 

getDynamoDB = () => {
  if (!dynamodb) {
    dynamodb = new AWS.DynamoDB.DocumentClient();
  }

  return dynamodb;
}
/**
 * Cria um registro na tabela do banco de dados
 */
module.exports.criar = (tabela, dados) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Monto params de criação
      const paramsDB = {
        TableName: tabela,
        Item: dados
      };

      // Busco registros no banco de dados
      await getDynamoDB().put(paramsDB).promise();
      
      // Retorno registros
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Atualiza um registro na tabela do banco de dados
 */
module.exports.atualizar = (tabela, dados, campoId = 'id') => {
  return new Promise(async (resolve, reject) => {
    try {
      // Configuro campos alterados
      let UpdateExpression = 'set';
      let ExpressionAttributeValues = {};

      Object.keys(dados)
      .filter(campo => campo != 'id')
      .forEach((campo, index) => {
        if (index > 0) {
          UpdateExpression += ','
        }

        // Configuro expressão
        UpdateExpression += ` ${campo} = :${campo}`;

        // Configuro novo valor
        ExpressionAttributeValues[`:${campo}`] = dados[campo];
        
      });
      
      // Configuro valor de expressão para o ID
      ExpressionAttributeValues[`:${campoId}`] = dados[campoId];

      // Monto params de atualização
      const paramsDB = {
        TableName: tabela,
        Item: dados,
        Key: {},
        UpdateExpression,
        ExpressionAttributeValues,
        ReturnValues: "UPDATED_NEW"
      };

      // Defino id de busca
      paramsDB['Key'][campoId] = dados.id;
      paramsDB['ConditionExpression'] = `${campoId} = :${campoId}`;

      // Atualizo registro no banco de dados
      await getDynamoDB().update(paramsDB).promise();
      
      // Retorno sucesso
      resolve();
    } catch (error) {
      if (error && error.code == 'ConditionalCheckFailedException') {
        reject('nao-encontrado');
      } else {
        reject(error);
      }
    }
  });
}

/**
 * Lista registros de uma tabela do banco de dados
 * @param {*} tabela 
 * @param {*} configPag 
 */
module.exports.listar = (tabela, configPag = {}, campoId = 'id') => {
  return new Promise(async (resolve, reject) => {
    try {
      // Inicializo dados de paginação
      if (!configPag) {
        configPag = {}
      }

      if (!configPag.pages) {
        configPag.pages = 5;
      }

      // Monto params da busca
      const paramsDB = {
        TableName: tabela,
        Limit: configPag.pages
      };

      // Se configuração de paginação possui filtro de último registro, eu aplico
      if (configPag.lastqryid) {
        paramsDB['ExclusiveStartKey'] = {};
        paramsDB['ExclusiveStartKey'][campoId] = configPag.lastqryid;
      }

      // Busco registros no banco de dados
      const dynamoData = await getDynamoDB().scan(paramsDB).promise();
      
      // Converto retorno para formato utilizado no sistema
      const dados = {
        lista: dynamoData.Items,
        count: dynamoData.Count
      }

      if (dynamoData.LastEvaluatedKey) {
        dados.lastqryid = dynamoData.LastEvaluatedKey[campoId];
      }

      resolve(dados);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Exclui um registro de uma tabela do banco de dados
 * @param {*} tabela 
 * @param {*} id 
 */
module.exports.excluir = (tabela, id, campoId = 'id') => {
  return new Promise(async (resolve, reject) => {
    try {
      // Monto params da busca
      const paramsDB = {
        TableName: tabela,
        ReturnValues: "ALL_OLD",
        Key: {},
        ExpressionAttributeValues: {}
      };

      // Defino id de busca
      paramsDB['Key'][campoId] = id;
      // Defino condição de busca, assim retorno erro se não for encontrado
      paramsDB['ConditionExpression'] = `${campoId} = :${campoId}`;
      paramsDB['ExpressionAttributeValues'][`:${campoId}`] = id;

      // Excluo registro no banco de dados
      await getDynamoDB().delete(paramsDB).promise();

      // Retorno sucesso
      resolve();
    } catch (error) {
      if (error && error.code == 'ConditionalCheckFailedException') {
        reject('nao-encontrado');
      } else {
        reject(error);
      }
    }
  });
}

/**
 * Busca um registro de uma tabela do banco de dados
 * @param {*} tabela 
 * @param {*} id 
 */
module.exports.buscar = (tabela, id, campoId = 'id') => {
  return new Promise(async (resolve, reject) => {
    try {
      // Monto params da busca
      const paramsDB = {
        TableName: tabela,
        Key: {}
      };

      // Defino id de busca
      paramsDB['Key'][campoId] = id;

      // Busco registros no banco de dados
      const dynamoData = await getDynamoDB().get(paramsDB).promise();
      
      if (dynamoData.Item) {
        // Retorno registros
        resolve(dynamoData.Item);
      } else {
        reject('nao-encontrado');
      }
    } catch (error) {
      reject(error);
    }
  });
}