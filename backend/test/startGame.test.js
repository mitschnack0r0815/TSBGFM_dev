import { expect } from 'chai';
import mongoose from 'mongoose';

import Char from '../models/char.js';

import Board from '../models/board.js';

import Game from '../models/game.js';
import { GameLib } from '../lib/game.js';


describe('StartGame', () => {
    let charNames = ['Player A', 'Player B'];
    let game;

    before(async () => {
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
