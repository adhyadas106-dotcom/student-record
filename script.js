// Load records from localStorage on initial page load
document.addEventListener("DOMContentLoaded", loadStudents);

function addStudent(){

let studentIdInput = document.getElementById("studentIdInput");
let nameInput = document.getElementById("nameInput");
let courseInput = document.getElementById("courseInput");

let studentId = studentIdInput.value.trim();
let name = nameInput.value.trim();
let course = courseInput.value.trim();

    if(studentId === "" || name === "" || course === "")

{
        alert("Please fill all the form fields");
        return;
 }

    createStudentRow(studentId, name, course);
    saveStudentToStorage({ studentId, name, course });

    studentIdInput.value = "";
    nameInput.value = "";
    courseInput.value = "";
}

function createStudentRow(studentId, name, course) {
    let studentList = document.getElementById("studentList");
    let tr = document.createElement("tr");
    tr.className = "border-b hover:bg-indigo-50";
    tr.innerHTML = `
    
        <td class="p-3 font-semibold text-gray-700 id-text">${studentId}</td>
        <td class="p-3 text-gray-700 name-text">${name}</td>
        <td class="p-3 text-gray-700 course-text">${course}</td>
        <td class="p-3 flex justify-center gap-3 items-center">
            <button type="button" onclick="editStudent(this)">
                <img src="https://png.pngtree.com/png-clipart/20230817/original/pngtree-hand-writing-with-pen-rgb-color-icon-draw-icon-hold-vector-picture-image_11012821.png" width="32px" alt="edit">
            </button>
            <button type="button" onclick="deleteStudent(this)">
                <img src="https://cdn-icons-png.flaticon.com/512/5590/5590878.png" width="32px" alt="delete">
            </button>
        </td>
    `;
    studentList.appendChild(tr);
}
// edit button
function editStudent(button){
let tr = button.closest("tr");
    
let idSpan = tr.querySelector(".id-text");
let nameSpan = tr.querySelector(".name-text");
let courseSpan = tr.querySelector(".course-text");

let currentId = idSpan.textContent;
let currentName = nameSpan.textContent;
let currentCourse = courseSpan.textContent;

let newId = prompt("Enter Student ID", currentId);
let newName = prompt("Enter Student Name", currentName);
let newCourse = prompt("Enter Student Course", currentCourse);

    if(newId !== null && newId.trim() !== "" && 
       newName !== null && newName.trim() !== "" && 
       newCourse !== null && newCourse.trim() !== "")
    {
        idSpan.textContent = newId.trim();
        nameSpan.textContent = newName.trim();
        courseSpan.textContent = newCourse.trim();

        updateLocalStorage();
    }
}
// delete buttn
function deleteStudent(button){
    let tr = button.closest("tr");
    tr.remove();
    updateLocalStorage();
}

// local strge
function saveStudentToStorage(student) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
}

function loadStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach(student => {
        createStudentRow(student.studentId, student.name, student.course);
    });
}
// to upadte
function updateLocalStorage() {
    let students = [];
    document.querySelectorAll("#studentList tr").forEach(tr => {
        let studentId = tr.querySelector(".id-text").textContent;
        let name = tr.querySelector(".name-text").textContent;
        let course = tr.querySelector(".course-text").textContent;
        students.push({ studentId, name, course });
    });
    localStorage.setItem("students", JSON.stringify(students));
}