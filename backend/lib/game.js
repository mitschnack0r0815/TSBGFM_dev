import mongoose from 'mongoose';

import Game from '../models/game.js';
import Char from '../models/char.js';

export const GameLib = {

    async createGame(charNames) {
        let chars = [];

        console.log('Connecting to database...');
        await mongoose.connect('mongodb://localhost:27017/TSBGFM', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
        
        for (const charname of charNames) {
            let char = await Char.findOne({ name: charname });
            console.log('Found character - ' + char.name + ' with ' + char.weapon.name);
            chars.push(char);
        }        

        console.log('Char array:');
        chars.forEach(char => {
            console.log(char.name);
        });

        let highestIdGame = await Game.findOne().sort({ gameNumber: -1 }).exec();
        let newGameNumber = highestIdGame ? highestIdGame.gameNumber + 1 : 1;
        console.log('New game number:', newGameNumber);

        let game = new Game({
            gameNumber: newGameNumber,
            board: {
                x: 10,
                y: 10
            },
            chars: chars
        });

        try {
            await game.save(); // Await the save operation
            console.log('Game created:', game);
        } catch (error) {
            console.error('Error saving game:', error);
        } finally {
            await mongoose.connection.close();
        }

        return game;
    }

};