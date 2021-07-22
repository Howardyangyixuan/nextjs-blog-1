import {createConnection, getConnectionManager} from 'typeorm';


export const getDatabaseConnection = async () => {
  let manager = getConnectionManager();
  if (manager.has('default') && manager.get('default').isConnected) {
    return manager.get('default');
  } else {
    return createConnection();
  }
};