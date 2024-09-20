import chaiHttp from 'chai-http';
import { app, server } from '../server.js';
import { use } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcrypt';
import { closeDatabaseConnection } from '../dbclient.js';

const chai = use(chaiHttp);
const expect = chai.expect;

describe('POST /login', () => {
  let dbClient;
  let queryStub;
  let mockUser;
  let requestBody;

  beforeEach(() => {
    dbClient = { query: sinon.stub() };
  });

  afterEach(() => {
      sinon.restore();
  });

  after((done) => {
      server.close(() => {
          console.log('Server closed');
          closeDatabaseConnection(done); // Close the database connection
      });
  });

  const arrangeUser = (paramUsername, paramPassword) => {
    mockUser = { id: 1, username: 'Robin', password: '$2a$12$zcBa9XMKK2V1OfZI4/O46eFOfAd3EHmKnfPGY55fsxMk/LXgxQDtO' };
    requestBody = { username: paramUsername, password: paramPassword }; // Use plain password for comparison
  };

  const stubDbQuery = (paramUsername, paramMockUser) => {
    queryStub = dbClient.query.withArgs('SELECT * FROM admins WHERE username = $1', [paramUsername]).yields(null, { rows: [paramMockUser] });
  }

  const stubBcryptPassword = (paramBoolean) => {
    const bcryptStub = sinon.stub(bcrypt, 'compare').yields(null, paramBoolean); // Simulate successful password comparison
  }

  it('should return status code 200 on valid login', (done) => {
      // Arrange
      arrangeUser('Robin', 'Test123');

      // Stub the database query response
      stubDbQuery(requestBody.username, mockUser);

      // Stub bcrypt.compare
      stubBcryptPassword(true);

      // Act
      const res = chai.request(app)
          .post('/login')
          .send(requestBody)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
  });

  it('Should return status code 401 on wrong credentials', (done) => {
    // Arrange
    arrangeUser('Robin', 'Test124');

    // Stub the database query response
    stubDbQuery(requestBody.username, null);

    // Stub bcrypt.compare
    stubBcryptPassword(false);

    // Act
    const res = chai.request(app)
        .post('/login')
        .send(requestBody)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
  });
});