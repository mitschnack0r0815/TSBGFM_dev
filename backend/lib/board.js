import mongoose from 'mongoose';

import Board from '../models/board.js';
// import Terrain from '../models/terrain.js'

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

        let map = new Array(xy).fill(null).map(() => 
                new Array(xy).fill().map(() => 
                    this.getWeightedRandom([0, 1, 2, 3], [0, 0.7, 0.3, 0.1])));

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
                } else if (x === 0 )  {
                    map[x][y] = 1;
                } else if (x === xy - 1) {
                    map[x][y] = 1;
                } else if (y === 0) {
                    map[x][y] = 1;
                } else if (y === xy - 1) {
                    map[x][y] = 1;
                }
            }
        }
        // Possible character spawn points
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
    },

    /**
     * Generates a random number between 1 and 3 with weighted probabilities.
     * 
     * @param {number[]} values - The values to choose from.
     * @param {number[]} weights - The weights for each value.
     * @returns {number} - The randomly selected value.
     */
    getWeightedRandom(values, weights) {
        let totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
        let random = Math.random() * totalWeight;
        for (let i = 0; i < values.length; i++) {
            if (random < weights[i]) {
                return values[i];
            }
            random -= weights[i];
        }
    }
};