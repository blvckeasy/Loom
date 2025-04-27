import { Request } from 'express';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
import { BaseError } from '../infrastructure';


export async function writeErrorFile(error: BaseError, req: Request) {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const logFileName = moment().format('DD-MM-YYYY') + '.errors.log';
    const logPath = path.join(process.cwd(), 'logs', logFileName);

    const requestInfo = req
        ? `
Request:
  Method: ${req.method}
  URL: ${req.originalUrl}
  IP: ${req.ip}
  Headers: ${JSON.stringify(req.headers, null, 2)}
  Query: ${JSON.stringify(req.query, null, 2)}
  Params: ${JSON.stringify(req.params, null, 2)}
  Body: ${JSON.stringify(req.body, null, 2)}`
        : '';

    const errorInfo = `
[${timestamp}]
Error:
  Name: ${error.name}
  Message: ${error.message}
  StatusCode: ${'statusCode' in error ? error.statusCode : 'N/A'}
  Stack: ${error.stack || 'No stack trace'}

${requestInfo}
----------------------------------------------------------------------------------------\n`;

    fs.appendFileSync(logPath, errorInfo);
}