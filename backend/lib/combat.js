import Char from '../models/char.js';

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
    
        const rolls = parseInt(match[1], 10);
        const sides = parseInt(match[2], 10);
        let total = 0;
        let results = [];
    
        for (let i = 0; i < rolls; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;
            results.push(roll);
            total += roll;
        }
        
        console.log(`Rolled ${rolls}d${sides}: ${results.join(', ')} (Total: ${total})`);
        return { total, results };
    },
    

    // Generate a random integer between min and max (inclusive)
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Simulates a round of combat between two characters.
     * 
     * @param {Char} playerA - The first character
     * @param {Char} playerB - The second character
     * @returns {Object} - An object containing the remaining life of both characters
     */
    combatRound(playerA, playerB) {
        // Roll for initiative
        const playerAInitiative = this.randomInt(1, 10) + playerA.weapon.initiative;
        const playerBInitiative = this.randomInt(1, 10) + playerB.weapon.initiative;

        // Determine order of attack
        let attacker, defender;
        if (playerAInitiative >= playerBInitiative) {
            attacker = playerA;
            defender = playerB;
        } else {
            attacker = playerB;
            defender = playerA;
        }
        console.log(`${attacker.name} goes first!`);

        const attack = (attacker, defender) => {
            const attackRoll = this.rollDice(attacker.weapon.dice).total;
            if (attackRoll >= defender.armor) {
                // Hit! Calculate damage
                const damage = Math.max(0, attackRoll - defender.armor);
                defender.life = Math.max(0, defender.life - damage);
                console.log(`${attacker.name} hits ${defender.name} for ${damage} damage!`);
            } else {
                // Miss!
                console.log(`${attacker.name} misses ${defender.name}!`);
            }
        };

        // Attacker attacks defender
        attack(attacker, defender);
        if (defender.life <= 0) return {
            playerA: playerA.life,
            playerB: playerB.life
        };

        // Defender attacks attacker
        attack(defender, attacker);

        return {
            playerA: playerA.life,
            playerB: playerB.life
        };
    },

    combat(playerA, playerB) {
        const results = [];
        while (playerA.life > 0 && playerB.life > 0) {
            console.log(`### Round ${results.length + 1} ###`);
            console.log(`${playerA.name} (${playerA.life} HP) vs. ${playerB.name} (${playerB.life} HP)`);
            results.push(this.combatRound(playerA, playerB));
            console.log(results[results.length - 1]);
            console.log();
        }
        console.log(`${playerA.life <= 0 ? playerB.name : playerA.name} wins!`);
        return results;
    }

};
