import express from 'express';
import { connectDB, checkDBConnection } from './controllers/mongodb.js';

import testRoutes from './routes/test_route.js';
import charactersRoute from './routes/Characters.js';
// import combatRoute from './routes/Combat.js';
import gameStateRoute from './routes/GameState.js'; 
import initGameRoute from './routes/InitGame.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Use the middleware to check the database connection on every API call
app.use(checkDBConnection);

// Use API routes
app.use('/api/getCharacters', charactersRoute);
// app.use('/api/combat', combatRoute);
app.use('/api/getGameState', gameStateRoute);
app.use('/api/initGame', initGameRoute);
// Test route
app.use('/api', testRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => {
    console.error('Failed to connect to MongoDB', error);
    
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});


export default app; // Export the app for testing