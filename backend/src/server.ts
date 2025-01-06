import express,  { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import hotelRoutes from './routes/hotel.routes';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', hotelRoutes);

if (process.env.NODE_ENV !== 'test') {

  app.get('/', (req: Request, res: Response) => {
        res.send('Hello from your Node.js/TypeScript Express server!'); // Message displayed in browser
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
