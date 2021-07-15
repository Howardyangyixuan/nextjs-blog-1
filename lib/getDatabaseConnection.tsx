import {createConnection, getConnectionManager} from 'typeorm';
import {returnStatement} from '@babel/types';


export const getDatabaseConnection = async () => {
  let manager = getConnectionManager();
  if (manager.has('default') && manager.get('default').isConnected) {
    console.log('复用');
    return manager.get('default');
  } else {
    console.log('初始化');
    return createConnection();
  }
};