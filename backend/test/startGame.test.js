import { expect } from 'chai';
import mongoose from 'mongoose';

import Unit from '../models/unit.js';
import {Player } from '../models/player.js';

import Board from '../models/board.js';
import Game from '../models/game.js';
import { GameLib } from '../lib/game.js';



describe('StartGame', () => {
    let playerA, playerB;
    let playerNames = ['Donald', 'Elon'];
    let playerUnitA, playerUnitB;
    let charNames = ['Orc', 'Human'];
    let game;

    before(async () => {
        await mongoose.connect('mongodb://localhost:27017/TSBGFM', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Check for existing characters
        playerUnitA = await Unit.findOne({ name: charNames[0] });
        playerUnitB = await Unit.findOne({ name: charNames[1] });

        // Create characters if they don't exist
        if (!playerUnitA) {
            playerUnitA = new Unit({
                id: 1,
                name: charNames[0],
                faction: 'Shirts',
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
            await playerUnitA.save();

            playerUnitA = new Unit({
                id: 2,
                name: charNames[0],
                faction: 'Shirts',
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
                position: { x: 2, y: 2 }
            });
            await playerUnitA.save();
        }

        if (!playerUnitB) {
            playerUnitB = new Unit({
                id: 3,
                name: charNames[1],
                faction: 'Blouses',
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
                position: { x: 8, y: 8 }
            });
            await playerUnitB.save();

            playerUnitB = new Unit({
                id: 4,
                name: charNames[1],
                faction: 'Blouses',
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
                position: { x: 7, y: 7 }
            });
            await playerUnitB.save();
        }

        // Check for existing players
        playerA = await Player.findOne({ playerName: playerNames[0] });
        playerB = await Player.findOne({ playerName: playerNames[1] });

        // Create players if they don't exist
        if (!playerA) {
            let unitsA = await Unit.find({ faction: 'Shirts' });

            playerA = new Player({
                id: 1,
                playerName: playerNames[0],
                faction: 'Shirts',
                units: unitsA,
                initiative: 0,
                extraDice: 2
            });
            await playerA.save();
        }

        if (!playerB) {
            let unitsB = await Unit.find({ faction: 'Blouses' });

            playerB = new Player({
                id: 2,
                playerName: playerNames[1],
                faction: 'Blouses',
                units: unitsB,
                initiative: 0,
                extraDice: 2
            });
            await playerB.save();
        }

        game = await GameLib.createGame(playerNames);
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

            expect(game.players[0]).to.exist;
            expect(game.players[1]).to.exist;

            console.log('Game players are ' + game.players[0].playerName + ' and ' + game.players[1].playerName);
        });
    });
});
