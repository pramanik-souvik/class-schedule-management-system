const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/csms');

// Course Model
const courseSchema = new mongoose.Schema({
    course_title: String,
    section: String,
    instructor: String,
    timeslot: String,
    room: String,
});

const Course = mongoose.model('Course', courseSchema);

// Routes
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/api/courses', async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.delete('/api/courses/:id', (req, res) => {
    Course.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Course deleted successfully' });
    });
});

// Serve the index.html file when the root path is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
