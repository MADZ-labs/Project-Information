const request = require('supertest');
const app = require('../index.js');
const db = require('../../db/index.js');

describe('Check Default Endpoint', () => {
  it('should return status code of 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('Check fillCreators Endpoint', () => {
  it('should return status code 201', async () => {
    const response = await request(app).post('/fillCreators');
    expect(response.statusCode).toBe(201);
  });

  it('should fill creator tables with 100 rows', async () => {
    db.query('SELECT COUNT(*) as creatorsCount FROM creator', (err, data) => {
      if (err) {
        throw err;
      } else {
        expect(data[0].creatorsCount).toBe(100);
      }
    });
  });
});

describe('Check fillProjects Endpoint', () => {
  it('should return status code 201', async () => {
    const response = await request(app).post('/fillProjects');
    expect(response.statusCode).toBe(201);
  });

  it('should fill creator tables with 100 rows', async () => {
    db.query('SELECT COUNT(*) as projectCount FROM project', (err, data) => {
      if (err) {
        throw err;
      } else {
        expect(data[0].projectCount).toBe(100);
      }
    });
  });
});

describe('Check Project Endpoint', () => {
  it('should return status code of 200', async () => {
    const response = await request(app).get('/project/1');
    expect(response.statusCode).toBe(200);
  });

  it('should return necessary properties', async () => {
    const response = await request(app).get('/project/1');
    expect(response.body).toHaveProperty('Backers');
    expect(response.body).toHaveProperty('Category');
    expect(response.body).toHaveProperty('Company_Logo');
    expect(response.body).toHaveProperty('Company_Name');
    expect(response.body).toHaveProperty('Creator_ID');
    expect(response.body).toHaveProperty('Currently_Funded');
    expect(response.body).toHaveProperty('End_Date');
    expect(response.body).toHaveProperty('Funding_Goal');
    expect(response.body).toHaveProperty('Is_Followed');
    expect(response.body).toHaveProperty('Location');
    expect(response.body).toHaveProperty('Project_Description');
    expect(response.body).toHaveProperty('Project_Name');
    expect(response.body).toHaveProperty('Start_Date');
    expect(response.body).toHaveProperty('Video_Link');
    db.end();
  });
});
