import express from 'express';
import cors from 'cors';
import * as userRouter from "./routes/users";
import { usersRouter } from './routes/users';
import { commentsRouter } from './routes/comments';

import serverless from 'serverless-http';

const router = express.Router();

const app = express();

app.use(cors());

router.get('/', (req, res) => {
    res.json({
        'hello': '123',
    })
})

app.use('/.netlify/functions/server', router);
app.use('/.netlify/functions/server/users', usersRouter);
app.use('/.netlify/functions/server/comments', commentsRouter);

export const handler = serverless(app);