import mongoose from 'mongoose';

import Game from '../models/game.js';
import Board from '../models/board.js';
import Unit from '../models/unit.js';
import { BoardLib } from './board.js';
import Player from '../models/player.js';

export const GameLib = {

    async createGame(playerNames) {
        // Check if players are provided
        if (!Array.isArray(playerNames) || playerNames.length < 2) {
            console.error('Players array is required');
            return;
        }

        if (playerNames.length > 4) {
            console.error('Too many player for now...');
            return;
        }

        let units = [];

        for (const playerName of playerNames) {
            let player = await Player.findOne({ playerName: playerName }).populate('units'); // Populate unitList with unit documents
            if (!player) {
                console.error(`Player not found: ${playerName}`);
                continue;
            }

            for (const unit of player.units) {
                for (let i = 0; i < unit.amount; i++) {
                    let unitInstance = await Unit.findOne({ name: unit.name });
                    if (unitInstance) {
                        units.push(unitInstance);
                    } else {
                        console.error(`unitacter not found: ${unit.name}`);
                    }
                }
            }
        }     

        let highestIdGame = await Game.findOne().sort({ gameNumber: -1 }).exec();
        let newGameNumber = highestIdGame ? highestIdGame.gameNumber + 1 : 1;

        let board = await Board.findOne().exec();
        if (!board) board = BoardLib.createBoard(2); // TODO: Board size is half the number of unitacters

        // Those are set in BoardLib.createBoard
        let corners = [
            { x: 1, y: 1 },
            { x: 8, y: 8 },
            { x: 8, y: 1 },
            { x: 1, y: 8 },
        ];

        for (let i = 0; i < units.length; i++) {
            units[i].position = corners[i];
            units[i].save();
        }

        let players = [];

        for (const playerName of playerNames) {
            let player = await Player.findOne({ playerName: playerName });
            if (player) {
                players.push(player);
            } else {
                console.error(`Player not found: ${playerName}`);
            }
        }

        let game = new Game({
            gameNumber: newGameNumber,
            board: board,
            players: players,
            turnList: [ playerNames[0], playerNames[1] ],
            currentTurn: 0,
        });

        console.log('');
        console.log('################ createGame #######################');
        console.log('New game created with number ' + 
                    newGameNumber);
        console.log('Game board size is ' + 
                    game.board.x + 'x' + 
                    game.board.y);

        try {
            let existingGame = await Game.findOne({ gameNumber: 1 }).exec();
            if (existingGame) {
                existingGame.board = game.board;
                existingGame.players = game.players;  
                existingGame.save();
                game = existingGame; // Use the existing game instance
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