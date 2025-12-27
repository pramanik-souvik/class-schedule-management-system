const form = document.getElementById('scheduleForm');
const tableBody = document.getElementById('tableBody');
const alertBox = document.getElementById('alertBox');
const emptyMsg = document.getElementById('emptyMsg');

let scheduleData = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const entry = {
        id: Date.now(),
        course: course.value,
        section: section.value,
        instructor: instructor.value,
        timeslot: timeslot.value,
        room: room.value
    };

    let conflictMsg = "";

    if (entry.course.includes("Lab") && !entry.room.includes("Lab")) {
        conflictMsg = "⚠ Lab course must be in Lab room!";
    }

    scheduleData.forEach(item => {
        if (item.timeslot === entry.timeslot) {
            if (item.instructor === entry.instructor)
                conflictMsg = "⚠ Instructor already booked!";
            if (item.room === entry.room)
                conflictMsg = "⚠ Room already booked!";
        }
    });

    if (conflictMsg) {
        alertBox.innerText = conflictMsg;
        alertBox.style.display = "block";
        return;
    }

    alertBox.style.display = "none";
    scheduleData.push(entry);
    renderTable();
    form.reset();
});

function renderTable() {
    tableBody.innerHTML = "";
    emptyMsg.style.display = scheduleData.length ? "none" : "block";

    scheduleData.forEach(item => {
        tableBody.innerHTML += `
        <tr>
            <td>${item.course}</td>
            <td>${item.section}</td>
            <td>${item.instructor}</td>
            <td>${item.timeslot}</td>
            <td>${item.room}</td>
            <td><span class="status">Validated</span></td>
            <td><button class="btn btn-danger" onclick="deleteEntry(${item.id})">Delete</button></td>
        </tr>`;
    });
}

function deleteEntry(id) {
    scheduleData = scheduleData.filter(item => item.id !== id);
    renderTable();
}

function filterTable() {
    const input = searchInput.value.toUpperCase();
    Array.from(tableBody.rows).forEach(row => {
        row.style.display = row.textContent.toUpperCase().includes(input) ? "" : "none";
    });
}
