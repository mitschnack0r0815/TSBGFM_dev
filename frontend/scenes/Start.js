import Phaser from 'phaser';
import { CombatLib } from '../lib/ComatLib'; 

import axios from 'axios'; // Add Axios for API calls

export class Start extends Phaser.Scene {

    constructor() 
    {
        super('Start');
    }

    // Function to call the backend API and handle the response
    async fetchBackendData() {
        console.log('test_api');
        try {
            const response = await axios.get('/api/test');
            console.log('Backend response:', response.data);  // Logs the data from your backend
        } catch (error) {
            console.error('Error fetching from backend:', error);
        }
    }

    // Function to fetch characters from the backend
    async fetchCharacters() {
        try {
            const response = await axios.get('/api/characters');
            console.log('Characters:', response.data);  // Logs the data from your backend
            return response.data;
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    }

    create() 
    {
        // Fetch characters from the backend
        this.fetchCharacters().then(characters => {
            this.createDropdown('playerA', 100, 100, characters);
            this.createDropdown('playerB', 500, 100, characters);
        });


        this.cameras.main.setBackgroundColor('#808080');
        // this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        const start_banner = this.add.image(400, 400, 'start_banner');
        start_banner.setDisplaySize(150, 80);

        this.loadText = this.add.text(
            400, 400, 
            'CoMbAt...', 
            { fontFamily: 'Arial', fontSize: 24, color: '#e3f2ed' }
        );

        this.loadText.setOrigin(0.5);
        this.loadText.setStroke('#203c5b', 6);
        this.loadText.setShadow(2, 2, '#2d2d2d', 2, true, false);

        // Add event listener to switch to Battle scene when clicking on the start_banner
        start_banner.setInteractive({ useHandCursor: true });
        start_banner.on('pointerdown', () => {
            const playerA = this.getSelectedCharacter('playerA');
            const playerB = this.getSelectedCharacter('playerB');
            const data = { playerA, playerB };

            if (!playerA || !playerB) {
                console.error('No players found, getting testdata...');
                data = {
                    playerA: { name: 'Player A', life: 100, armor: 10, weapon: { name: 'Sword', dice: '1W6', type: 'Sword', initiative: 5 } },
                    playerB: { name: 'Player B', life: 100, armor: 10, weapon: { name: 'Axe', dice: '1W12', type: 'Axe', initiative: 1 } }
                };
            } 

            this.cameras.main.fadeOut(1000, 0, 0, 0); // Fade out over 1 second
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('Battle', data);
            });
        });
    }

    create_panel (x,y)
    {
        const panel = this.add.image(x, y, 'panel_brown');
        panel.setDisplaySize(300, 200);
        return panel;
    }

    createDropdown(id, x, y, characters) {
        const dropdown = this.add.container(x, y);
        const background = this.add.rectangle(0, 0, 200, 30, 0x000000).setOrigin(0, 0);
        const text = this.add.text(10, 5, 'Select Character', { fontSize: '16px', fill: '#ffffff' });

        dropdown.add([background, text]);

        background.setInteractive({ useHandCursor: true });
        background.on('pointerdown', () => {
            this.toggleDropdown(dropdown, characters);
        });

        this[id] = dropdown;
    }

    toggleDropdown(dropdown, characters) {
        if (dropdown.list.length > 2) {
            dropdown.removeAll(true);
            const background = this.add.rectangle(0, 0, 200, 30, 0x000000).setOrigin(0, 0);
            const text = this.add.text(10, 5, 'Select Character', { fontSize: '16px', fill: '#ffffff' });
            dropdown.add([background, text]);
            background.setInteractive({ useHandCursor: true });
            background.on('pointerdown', () => {
                this.toggleDropdown(dropdown, characters);
            });
        } else {
            characters.forEach((character, index) => {
                const option = this.add.text(10, 35 + index * 30, character.name, { fontSize: '16px', fill: '#ffffff' }).setOrigin(0, 0);
                option.setInteractive({ useHandCursor: true });
                option.on('pointerdown', () => {
                    this.selectCharacter(dropdown, character);
                });
                dropdown.add(option);
            });
        }
    }

    selectCharacter(dropdown, character) {
        dropdown.removeAll(true);
        const background = this.add.rectangle(0, 0, 200, 30, 0x000000).setOrigin(0, 0);
        const text = this.add.text(10, 5, character.name, { fontSize: '16px', fill: '#ffffff' });
        dropdown.add([background, text]);
        dropdown.selectedCharacter = character;
        background.setInteractive({ useHandCursor: true });
        background.on('pointerdown', () => {
            this.toggleDropdown(dropdown, characters);
        });
    }

    getSelectedCharacter(id) {
        return this[id].selectedCharacter;
    }
    
}