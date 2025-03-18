import express from 'express';
import Char from '../models/char.js';
import Board from '../models/board.js';

const router = express.Router();

// Endpoint to start a new game
router.get('/', async (req, res) => {
    try {
        let board = handleBoard();

        let characters = await handleCharacterCreation();

        // Return the initial game state
        res.json({ board, playerA: characters.playerA, playerB: characters.playerB });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function handleBoardCreation() {
    // Check for existing board
    let board = await Board.findOne({ name: 'test_board' });

    if (!board) {
        board = new Board({
            name: 'test_board',
            playerA: playerA._id,
            playerB: playerB._id
        });
        await board.save();
    }

    return board;
}

async function handleCharacterCreation() {
    // Check for existing characters
    let playerA = await Char.findOne({ name: 'Player A' });
    let playerB = await Char.findOne({ name: 'Player B' });

    if (!playerA) {
        playerA = new Char({
            name: 'Player A',
            life: 100,
            armor: 10,
        });
        await playerA.save();
    }

    if (!playerB) {
        playerB = new Char({
            name: 'Player B',
            life: 100,
            armor: 10,
        });
        await playerB.save();
    }

    return { playerA, playerB };
}

export default router;