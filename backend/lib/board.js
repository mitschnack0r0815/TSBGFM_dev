import Board from '../models/board.js';

/**
 * Library of functions to handle board operations
 */
export const BoardLib = {

    /**
     * Creates the board array.
     * 
     * @param {Board} boardSchema 
     * @returns 
     */
    createBoard(boardSchema) {
        let board_array = new Array(boardSchema.x).fill(null).map(() => new Array(boardSchema.y).fill(null));
        console.log(`Created ${x}x${y} board`);
        return board_array;
    }

};