import {createConnection, getConnectionManager} from 'typeorm';
import {returnStatement} from '@babel/types';

//立即执行函数
const promise = (async function () {
  return createConnection();
})();

export const getDatabaseConnection = async () => {
  return promise;
};