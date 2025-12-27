document.addEventListener('DOMContentLoaded', function () {
    // Initialize course data
    loadCourses();

    const courseForm = document.getElementById('courseForm');
    courseForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const courseData = {
            course_title: document.getElementById('courseTitle').value,
            section: document.getElementById('section').value,
            instructor: document.getElementById('instructor').value,
            timeslot: document.getElementById('timeslot').value,
            room: document.getElementById('room').value,
        };

        // POST request to add course
        fetch('/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Course added:', data);
            loadCourses(); // Reload the courses after adding
        })
        .catch(error => console.error('Error adding course:', error));
    });
});

// Load all courses
function loadCourses() {
    fetch('/api/courses')
        .then(response => response.json())
        .then(courses => {
            const tableBody = document.getElementById('courseTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear current table
            courses.forEach(course => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${course.course_title}</td>
                    <td>${course.section}</td>
                    <td>${course.instructor}</td>
                    <td>${course.timeslot}</td>
                    <td>${course.room}</td>
                    <td><button onclick="deleteCourse('${course._id}')">Delete</button></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading courses:', error));
}

// Delete course
function deleteCourse(courseId) {
    fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
        loadCourses(); // Reload courses after deletion
    })
    .catch(error => console.error('Error deleting course:', error));
}
