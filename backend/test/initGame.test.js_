import { expect } from 'chai';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../server.js'; // Assuming your Express app is exported from server.js
import Char from '../models/char.js';
import Game from '../models/game.js';

describe('InitGame', () => {
    before(async () => {
        // await mongoose.connect('mongodb://localhost:27017/TSBGFM', {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // });

        // Clean up the collections before each test
        // await Char.deleteMany({});
        // await Game.deleteMany({});
    });

    after(async () => {
        // await mongoose.connection.close();
    });

    it('should initialize a new game with two characters', async () => {
        const response = await request(app)
            .post('/api/initGame')
            .send({ charNames: ['Player A', 'Player B'] });

        console.log(response);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('gameNumber');
        expect(response.body).to.have.property('board');
        expect(response.body).to.have.property('chars');

        const { chars } = response.body;

        expect(chars).to.be.an('array').that.has.lengthOf(2);

        // const playerA = chars.find(char => char.name === 'Player A');
        // const playerB = chars.find(char => char.name === 'Player B');

        // expect(playerA).to.have.property('name', 'Player A');
        // expect(playerA).to.have.property('life', 100);
        // expect(playerA).to.have.property('armor', 10);
        // expect(playerA.weapon).to.have.property('name', 'Sword');
        // expect(playerA.weapon).to.have.property('damage', 10);
        // expect(playerA.weapon).to.have.property('type', 'Sword');

        // expect(playerB).to.have.property('name', 'Player B');
        // expect(playerB).to.have.property('life', 100);
        // expect(playerB).to.have.property('armor', 10);
        // expect(playerB.weapon).to.have.property('name', 'Axe');
        // expect(playerB.weapon).to.have.property('damage', 12);
        // expect(playerB.weapon).to.have.property('type', 'Axe');
    });
});