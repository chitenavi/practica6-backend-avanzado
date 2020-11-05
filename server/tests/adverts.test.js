require('dotenv').config();
const fs = require('fs');
const requestApi = require('supertest')('http://localhost:3000/api/v1');

const { expect } = require('chai');

describe('GET /adverts', () => {
  it('requires authentication', async () => {
    const response = await requestApi.get('/adverts');

    expect(response.status).to.eql(401);
    expect(response.body.message).to.eql('No token provided');
  });

  it('authenticate no send email or password', async () => {
    const authResponse = await requestApi.post('/users/authenticate');

    expect(authResponse.status).to.eql(400);
    expect(authResponse.body.message).to.eql(
      'Please provide email and password!'
    );
  });

  it('authenticate with invalid credentials', async () => {
    const authResponse = await requestApi
      .post('/users/authenticate')

      .send({
        email: 'noemail@regitered.com',
        password: 'or_bad_password',
      });

    expect(authResponse.status).to.eql(401);
    expect(authResponse.body.message).to.eql('Invalid credentials');
  });

  it('authenticate and get all adverts', async () => {
    const authResponse = await requestApi
      .post('/users/authenticate')

      .send({
        email: process.env.DEV_USER_EMAIL,
        password: process.env.DEV_USER_PASS,
      });
    //console.log(authResponse);
    expect(authResponse.status).to.eql(200);

    const advResponse = await requestApi
      .get('/adverts')
      .set('Authorization', authResponse.body.token);

    //console.log(advResponse);
    expect(advResponse.status).to.eql(200);
  });

  it('get invalid route to th API', async () => {
    const authResponse = await requestApi
      .post('/users/authenticate')

      .send({
        email: process.env.DEV_USER_EMAIL,
        password: process.env.DEV_USER_PASS,
      });
    //console.log(authResponse);
    expect(authResponse.status).to.eql(200);

    const apiResponse = await requestApi
      .get('/novalidroute')
      .set('Authorization', authResponse.body.token);

    expect(apiResponse.status).to.eql(404);
  });

  it('get an advert with invalid id', async () => {
    const authResponse = await requestApi
      .post('/users/authenticate')

      .send({
        email: process.env.DEV_USER_EMAIL,
        password: process.env.DEV_USER_PASS,
      });
    //console.log(authResponse);
    expect(authResponse.status).to.eql(200);

    const apiResponse = await requestApi
      .get('/adverts/novalidid')
      .set('Authorization', authResponse.body.token);

    expect(apiResponse.status).to.eql(404);
  });
});

describe('POST /adverts', () => {
  it('create advert without mandatory camps', async () => {
    const authResponse = await requestApi
      .post('/users/authenticate')

      .send({
        email: process.env.DEV_USER_EMAIL,
        password: process.env.DEV_USER_PASS,
      });

    expect(authResponse.status).to.eql(200);

    const advCreateResponse = await requestApi
      .post('/adverts')
      .set('Authorization', authResponse.body.token)
      .send({});

    // console.log(advCreateResponse);
    expect(advCreateResponse.status).to.eql(422);
  });

  it('create advert with all camps, update and delete it', async () => {
    const authResponse = await requestApi
      .post('/users/authenticate')

      .send({
        email: process.env.DEV_USER_EMAIL,
        password: process.env.DEV_USER_PASS,
      });

    expect(authResponse.status).to.eql(200);

    // Create an advert
    const advCreateResponse = await requestApi
      .post('/adverts')
      .set('Authorization', authResponse.body.token)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('name', 'Impresora Zebra GX-430T')
      .field('price', '185')
      .field(
        'description',
        'La compacta impresora de sobremesa Zebra GX-430T, proporciona la mejor velocidad y prestaciones en su categoría'
      )
      .field('tags', 'work')
      .field('sale', 'true')
      .attach(
        'image',
        fs.readFileSync('./public/img/test-img.jpg'),
        'test-img.jpg'
      );

    expect(advCreateResponse.body).to.be.an('object');
    expect(advCreateResponse.status).to.eql(201);
    expect(advCreateResponse.body.data).to.have.property('advert');

    const newAdvId = advCreateResponse.body.data.advert._id;

    // Update the advert created just now
    const advUpdateResponse = await requestApi
      .put(`/adverts/${newAdvId}`)
      .set('Authorization', authResponse.body.token)
      .send({
        name: 'New Impresora Zebra GX-430T',
        price: 352,
      });

    expect(advUpdateResponse.body).to.be.an('object');
    expect(advUpdateResponse.status).to.eql(200);
    expect(advUpdateResponse.body.data.advert.name).to.eql(
      'New Impresora Zebra GX-430T'
    );
    expect(advUpdateResponse.body.data.advert.price).to.eql(352);

    // Delete the advert
    const advDeleteResponse = await requestApi
      .delete(`/adverts/${newAdvId}`)
      .set('Authorization', authResponse.body.token);

    expect(advDeleteResponse.status).to.eql(204);

    // Check if advert is deleted
    const advCheckResponse = await requestApi
      .get(`/adverts/${newAdvId}`)
      .set('Authorization', authResponse.body.token);

    expect(advCheckResponse.body.data.advert).to.eql(null);
  });
});

describe('GET /tags', () => {
  it('get all exist advert tags in DB', async () => {
    const authResponse = await requestApi
      .post('/users/authenticate')

      .send({
        email: process.env.DEV_USER_EMAIL,
        password: process.env.DEV_USER_PASS,
      });

    expect(authResponse.status).to.eql(200);

    const tagsResponse = await requestApi
      .get(`/adverts/tags`)
      .set('Authorization', authResponse.body.token);

    expect(tagsResponse.status).to.eql(200);
    expect(tagsResponse.body.data).to.have.property('tags');
  });
});
