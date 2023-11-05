import {log} from 'log';

export const handler = async (event) => {
    log('log de execução apos commit' + JSON.stringify(event))
    return {
        statusCode: 200,
        body: JSON.stringify(event),
      };
  };
  