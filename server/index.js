/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

require('newrelic');

const path = require('path');
const fs = require('fs');
const https = require('https');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const tlsHelper = require('./utils/tls-helper');
const initializeHandler = require('./initializeServer');
const router = require('./router');
const logger = require('./config/logger').getLogger('index.js');

dotenvExpand(dotenv.config());

const app = initializeHandler.initializeServer(router);
const port = process.env.SERVER_PORT || process.env.VCAP_APP_PORT || 5000;

logger.info(`NODE JS RUNNING ON ${process.version}`);
logger.info(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
logger.info(`process.env.USE_HTTPS = ${process.env.USE_HTTPS}`);
logger.info(`process.env.API_BASE_URL = ${process.env.API_BASE_URL}`);

process.on('warning', (warning) => {
  logger.warn(`******************Print the warning name app.js******************${warning.name}`);
  logger.warn(`******************Print the warning message app.js******************${warning.message}`);
  logger.warn(`******************Print the stack trace app.js******************${warning.stack}`);
});

process.on('unhandledRejection', (reason, p) => {
  logger.warn(' ');
  logger.warn('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  logger.warn('Unhandled Rejection at: Promise', p, 'reason:', reason);
  logger.warn('Unhandled Rejection ');
  logger.warn('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  logger.warn(' ');
});

process.on('uncaughtException', (err) => {
  logger.warn(' ');
  logger.warn('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  logger.warn(`uncaught exception = ${err}`);
  logger.warn(`uncaught stack = ${err.stack}`);
  logger.warn('XXXXXX;XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  logger.warn(' ');
});

let server;
if (process.env.USE_HTTPS && (process.env.USE_HTTPS === 'true' || process.env.USE_HTTPS === 'TRUE')) {
  const tlsFolder = process.env.TLS_FOLDER_PATH || path.join(__dirname, './config/tls');
  const serverCert = path.resolve(tlsFolder, 'tls.cert');
  const serverKey = path.resolve(tlsFolder, 'tls.key');

  logger.info(`  Using server.key & server.cert from folder: ${tlsFolder}`);
  logger.info(`  server cert file = ${serverCert}`);
  logger.info(`  server key file = ${serverKey}`);

  const foundKeyFiles = tlsHelper.validateSSLFiles(serverKey, serverCert);
  if (foundKeyFiles) {
    const options = {
      key: fs.readFileSync(serverKey),
      cert: fs.readFileSync(serverCert),
      secureOptions: tlsHelper.getSecureOptions(),
      ciphers: tlsHelper.getCiphersForServerOptions(),
      honorCipherOrder: true,
    };
    server = https.createServer(options, app).listen(port, (err) => {
      if (err) {
        logger.error('Error starting https server = ', err);
      }
      logger.info(`Server running on port ${port}`);
    });
  } else {
    logger.error('Missing SSL certificates');
    process.exit(1);
  }
} else {
  server = app.listen(port, (err) => {
    if (err) {
      logger.error('Error starting server = ', err);
    }
    logger.info(`Server running on port ${port}`);
  });
}

// Handle shutdown signals. Safely shutting down processes and closing connections
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
signalTraps.forEach((type) => {
  process.once(type, () => {
    logger.info(`Received kill '${type}' signal, shutting down gracefully`);
    server.close((err) => {
      if (err) {
        logger.error('An error while shutting down:', err);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
      }
      // eslint-disable-next-line no-process-exit
      process.exit(0);
    });
  });
});
