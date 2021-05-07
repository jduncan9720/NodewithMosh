const Joi = require('joi');
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    {
        id: 1,
        name: "Course 1"
    },
    {
        id: 2,
        name: "Course 2"
    },
    {
        id: 3,
        name: "Course 3"
    },
]

app.get('/', (req, res) => {
    res.send("Hello World!!!!")
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('No course with this id')
    res.send(course);
})

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    const newCourse = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(newCourse);
    res.send(newCourse)
})

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('No course with this id')

    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    course.name = req.body.name
    res.send(course);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}