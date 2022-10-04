import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/modelUser';

import { Response } from 'superagent';
chai.use(chaiHttp);

const { expect } = chai;
describe('/teams', () => {
  let chaiHttpResponse: Response;

    describe('testa quando os dados sao enviados corretamente', () => {
      it('a rota tem retorno 200 e entrega um array de times para o usuário', async () => {
        const response = await chai.request(app).get('/teams')
           expect(response.status).to.equal(200);
           expect(response.body).to.be.an('array');

      });

    });

});
