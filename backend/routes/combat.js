import express from 'express';
import { CombatLib } from '../lib/combat.js';

const router = express.Router();

// Endpoint to initiate combat
router.post('/', async (req, res) => {
    try {
        const { playerA, playerB } = req.body;
        const combatResult = CombatLib.combat(playerA, playerB);
        res.json(combatResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;