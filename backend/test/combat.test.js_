import { expect } from 'chai';
import mongoose from 'mongoose';
import Char from '../models/char.js';
import { CombatLib } from '../lib/combat.js';

describe('CombatLib', () => {
    let playerA, playerB;

    before(async () => {
        await mongoose.connect('mongodb://localhost:27017/TSBGFM', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Check for existing characters
        playerA = await Char.findOne({ name: 'Player A' });
        playerB = await Char.findOne({ name: 'Player B' });

        // Create characters if they don't exist
        if (!playerA) {
            playerA = new Char({
                name: 'Player A',
                life: 100,
                armor: 1,
                weapon: { name: 'Sword', dice: '1W6', type: 'Sword', initiative: 5 }
            });
            await playerA.save();
        }

        if (!playerB) {
            playerB = new Char({
                name: 'Player B',
                life: 100,
                armor: 1,
                weapon: { name: 'Axe', dice: '1W12', type: 'Axe', initiative: 1 }
            });
            await playerB.save();
        }
    });

    after(async () => {
        // Save the updated characters back to the database
        // await playerA.save();
        // await playerB.save();
        await mongoose.connection.close();
    });

    describe('combat', () => {
        it('should simulate a combat between two players', async () => {
            const results = CombatLib.combat(playerA, playerB);

            expect(results).to.be.an('array');
            expect(results.length).to.be.greaterThan(0);
            expect(playerA.life).to.be.at.most(100);
            expect(playerB.life).to.be.at.most(100);
        });
    });
});