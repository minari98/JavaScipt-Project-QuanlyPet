"use strict";

//Lấy ra các DOM Element cần sử dụng

const submitBtn = document.getElementById("submit-btn");
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
const bmiCalc = document.getElementById("calculate-bmi-btn");
const tableBodyEl = document.getElementById("tbody");

// Thay đổi khai báo mảng petArr để lấy dữ liệu từ LocalStorage
const petArr = getFromStorage("petArr", []);
renderTableData(petArr);

//Thêm hàm updateLocalStorage để cập nhật dữ liệu vào LocalStorage sau mỗi thay đổi
function updateLocalStorage() {
  localStorage.setItem("petArr", JSON.stringify(petArr));
}

submitBtn.addEventListener("click", function () {
  //Lấy dữ liệu từ form
  const time = new Date();
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: ageInput.value,
    type: typeInput.value,
    weight: parseInt(weightInput.value), //parseInt ép kiểu dữ liệu từ string qua number (số nguyên)
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: `${time.getDate().toString().padStart(2, "0")}/${(time.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${time.getFullYear()}`,
  };

  //Kiểm tra dữ liệu bị thiếu
  const validateData = function (data) {
    const { id, name, age, type, weight, length, breed } = data; // sử dụng toán tử destructuring
    if (!id) return alert("Please enter an ID!");
    if (!name) return alert("Please enter a name!");
    if (!age || age < 1 || age > 15)
      return alert("Age must be between 1 and 15!");
    if (type === "Select Type") return alert("Please select type!");
    if (!weight || weight < 1 || weight > 15)
      return alert("Weight must be between 1 and 15!");
    if (!length || length < 1 || length > 100)
      return alert("Length must be between 1 and 100!");
    if (breed === "Select Breed") return alert("Please select Breed!");
    return true;
  };

  // Kiểm tra trùng ID
  const isIdExist = petArr.some((pet) => pet.id === data.id);
  if (isIdExist) {
    alert("ID must be unique!");
    return;
  }

  //  Thêm thú cưng vào danh sách
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
    updateLocalStorage();
  }
});

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th>${petArr[i].id} </th>  <td>${
      petArr[i].name
    } </td>  <td>${petArr[i].age} </td> <td>${petArr[i].type} </td>  
    <td>${petArr[i].weight} kg</td>  <td>${petArr[i].length} cm</td>  <td>${
      petArr[i].breed
    } </td>  <td><i class="bi bi-square-fill" style="color: ${
      petArr[i].color
    }"></i></td>  <td>${
      petArr[i].vaccinated === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'> </i>"
    }</td>  <td>${
      petArr[i].dewormed === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'> </i>"
    }</td>  <td>${
      petArr[i].sterilized === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'> </i>"
    }</td> <td>${petArr[i].bmi ?? "?"} </td> <td>${
      petArr[i].date
    }</td> <td><button type="button" class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button></td>`;
    tableBodyEl.appendChild(row);
  }
}

//xóa dữ liệu ở form
const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// xóa thú cưng
const deletePet = function (petId) {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        renderTableData(petArr);
        updateLocalStorage();
        break;
      }
    }
  }
};

//hiển thị thú cưng khỏe mạnh
let healthyCheck = false;
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    let healthyPetArr = petArr.filter(function (petArr) {
      return petArr.vaccinated && petArr.dewormed && petArr.sterilized;
    });
    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show all pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show healthy pet";
    healthyCheck = true;
  }
});
// Tính BMI
bmiCalc.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    const weight = petArr[i].weight;
    const length = petArr[i].length / 100; // chuyển đổi length từ cm sang m
    const petType = petArr[i].type;
    let bmi;

    if (petType === "Dog") {
      bmi = ((weight * 703) / length ** 2).toFixed(2);
    } else if (petType === "Cat") {
      bmi = ((weight * 886) / length ** 2).toFixed(2); //toFixed(2) làm tròn thành 2 chữ số sau dấu thập phân
    } else {
      bmi = null;
    }

    petArr[i].bmi = bmi;
  }
  renderTableData(petArr);
});

// Thêm Animation cho Sidebar
const sidebar = document.getElementById("sidebar");

sidebar.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

//4. Hiển thị Breed trong màn hình quản lý thú cưng

// Lấy danh sách Breed từ localStorage
let breedArr = getBreedsFromLocalStorage();

// Kiểm tra nếu danh sách Breed trong localStorage rỗng, sử dụng danh sách mẫu ban đầu
if (!breedArr || breedArr.length === 0) {
  breedArr = [];
  localStorage.setItem("breeds", JSON.stringify(breedArr));
}

// Hàm hiển thị danh sách Breed
function renderBreed(breedList) {
  // Xóa các option cũ trong danh sách Breed
  breedInput.innerHTML = "";

  // Tạo một option mặc định
  const defaultOption = document.createElement("option");
  defaultOption.innerHTML = "Select Breed";
  breedInput.appendChild(defaultOption);

  // Hiển thị các Breed trong danh sách
  breedList.forEach((breed) => {
    const option = document.createElement("option");
    option.innerHTML = breed.name;
    breedInput.appendChild(option);
  });
}

// Xử lý sự kiện khi giá trị của Type Input thay đổi
// Lọc danh sách Breed tương ứng với loài đang chọn
typeInput.addEventListener("change", function () {
  const selectedType = typeInput.value;
  let filteredBreeds = [];

  if (selectedType !== "Select Type") {
    filteredBreeds = breedArr.filter((breed) => breed.type === selectedType);
  }

  // Hiển thị danh sách Breed đã lọc
  renderBreed(filteredBreeds);
});

// Hàm để người dùng thêm mới một Breed
function addBreed() {
  const type = typeInput.value;
  const newBreed = breedInput.value;

  // Kiểm tra xem Breed đã tồn tại trong danh sách chưa
  const isBreedExist = breedArr.some(
    (breed) => breed.type === type && breed.name === newBreed
  );

  if (!isBreedExist) {
    // Thêm Breed mới vào danh sách
    breedArr.push({ type: newType, name: newBreed });

    // Lưu danh sách Breed vào localStorage
    saveToStorage(breedArr);
    // Cập nhật breedArr từ LocalStorage
    breedArr = getBreedsFromLocalStorage();

    // Lọc danh sách Breed tương ứng với loài đang chọn
    const selectedType = typeInput.value;
    let filteredBreeds = [];

    if (selectedType !== "Select Type") {
      filteredBreeds = breedArr.filter((breed) => breed.type === selectedType);
    }

    // Hiển thị danh sách Breed đã lọc
    renderBreed(filteredBreeds);

    // Cập nhật danh sách Breed trong trang Pet Management
    const breedSelect = document.getElementById("breedInput");
    renderBreedOptions(breedArr, breedSelect);
  }

  // Xóa giá trị nhập trong input
  breedInput.value = "";
}

// Hiển thị danh sách Breed ban đầu
renderBreed([]);
