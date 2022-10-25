import express from 'express';
import resize from './api/resize';
const routes = express.Router();

// routes.use("/assits", express.static(__dirname.slice(0, 22) + "/assits"));
routes.use('/resize', resize);
routes.get('/api', (req: express.Request, res: express.Response) => {
  res.send('main api');
});
export default routes;
