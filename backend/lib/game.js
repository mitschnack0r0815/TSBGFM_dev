import mongoose from 'mongoose';

import Game from '../models/game.js';
import Board from '../models/board.js';
import Char from '../models/char.js';
import { BoardLib } from './board.js';
import char from '../models/char.js';

export const GameLib = {

    async createGame(charNames) {
        let chars = [];
        
        if (charNames.length > 4) {
            console.error('Too many characters for a game');
            return;
        }

        for (const charname of charNames) {
            let char = await Char.findOne({ name: charname });
            chars.push(char);
        }        

        let highestIdGame = await Game.findOne().sort({ gameNumber: -1 }).exec();
        let newGameNumber = highestIdGame ? highestIdGame.gameNumber + 1 : 1;

        let board = await Board.findOne().exec();
        if (!board) board = BoardLib.createBoard(charNames.length);

        // Those are set in BoardLib.createBoard
        let corners = [
            { x: 1, y: 1 },
            { x: 8, y: 8 },
            { x: 8, y: 1 },
            { x: 1, y: 8 },
        ];

        for (let i = 0; i < chars.length; i++) {
            chars[i].position = corners[i];
            chars[i].save();
        }

        let game = new Game({
            gameNumber: newGameNumber,
            board: board,
            chars: chars
        });

        console.log('');
        console.log('################ createGame #######################');
        console.log('New game created with number ' + 
                    newGameNumber);
        console.log('Game board size is ' + 
                    game.board.x + 'x' + 
                    game.board.y);
        console.log('Game characters are ' + 
                    game.chars[0].name + ' and ' + 
                    game.chars[1].name);
        console.log('Game characters are at ' + 
                    game.chars[0].position.x + ', ' + 
                    game.chars[0].position.y + ' and ' + 
                    game.chars[1].position.x + ', ' + 
                    game.chars[1].position.y);

        try {
            let existingGame = await Game.findOne({ gameNumber: 1 }).exec();
            if (existingGame) {
                existingGame.board = game.board;
                existingGame.chars = game.chars;  
                existingGame.save();
            } else {
                await game.save();
            }
            
            console.log('Game created...');
        } catch (error) {
            console.error('Error saving game:', error);
        } 

        console.log('##################################################');

        return game;
    }

};