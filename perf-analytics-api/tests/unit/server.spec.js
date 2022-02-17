const app = require('../../server');
const request = require('supertest');

describe('API Endpoint Controls', () => {

  it('should run / GET method with valid params', async () => {
    const res = await request(app).get('/').query({
      beginTime: 1600704587044,
      endTime: 1700704587044
    })
    expect(res.statusCode).toEqual(200);
  });

  it('should run / GET method without params', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(500);
  });

  it('should run / POST method with body', async () => {
    const res = await request(app).post('/').send([ {
      url: 'http://localhost:3002/',
      analyticType: 'navigation',
      time: '370.11',
      startTime: '0.00',
    } ])
    expect(res.statusCode).toEqual(200);
  });

  it('should run / POST method with body and / GET posted data', async () => {

    let expectedDocument = false;

    await request(app).post('/').send([ {
      url: 'http://localhost:3002/',
      analyticType: 'navigation',
      time: '370.11',
      startTime: '0.00',
    } ])

    const getResponse = await request(app).get('/').query({
      beginTime: new Date(new Date().getTime() - (30 * 60 * 1000)).getTime(),
      endTime: new Date().getTime()
    });

    getResponse.body.forEach(doc => {
      if (
        doc.url === "http://localhost:3002/" &&
        doc.analyticType === "navigation" &&
        doc.time === "370.11" &&
        doc.startTime === "0.00"
      ) expectedDocument = true;
    });

    expect(expectedDocument).toEqual(true);
  });

  it('should run / POST method with invalid body', async () => {
    const res = await request(app).post('/').send([ {
      analyticType: 'navigation',
      time: '370.11',
      startTime: '0.00',
      createdAt: 1600898041652,
    } ])
    expect(res.statusCode).toEqual(500);
  });

  it('should run / POST method without body', async () => {
    const res = await request(app).post('/')
    expect(res.statusCode).toEqual(500);
  });

  it('should run / PUT method', async () => {
    const res = await request(app).put('/')
    expect(res.statusCode).toEqual(405);
  });

  it('should run / DELETE method', async () => {
    const res = await request(app).delete('/')
    expect(res.statusCode).toEqual(405);
  });
})
