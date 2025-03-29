# SampleTest

This project only use for development environment. It demonstrates some new features of Angular version 19.2.

## JSON mock server
To start [JSON mock server](https://www.npmjs.com/package/json-server), run:

```bash
npm run start:server
```

## Start application

To start a local development server, open another terminal and run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

## Known issue

When a product has just been created. We cannot update it. This JSON mock server's issue is [mentioned here](https://github.com/typicode/json-server/issues/710).

 * Workaround: Stop and Restart JSON mock server

