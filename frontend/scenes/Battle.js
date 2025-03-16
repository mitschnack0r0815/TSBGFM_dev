import Phaser from 'phaser';

import axios from 'axios'; // Add Axios for API calls

export class Battle extends Phaser.Scene {

    constructor() 
    {
        super('Battle');
    }

    init(data) {
        this.playerA = data.playerA;
        this.playerB = data.playerB;
    }

    create_knight (x,y)
    {
        const knight = this.add.image(x, y, 'knight');
        knight.setDisplaySize(250, 250);
        return knight;
    }

    create_panel (x,y)
    {
        const panel = this.add.image(x, y, 'panel_brown');
        panel.setDisplaySize(300, 200);
        return panel;
    }

    create() 
    {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.cameras.main.setBackgroundColor('#808080');
        // this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.panel_left = this.create_panel(150,500);
        this.knight_left = this.create_knight(150, 300);

        this.panel_right = this.create_panel(650,500);
        this.knight_right = this.create_knight(650, 300);

        // Function to create player text
        const createPlayerText = (x, y, player) => {
            const playerText = this.add.text(
            x, y,
            `Player: ${player.name}\nLife: ${player.life}\nArmor: ${player.armor}\nWeapon: ${player.weapon.name}`,
            { fontFamily: 'Diablo', fontSize: 24, color: '#000000' }
            );
            playerText.setOrigin(0.5);
            return playerText;
        };

        // Display player information
        const playerAText = createPlayerText(150, 500, this.playerA);
        const playerBText = createPlayerText(650, 500, this.playerB);
    }
    
}