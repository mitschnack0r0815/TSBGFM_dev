import mongoose from 'mongoose';

import Game from '../models/game.js';
import boardSchema from '../models/board.js';
import Char from '../models/char.js';

export const GameLib = {

    async createGame(charNames) {
        let chars = [];
        
        for (const charname of charNames) {
            let char = await Char.findOne({ name: charname });
            chars.push(char);
        }        
  
        for (let i = 0; i < chars.length; i++) {
            chars[i].position.x = 0;
            chars[i].position.y = i;
        }

        let highestIdGame = await Game.findOne().sort({ gameNumber: -1 }).exec();
        let newGameNumber = highestIdGame ? highestIdGame.gameNumber + 1 : 1;
        let game = new Game({
            gameNumber: newGameNumber,
            board: {
                x: 10,
                y: 10
            },
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
            await game.save();
            console.log('Game created...');
        } catch (error) {
            console.error('Error saving game:', error);
        } 

        console.log('##################################################');

        return game;
    }

};