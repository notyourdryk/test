import express from 'express';
import { log, headers, finalErrorHandler } from './middleware';
import router from './router/index.js';

const PORT = 3000;
const app = express();

app.use(log)
    .use(headers)
    .use(express.json())
    .use(router)
    .use(finalErrorHandler)
    .listen(PORT, () => {
    console.debug(`Listening at http://localhost:${PORT}`);
});