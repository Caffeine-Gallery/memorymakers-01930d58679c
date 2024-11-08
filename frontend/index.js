import { backend } from 'declarations/backend';

let students = [];
const studentList = document.getElementById('studentList');
const addStudentBtn = document.getElementById('addStudentBtn');
const studentModal = new bootstrap.Modal(document.getElementById('studentModal'));
const studentForm = document.getElementById('studentForm');
const saveStudentBtn = document.getElementById('saveStudent');
const loadingSpinner = document.getElementById('loading');

function showLoading() {
  loadingSpinner.classList.remove('d-none');
}

function hideLoading() {
  loadingSpinner.classList.add('d-none');
}

async function loadStudents() {
  showLoading();
  try {
    students = await backend.getAllStudents();
    renderStudents();
  } catch (error) {
    console.error('Error loading students:', error);
  } finally {
    hideLoading();
  }
}

function renderStudents() {
  studentList.innerHTML = '';
  students.forEach(student => {
    const studentCard = document.createElement('div');
    studentCard.className = 'col-md-4 mb-4';
    studentCard.innerHTML = `
      <div class="card">
        <img src="${student.photoUrl}" class="card-img-top" alt="${student.name}">
        <div class="card-body">
          <h5 class="card-title">${student.name}</h5>
          <p class="card-text">Grade: ${student.grade}</p>
          <p class="card-text"><em>"${student.quote}"</em></p>
          <button class="btn btn-sm btn-primary edit-student" data-id="${student.id}">Edit</button>
        </div>
      </div>
    `;
    studentList.appendChild(studentCard);
  });
}

function clearForm() {
  studentForm.reset();
  document.getElementById('studentId').value = '';
}

addStudentBtn.addEventListener('click', () => {
  clearForm();
  document.getElementById('studentModalLabel').textContent = 'Add Student';
  studentModal.show();
});

studentList.addEventListener('click', async (e) => {
  if (e.target.classList.contains('edit-student')) {
    const studentId = parseInt(e.target.dataset.id);
    showLoading();
    try {
      const student = await backend.getStudent(studentId);
      if (student) {
        document.getElementById('studentId').value = student.id;
        document.getElementById('name').value = student.name;
        document.getElementById('grade').value = student.grade;
        document.getElementById('photoUrl').value = student.photoUrl;
        document.getElementById('quote').value = student.quote;
        document.getElementById('studentModalLabel').textContent = 'Edit Student';
        studentModal.show();
      }
    } catch (error) {
      console.error('Error fetching student:', error);
    } finally {
      hideLoading();
    }
  }
});

saveStudentBtn.addEventListener('click', async () => {
  const studentId = document.getElementById('studentId').value;
  const name = document.getElementById('name').value;
  const grade = parseInt(document.getElementById('grade').value);
  const photoUrl = document.getElementById('photoUrl').value;
  const quote = document.getElementById('quote').value;

  showLoading();
  try {
    if (studentId) {
      await backend.updateStudent(parseInt(studentId), name, grade, photoUrl, quote);
    } else {
      await backend.addStudent(name, grade, photoUrl, quote);
    }
    await loadStudents();
    studentModal.hide();
  } catch (error) {
    console.error('Error saving student:', error);
  } finally {
    hideLoading();
  }
});

loadStudents();
