import { Game } from 'phaser';
import { Preloader } from './scenes/Preloader.js';
import { Start } from './scenes/Start.js';
import { Battle } from './scenes/Battle';

const config = {
    type: Phaser.AUTO,
    title: 'TSBGFM',
    description: '',
    parent: 'game-container',
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    scene: [
        Preloader,
        Start,
        Battle
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    audio: {
        noAudio: true
    }
}

new Phaser.Game(config);
            