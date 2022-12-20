# Open Blockchain Consent Manager Admin UI

## Development and Production Environments

#### `npm install`

This will install all 3rd party dependencies in the root folder as well as in the `/client` and `/server` folders.

### Local Development

In _local development_ mode, the start script runs **two** processes:

- create-react-app starts the React UI Client on port `3000`.
- Server (node express server) is started on port `5000`.

#### `npm run dev`

This will start both the UI client and Server in `development` mode.

#### Local Development Configuration

In _local development_ mode, both the UI Client and the Server are run on localhost. The UI Client communicates with the Server and the Server communicates with the APIs (running remotely). The port configurations for the UI Client and Server can be found in `/client/.env` and `/server/.env` respectively.

UI Client (3000) --> Server (5000) --> API (see below)

You can must either configure `API_HOST` and `API_PORT` in `/server/.env` to point to your remote API endpoint or you must implement your own mock server for local testing and development.

### Production

In _production_ mode, we run **one process** inside the Docker container, the Server process. The Server process services requests for _both_ static web assets (webpacked react app) and backend requests to services - requests to `/api/*` are proxied to actual backend service(s) by the Server process. `node ./server/index.js` is run by the Docker container to start the Server process. The deployment scripts configure the deployment. The path to the backend services is provided by Helm Chart files.

#### `npm run build`

This will output the built client code into `dist/client` and copy the server code into `dist/server` it will also copy the `/charts` folder into `dist/charts`. This step is typically performed prior to running a `docker build`

### Miscellaneous

#### `npm run clean-all`

This is remove the `/dist` folder as well as the `/node-modules` folder at the root, `/client` and `/server` levels.
