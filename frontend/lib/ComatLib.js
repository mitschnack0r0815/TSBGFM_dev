export const CombatLib = {

    /**
     * Rolls a specified number of dice with a given number of sides, using the notation "xWy" (e.g., "2W12" for 2d12).
     * 
     * @param {string} notation - The dice notation in the format "xWy", where:
     *      - x = Number of dice to roll
     *      - y = Number of sides per die
     * @returns {Object} - An object containing:
     *      - {number} total - The sum of all rolled dice
     *      - {number[]} results - An array of individual dice rolls
     * 
     * @throws {Error} If the notation is invalid (e.g., missing "W" or non-numeric values).
     * 
     * @example
     * rollDice("3W6");  // { total: 11, results: [2, 5, 4] }
     * rollDice("1W20"); // { total: 18, results: [18] }
     */
    rollDice(notation) {
        const match = notation.match(/^(\d+)W(\d+)$/i);
        if (!match) throw new Error("Invalid dice notation. Use format like '2W12'.");
    
        const [_, rolls, sides] = match.map(Number);
        let total = 0;
        let results = [];
    
        for (let i = 0; i < rolls; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;
            results.push(roll);
            total += roll;
        }
    
        return { total, results };
    },
    

    // Generate a random integer between min and max (inclusive)
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    
};
