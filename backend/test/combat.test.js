import { expect } from 'chai';
import mongoose from 'mongoose';
import Char from '../models/char.js';
import { CombatLib } from '../lib/combat.js';

describe('CombatLib', () => {
    before(async () => {
        await mongoose.connect('mongodb://localhost:27017/TSBGFM', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    after(async () => {
        await mongoose.connection.close();
    });

    describe('combat', () => {
        it('should simulate a combat between two players', async () => {
            const playerA = new Char({
                name: 'Player A',
                life: 100,
                armor: 1,
                weapon: { name: 'Sword', dice: '1W6', type: 'Sword', initiative: 5 }
            });

            const playerB = new Char({
                name: 'Player B',
                life: 100,
                armor: 1,
                weapon: { name: 'Axe', damage: '1W12', type: 'Axe', initiative: 1 }
            });

            const results = CombatLib.combat(playerA, playerB);

            expect(results).to.be.an('array');
            expect(results.length).to.be.greaterThan(0);
            expect(playerA.life).to.be.at.most(100);
            expect(playerB.life).to.be.at.most(100);
        });
    });
});