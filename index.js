let savedData = JSON.parse(localStorage.getItem('registrationData')) || [];

let table = document.getElementById('registration-table');
let tbody = table.getElementsByTagName('tbody')[0];

for (let i = 0; i < savedData.length; i++) {
  let row = document.createElement('tr');

  let firstNameCell = document.createElement('td');
  let lastNameCell = document.createElement('td');
  let emailCell = document.createElement('td');
  let phoneCell = document.createElement('td');
  let editCell = document.createElement('td');
  let deleteCell = document.createElement('td');

  firstNameCell.innerText = savedData[i].firstName;
  lastNameCell.innerText = savedData[i].lastName;
  emailCell.innerText = savedData[i].email;
  phoneCell.innerText = savedData[i].phone;

  let editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.onclick = createEditHandler(i);
  editCell.appendChild(editButton);

  let deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.onclick = createDeleteHandler(i);
  deleteCell.appendChild(deleteButton);

  row.appendChild(firstNameCell);
  row.appendChild(lastNameCell);
  row.appendChild(emailCell);
  row.appendChild(phoneCell);
  row.appendChild(editCell);
  row.appendChild(deleteCell);

  tbody.appendChild(row);
}

function createEditHandler(index) {
  return function () {
    savedData = JSON.parse(localStorage.getItem('registrationData')) || [];
    let row = table.rows[index + 1];
    let firstNameCell = row.cells[0];
    let lastNameCell = row.cells[1];
    let emailCell = row.cells[2];
    let phoneCell = row.cells[3];

    let firstNameInput = document.createElement('input');
    firstNameInput.type = 'text';
    firstNameInput.value = firstNameCell.innerText;

    let lastNameInput = document.createElement('input');
    lastNameInput.type = 'text';
    lastNameInput.value = lastNameCell.innerText;

    let emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.value = emailCell.innerText;

    let phoneInput = document.createElement('input');
    phoneInput.type = 'number';
    phoneInput.value = phoneCell.innerText;

    firstNameCell.innerText = '';
    firstNameCell.appendChild(firstNameInput);

    lastNameCell.innerText = '';
    lastNameCell.appendChild(lastNameInput);

    emailCell.innerText = '';
    emailCell.appendChild(emailInput);

    phoneCell.innerText = '';
    phoneCell.appendChild(phoneInput);

    let editButton = row.cells[4].getElementsByTagName('button')[0];
    editButton.innerText = 'Save';
    editButton.onclick = createSaveHandler(index);

    let deleteButton = row.cells[5].getElementsByTagName('button')[0];
    deleteButton.disabled = true;
  };
}

function createSaveHandler(index) {
  return function () {
    savedData = JSON.parse(localStorage.getItem('registrationData')) || [];
    let row = table.rows[index + 1]; 
    let firstNameInput = row.cells[0].getElementsByTagName('input')[0];
    let lastNameInput = row.cells[1].getElementsByTagName('input')[0];
    let emailInput = row.cells[2].getElementsByTagName('input')[0];
    let phoneInput = row.cells[3].getElementsByTagName('input')[0];

    let firstName = firstNameInput.value;
    let lastName = lastNameInput.value;
    let email = emailInput.value;
    let phone = phoneInput.value;

    let errors = [];

    if (firstName === '') {
      errors.push('First name is required.');
    }

    if (lastName === '') {
      errors.push('Last name is required.');
    }

    if (email === '') {
      errors.push('Email is required.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push('Email is invalid.');
    }

    if (phone === '') {
      errors.push('Phone number is required.');
    } else if (!/^\d{10}$/.test(phone)) {
      errors.push('Phone number is invalid. Must be 10 digits.');
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    savedData[index].firstName = firstName;
    savedData[index].lastName = lastName;
    savedData[index].email = email;
    savedData[index].phone = phone;

    localStorage.setItem('registrationData', JSON.stringify(savedData));

    firstNameInput.parentNode.innerText = firstName;
    lastNameInput.parentNode.innerText = lastName;
    emailInput.parentNode.innerText = email;
    phoneInput.parentNode.innerText = phone;

    let editButton = row.cells[4].getElementsByTagName('button')[0];
    editButton.innerText = 'Edit';
    editButton.onclick = createEditHandler(index);

    let deleteButton = row.cells[5].getElementsByTagName('button')[0];
    deleteButton.disabled = false;
  };
}

function createDeleteHandler(index) {
  return function () {
    savedData = JSON.parse(localStorage.getItem('registrationData')) || [];
    savedData.splice(index, 1);
    localStorage.setItem('registrationData', JSON.stringify(savedData));
    table.deleteRow(index + 1); 
  };
}
function clearFormInputs() {
  let form = document.getElementById('registration-form');
  form.reset();
}

function clearTableRows() {
  let tableRows = table.rows.length;
  for (let i = tableRows - 1; i > 0; i--) {
    table.deleteRow(i);
  }
}

function populateTable(savedData) {
  for (let i = 0; i < savedData.length; i++) {
    let row = table.insertRow(-1);
    let firstNameCell = row.insertCell(0);
    let lastNameCell = row.insertCell(1);
    let emailCell = row.insertCell(2);
    let phoneCell = row.insertCell(3);
    let editCell = row.insertCell(4);
    let deleteCell = row.insertCell(5);

    firstNameCell.innerText = savedData[i].firstName;
    lastNameCell.innerText = savedData[i].lastName;
    emailCell.innerText = savedData[i].email;
    phoneCell.innerText = savedData[i].phone;

    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.onclick = createEditHandler(i);

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = createDeleteHandler(i);

    editCell.appendChild(editButton);
    deleteCell.appendChild(deleteButton);
  }
}

let form = document.getElementById('registration-form');
form.onsubmit = function (event) {
  event.preventDefault();

  let savedData = JSON.parse(localStorage.getItem('registrationData')) || [];

  let firstName = form.elements['first-name'].value.trim();
  let lastName = form.elements['last-name'].value.trim();
  let email = form.elements['email'].value.trim();
  let phone = form.elements['phone'].value.trim();

  let errors = [];

  if (firstName === '') {
    errors.push('First name is required.');
  }

  if (lastName === '') {
    errors.push('Last name is required.');
  }

  if (email === '') {
    errors.push('Email is required.');
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push('Email is invalid.');
  }

  if (phone === '') {
    errors.push('Phone number is required.');
  } else if (!/^\d{10}$/.test(phone)) {
    errors.push('Phone number is invalid. Must be 10 digits.');
  }

  if (errors.length > 0) {
    alert(errors.join('\n'));
    return;
  }

  savedData.push({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
  });

  localStorage.setItem('registrationData', JSON.stringify(savedData));

  clearTableRows();
  populateTable(savedData);
  clearFormInputs();
};

savedData = JSON.parse(localStorage.getItem('registrationData')) || [];
populateTable(savedData);