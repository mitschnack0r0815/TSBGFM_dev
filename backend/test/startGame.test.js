import { expect } from 'chai';
import mongoose from 'mongoose';

import Char from '../models/char.js';

import Board from '../models/board.js';

import Game from '../models/game.js';
import { GameLib } from '../lib/game.js';


describe('StartGame', () => {
    let playerA, playerB;
    let charNames = ['Player A', 'Player B'];
    let game;

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
                life: 15,
                armor: 3,
                weapons: { 
                    first : {
                        name: 'Sword', 
                        strength: 4,
                        range: 1,
                        attacks: 2,
                        attackPower: 1,
                        critPower: 2 },
                    second: {
                        name: 'Bow', 
                        strength: 2,
                        range: 3,
                        attacks: 1,
                        attackPower: 1,
                        critPower: 2 },
                },
                moveDistance: 3,
                position: { x: 1, y: 1 }
            });
            await playerA.save();
        }

        if (!playerB) {
            playerB = new Char({
                name: 'Player B',
                life: 12,
                armor: 4,
                weapons: { 
                    first : {
                        name: 'Axe', 
                        strength: 7,
                        range: 1,
                        attacks: 1,
                        attackPower: 3,
                        critPower: 5 },
                },
                moveDistance: 3,
                position: { x: 1, y: 1 }
            });
            await playerB.save();
        }

        game = await GameLib.createGame(charNames);
    });

    after(async () => {
        console.log('...');
    });

    describe('Initiated Game', () => {
        it('This should create a game instance', async () => {
            expect(game.board.x).to.be.at.most(10);
            expect(game.board.x).to.be.at.least(1);
            expect(game.board.y).to.be.at.most(10);
            expect(game.board.y).to.be.at.least(1);

            console.log('Game board size is ' + game.board.x + 'x' + game.board.y);

            expect(game.chars[0]).to.exist;
            expect(game.chars[1]).to.exist;

            console.log('Game characters are ' + game.chars[0].name + ' and ' + game.chars[1].name);
        });
    });
});
