import express from 'express';
import 'dotenv/config';
import AquariumRoutes from './routes/v1/aquariums';
import UserRoutes from './routes/v1/users';
import ConnectDB from './config/db';

ConnectDB();

const app: express.Application = express();

app.use(express.json());

app.use('/v1/aquariums', AquariumRoutes);
app.use('/v1/users', UserRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
