import express from 'express';
import { connectDB, getDB } from './controllers/mongodb.js';

import testRoutes from './routes/test_route.js';
import charactersRoute from './routes/characters.js';


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Use API routes
app.use('/api', testRoutes);
// Use the characters route
app.use('/api/characters', charactersRoute);

connectDB().then(() => {
    app.get('/', async (req, res) => {
        const db = getDB();
        const collection = db.collection('data_collection');
        const data = await collection.find({}).toArray();
        res.send(data);
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => {
    console.error('Failed to connect to MongoDB', error);
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
