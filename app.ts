import express from 'express';
import appealRouter from './src/appeals/appeal.router';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/appeals', appealRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});