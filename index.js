
const port = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://devops:devops1234@devops.cklki5a.mongodb.net/devops?retryWrites=true&w=majority';
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
const Student = require('./modules/student');
// Middleware to parse JSON request bodies
app.use(express.json());

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((result) => app.listen(port, () => {
    console.log('Server started:)!')
}))
    .catch((error) => console.error(error));

app.post('/savestudent', (req, res) => {
    // Extract the values from the request body
    const { name, exam1, exam2, exam3 } = req.body;
  

    // Validate the name field (only letters)
    // const nameRegex = /^[A-Za-z]+$/;
    // if (!nameRegex.test(name)) {
    //   return res.status(400).send('Name should only contain letters');
    // }

    // Validate the other fields (only numbers)
    // if (isNaN(Number(exam1)) || isNaN(Number(exam2)) || isNaN(Number(exam3))) {
    //   return res.status(400).send('Exam scores should only contain numbers');
    // }

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