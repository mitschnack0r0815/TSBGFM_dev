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

    // Function to initiate combat in the backend
    async initiateCombat() {
        try {
            const response = await axios.post('/api/combat', {
                playerA: this.playerA,
                playerB: this.playerB
            });
            console.log('Combat initiated:', response.data);  // Logs the response from your backend
            return response.data;
        } catch (error) {
            console.error('Error initiating combat:', error);
        }
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

        // Create life bars
        this.playerALifeBar = this.createLifeBar(50, 150, this.playerA.life);
        this.playerBLifeBar = this.createLifeBar(550, 150, this.playerB.life);

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

        // Function to update player text
        const updatePlayerText = (playerText, player) => {
            playerText.setText(
            `Player: ${player.name}\nLife: ${player.life}\nArmor: ${player.armor}\nWeapon: ${player.weapon.name}`
            );
        };

        this.initiateCombat().then(async combat_data => {
            for (let i = 0; i < combat_data.length; i++) {
                const round = combat_data[i];

                if (round.playerA <= 0) {
                    this.hitIndicator(0, 250, 300, true);
                } else {
                    this.hitIndicator(this.playerA.life - round.playerA, 250, 300);
                }

                if (round.playerB <= 0) {
                    this.hitIndicator(0, 550, 300, true);
                } else {
                    this.hitIndicator(this.playerB.life - round.playerB, 550, 300);
                }

                // Update player information
                this.playerA.life = round.playerA;
                this.playerB.life = round.playerB;
                updatePlayerText(playerAText, this.playerA);
                updatePlayerText(playerBText, this.playerB);

                // Update life bars
                this.updateLifeBar(this.playerALifeBar, this.playerA.life);
                this.updateLifeBar(this.playerBLifeBar, this.playerB.life);

                await new Promise(resolve => setTimeout(resolve, 500));
            }
        });
    }

    hitIndicator(number, x, y, dead=false) {
        const hit_txt = dead ? "DEAD" : "-" + number.toString();
        const item = this.add.text(x, y, hit_txt, 
            { fontFamily: 'Arial', fontSize: 32, color: '#ff0000', fontStyle: 'bold' });

        this.tweens.add({
            targets: item,
            props: {
                y: {
                    value: -64,
                    ease: 'Linear',
                    duration: 3000,
                },
                x: {
                    value: '+=64',
                    ease: 'Sine.inOut',
                    duration: 500,
                    yoyo: true,
                    repeat: 4
                }
            },
            onComplete: function () {
                item.destroy();
            }
        });
    }

    createLifeBar(x, y, life) {
        const lifeBar = this.add.graphics();
        lifeBar.lineStyle(2, 0x000000, 1); // Add a thin black border
        lifeBar.strokeRect(x, y, 200, 20); // Assuming max life is 100
        lifeBar.fillStyle(0x00ff00, 1);
        lifeBar.fillRect(x, y, life * 2, 20); // Assuming max life is 100
        lifeBar.posX = x;
        lifeBar.posY = y;
        
        // Add HP text
        const hpText = this.add.text(x + life * 2 / 2, y - 10, `HP: ${life}`, {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#ffffff'
        });
        hpText.setOrigin(0.5);
        lifeBar.hpText = hpText;

        return lifeBar;
    }

    updateLifeBar(lifeBar, life) {
        lifeBar.clear();
        lifeBar.lineStyle(2, 0x000000, 1); // Add a thin black border
        lifeBar.strokeRect(lifeBar.posX, lifeBar.posY, 200, 20); // Assuming max life is 100
        lifeBar.fillStyle(0x00ff00, 1);
        lifeBar.fillRect(lifeBar.posX, lifeBar.posY, life * 2, 20); // Assuming max life is 100
        
        // Update HP text
        lifeBar.hpText.setText(`HP: ${life}`);
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
    
}