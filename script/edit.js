"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const healthyBtn = document.getElementById("healthy-btn");

const tableBodyEl = document.getElementById("tbody");
const submitBtn = document.getElementById("submit-btn");
const formEl = document.getElementById("container-form");

// hiển thị thú cưng
const petArr = getFromStorage("petArr", []);
renderTableData(petArr);

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${petArr[i].id}</th>
      <td>${petArr[i].name}</td>
      <td>${petArr[i].age}</td>
      <td>${petArr[i].type}</td>
      <td>${petArr[i].weight} kg</td>
      <td>${petArr[i].length} cm</td>
      <td>${petArr[i].breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color:${petArr[i].color}"></i>
      </td>
      <td><i class="bi ${
        petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
      } "></i></td>
      <td><i class="bi ${
        petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
      } "></i></td>
      <td><i class="bi ${
        petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
      } "></i></td>
      <td>${formatDate(petArr[i].date)}</td>
      <td>
        <button class="btn btn-warning" onclick="editPet('${
          petArr[i].id
        }')">Edit</button>
      </td>
    `;
    tableBodyEl.appendChild(row);
  }
}

function formatDate(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  }
  return "";
}

// ham chinh sua thoong tin
function editPet(id) {
  //hiển thị lại form nhâp liệu
  formEl.classList.remove("hide");
  // tìm đến pet cần chỉnh sửa
  const pet = petArr.find((petItem) => petItem.id === id);

  // hiển thị thông tin lên form nhâp
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  colorInput.value = pet.color;
  lengthInput.value = pet.length;
  weightInput.value = pet.weight;
  vaccinatedInput.checked = pet.vaccinated;
  sterilizedInput.checked = pet.sterilized;
  dewormedInput.checked = pet.dewormed;

  // hiển thị lại các loại cho meo
  renderBreed();

  breedInput.value = `${pet.breed}`;
}
// bắt sự kiện vào nút input hiển thị dog - cat
typeInput.addEventListener("click", renderBreed);

// Khai báo biến breedArr và gán giá trị từ LocalStorage

// Lấy dữ liệu Breed từ LocalStorage
function getBreedsFromStorage() {
  const breedsData = localStorage.getItem("breeds");
  return breedsData ? JSON.parse(breedsData) : [];
}

// Lưu dữ liệu Breed vào LocalStorage
function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

let breedArr = getBreedsFromStorage();

// Hàm hiển thị danh sách Breed
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";

  const breedDogs = breedArr.filter((item) => item.type === "Dog");
  const breedCats = breedArr.filter((item) => item.type === "Cat");

  if (typeInput.value === "Dog") {
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");

      option.innerHTML = `${breedItem.name}`;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.name}`;
      breedInput.appendChild(option);
    });
  }
}

submitBtn.addEventListener("click", function () {
  // lấy ra dữ liệu
  const data = {
    id: idInput.value,
    name: nameInput.value,
    type: typeInput.value,
    age: parseInt(ageInput.value),
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  // kiểm tra dữ liệu đầu vào.
  //them thu cung vao danh sach va hien thi
  const validate = validateData(data);

  if (validate) {
    // tìm số pet có id trùng với data
    const index = petArr.findIndex((pet) => pet.id === data.id);
    // ghi đè dữ liệu mới lên
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});
//kiểm tra điều kiện
function validateData(data) {
  let isValidate = true;

  //kiem tra cac dieu kien
  if (data.id.trim() === "") {
    alert("ID must be unique!");
    isValidate = false;
  }
  if (data.name.trim() === "") {
    alert("name must be unique!");
    isValidate = false;
  }
  if (isNaN(data.age)) {
    alert("vui lòng nhập tuổi ");
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert("vui lòng nhập cân nặng");
    isValidate = false;
  }
  if (isNaN(data.length)) {
    alert("vui lòng nhập kích thước của pet");
    isValidate = false;
  }
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }
  if (data.breed === "Select Breed") {
    alert("Please select breed!");
    isValidate = false;
  }
  if (data.weight < 1 || data.weight > 15) {
    alert("weight must be between 1 and 15!");
    isValidate = false;
  }
  if (data.length < 1 || data.length > 100) {
    alert("length must be between 1 and 100!");
    isValidate = false;
  }

  if (data.age < 1 || data.age > 15) {
    alert("age must be between 1 and 15!");
    isValidate = false;
  }

  return isValidate;
}
