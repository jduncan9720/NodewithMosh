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
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema);
    console.log(result)
    
    if(!req.body.name || req.body.length < 3) {
        res.status(400).send('Name is required and 3 characters.')
        return;
    }

   const course =  courses.find(c => c.id === parseInt(req.params.id));
   if (!course) res.status(404).send('No course with this id')
   res.send(course);
})

app.post('/api/courses', (req, res) => {
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(newCourse);
    res.send(newCourse)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Listening on port ${port}...`)
})