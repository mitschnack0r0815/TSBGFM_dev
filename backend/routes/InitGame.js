import express from 'express';

import Game from '../models/game.js';
import { GameLib } from '../lib/game.js';

const router = express.Router();

// Endpoint to start a new game
router.post('/', async (req, res) => {
    try {
        console.log('Creating a new game...');
        const { Player1, Player2 } = req.body; // Get player names from request body
        const players = [Player1, Player2];
        
        if (!Array.isArray(players) || players.length === 0) {
            console.log(req.body);
            console.error('Players array is required');
            return res.status(400).json({ error: 'Players array is required' });
        }

        const game = await GameLib.createGame(players); // Create a new game with provided players

        // Return created game
        console.log('Game created:', game);
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;