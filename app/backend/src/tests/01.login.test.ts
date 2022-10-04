import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/modelUser';

import { Response } from 'superagent';

chai.use(chaiHttp);

// console.log();

const { expect } = chai;

const mockLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

describe('/login', () => {
  let chaiHttpResponse: Response;


  before( async () => {
  sinon.stub(User, "findOne").resolves({
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  } as User);
  });
  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });
    describe('testa quando os dados sao enviados corretamente', () => {
      it('a rota tem retorno 200 e entrega o token para o usuário', async () => {
        const response = await chai.request(app).post('/login').send(mockLogin)
        
           expect(response.status).to.equal(200);
           expect(response.body).to.have.property('token')
        // expect(...)
      });
    })
    describe('testa quando existem dados incorretos', () => {
      it('a rota tem retorno 401 e envia uma mensagem de erro quando a senha estiver incorreta', async() => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'admin',
        })
        
        expect(response.status).to.equal(401);
        expect(response.body).to.have.property('message')
      });
      it('a rota tem retorno 400 e envia uma mensagem de erro quando os campos nao estao preenchidos', async() => {
        const response = await chai.request(app).post('/login').send({
          email: '',
          password: 'secret_admin',
        })
        
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('message')
      })
    })
});
