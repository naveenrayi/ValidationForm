
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmpassword = document.getElementById("confirmpassword");
const root = document.getElementById("root");
let submitted = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validInputs();
});

const setError = (element, message) => {
  const inpControls = element.parentElement;
  const errorDisplay = inpControls.querySelector(".error");
  errorDisplay.innerHTML = message;
};

const setSuccess = (element) => {
  const inpControls = element.parentElement;
  const errorDisplay = inpControls.querySelector(".error");
  errorDisplay.innerHTML = "";
};

const validName = (name) => /^[A-Za-z ]+$/.test(name);
const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validPassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/.test(password);

const validInputs = () => {
  const userName = username.value.trim();
  const Email = email.value.trim();
  const Password = password.value.trim();
  const ConfirmPassword = confirmpassword.value.trim();
  let valid = true;

  if (userName === "") {
    setError(username, "Enter name");
    valid = false;
  } else if (!validName(userName)) {
    setError(username, "Only letters allowed");
    valid = false;
  } else {
    setSuccess(username);
  }

  if (Email === "") {
    setError(email, "Enter email");
    valid = false;
  } else if (!validEmail(Email)) {
    setError(email, "Invalid email");
    valid = false;
  } else {
    setSuccess(email);
  }

  if (Password === "") {
    setError(password, "Enter password");
    valid = false;
  } else if (!validPassword(Password)) {
    setError(password, "Enter Strong password");
    valid = false;
  } else {
    setSuccess(password);
  }

  if (ConfirmPassword === "") {
    setError(confirmpassword, "Enter confirm password");
    valid = false;
  } else if (ConfirmPassword !== Password) {
    setError(confirmpassword, "Password Mismatch");
    valid = false;
  } else {
    setSuccess(confirmpassword);
  }

  if (valid && !submitted) {
    appendTableData(userName, Email, Password);
    submitted = true;
    form.reset();
  }
};

const appendTableData = (name, email, password) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${name}</td>
    <td>${email}</td>
    <td>${password}</td>
    <td><button onclick='delRow(this)'>Delete</button></td>`;
  root.appendChild(newRow);
};

function delRow(btn) {
  btn.closest("tr").remove();
  submitted = false;
}


document.getElementById("xlsx").addEventListener("click", function () {
  const table = document.getElementById("userTable");
  const wb = XLSX.utils.table_to_book(table);
  XLSX.writeFile(wb, "form.xlsx");
});


document.getElementById("pdf").addEventListener("click", function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const table = document.getElementById("userTable");

  doc.autoTable({
    html: table,
    headStyles: { fillColor: [0, 100, 200] },
  });

  doc.save("form.pdf");
});
