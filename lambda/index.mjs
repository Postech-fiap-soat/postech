import {log} from './log.mjs';

export const handler = async (event) => {
    log('event:' + JSON.stringify(event))
    return {
        statusCode: 200,
        body: `<html><body>Dados da requisição:${JSON.stringify(event)}</body></html>`,
        headers : {
            'Content-Type': "text/html"
        }
      };
  };
  