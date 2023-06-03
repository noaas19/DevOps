
const port = 3000;
const express = require('express');
const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://devops:devops1234@devops.wbacnkc.mongodb.net/devops?retryWrites=true&w=majority';
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
const Student = require('./modules/student');
app.use(express.json());

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((result) => setTimeout(() => {
    console.log('Server started:)!');
}, 1000))

    .catch((error) => { console.error(error); });

app.post('/savestudent', (req, res) => {
    // Extract the values from the request body
    const { name, exam1, exam2, exam3 } = req.body;

    // Create a new Student document
    const student = new Student({
        name,
        exam1,
        exam2,
        exam3,
    });

    // Save the student document to the database
    student
        .save()
        .then(() => {
            res.json({ message: 'Student saved successfully!' });

        })
        .catch((error) => {
            res.status(500).send('Error saving student: ' + error);
        });
});

app.get('/', (req, res) => {
    res.render('register');
})

app.get('/test', (req, res) => {
    res.send('Test hello')
})

module.exports = app;