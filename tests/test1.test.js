// Import necessary dependencies and modules
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Student = require('../modules/student');

// Connect to the test database before running the tests
beforeAll(async () => {
  const dbURL = 'mongodb+srv://devops:devops1234@devops.wbacnkc.mongodb.net/devops?retryWrites=true&w=majority';
  await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Disconnect from the test database after running the tests
afterAll(async () => {
  await mongoose.connection.close();
});

// Clear the student collection before each test
beforeEach(async () => {
  await Student.deleteMany({});
});

// Test the POST /savestudent endpoint
describe('POST /savestudent', () => {
  test('should save a new student to the database', async () => {
    const response = await request(app)
      .post('/savestudent')
      .send({
        name: 'John Doe',
        exam1: 90,
        exam2: 85,
        exam3: 95,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Student saved successfully!');

    const savedStudent = await Student.findOne({ name: 'John Doe' });
    expect(savedStudent).toBeTruthy();
    expect(savedStudent.exam1).toBe(90);
    expect(savedStudent.exam2).toBe(85);
    expect(savedStudent.exam3).toBe(95);
  });

  test('should return an error if saving the student fails', async () => {
    // Force a save error by providing an invalid student document
    const response = await request(app)
      .post('/savestudent')
      .send({});

    expect(response.status).toBe(500);
    expect(response.text).toContain('Error saving student:');
  });
});

// Test the GET / endpoint
describe('GET /', () => {
  test('should render the register view', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Register');
  });
});

// Test the GET /test endpoint
describe('GET /test', () => {
  test('should return "Test hello"', async () => {
    const response = await request(app).get('/test');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Test hello');
  });
});
