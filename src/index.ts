import express from 'express';
import fs from 'fs';
import routes from './routes/index';

const app = express();
const port = 3000;
app.use('/api', routes);
app.listen(port, () => {
  console.log(`server started working at ${port}`);
});
export default app;
