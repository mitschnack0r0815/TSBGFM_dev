import mongoose from 'mongoose';

import Board from '../models/board.js';
import Terrain from '../models/terrain.js'

/**
 * Library of functions to handle board operations
 */
export const BoardLib = {

    /**
     * Creates the board array.
     * 
     * @param int amountPlayers
     * @returns 
     */
    createBoard(amountPlayers) {
        let xy = amountPlayers * 5;

        let map = new Array(xy).fill(null).map(() => new Array(xy).fill().map(() => 1 + Math.floor(Math.random() * 2)));

        for (let x = 0; x < xy; x++) 
        {
            for (let y = 0; y < xy; y++) 
            {
                if ((x <= 1 && y <= 1) || 
                    (x <= 1 && y >= xy - 2) || 
                    (x >= xy - 2 && y <= 1) || 
                    (x >= xy - 2 && y >= xy - 2)) 
                {
                    map[x][y] = 0;
                } else {
                    // map[i][j] = 1;
                }
            }
        }
        map[1][1] = 1;
        map[8][1] = 1;  
        map[1][8] = 1;
        map[8][8] = 1;

        for (let x = 0; x < xy; x++)
        {
            console.log(map[x].join(' '));
        }

        let board = new Board({
            x: xy,
            y: xy,
            map: map
        })
        board.save();
        return board;
    }
};