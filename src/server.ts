import express, { Application } from 'express';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express'; // Import from graphql-http
import { schema, root } from './graphql/schema';
import { parseCSVAndInsert } from './utils/csvParser';
import { ruruHTML } from 'ruru/server';
import adminRoutes from './routes/admin';

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(
  '/graphql',
  createHandler({
    schema,
    rootValue: root,
  })
);

app.post('/import', async (req, res) => {
  const filePath = '/app/data/Mobile_Food_Facility_Permit.csv';
  try {
    await parseCSVAndInsert(filePath);
    res.status(200).send('Data imported successfully');
  } catch (error) {
    res.status(500).send('Error importing data');
  }
});

app.use('/admin', adminRoutes);

app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
