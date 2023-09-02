"use strict";

const petArr = getFromStorage("petArr");
const breedArr = getFromStorage("breedArr");
const idInputFind = document.getElementById("input-id");
const nameInputFind = document.getElementById("input-name");
const typeInputFind = document.getElementById("input-type");
const breedInputFind = document.getElementById("input-breed");
const vaccinatedInputFind = document.getElementById("input-vaccinated");
const dewormedInputFind = document.getElementById("input-dewormed");
const sterilizedInputFind = document.getElementById("input-sterilized");
const tbodyFind = document.getElementById("tbody");
const findBtn = document.getElementById("find-btn");

// Hàm nút Find
findBtn.addEventListener("click", function () {
  const dataFind = {
    id: idInputFind.value.trim(),
    name: nameInputFind.value.trim(),
    type: typeInputFind.value,
    breed: breedInputFind.value,
    vaccinated: vaccinatedInputFind.checked,
    dewormed: dewormedInputFind.checked,
    sterilized: sterilizedInputFind.checked,
  };

  let result = [...petArr];

  if (dataFind.id !== "") {
    result = result.filter((x) => x.id.includes(dataFind.id));
  }

  if (dataFind.name !== "") {
    result = result.filter((n) => n.name.includes(dataFind.name));
  }

  if (dataFind.type !== "Select Type") {
    result = result.filter((t) => t.type === dataFind.type);
  }

  if (dataFind.breed !== "Select Breed") {
    result = result.filter((b) => b.breed.includes(dataFind.breed));
  }

  if (dataFind.vaccinated) {
    result = result.filter((v) => v.vaccinated);
  }

  if (dataFind.dewormed) {
    result = result.filter((d) => d.dewormed);
  }

  if (dataFind.sterilized) {
    result = result.filter((s) => s.sterilized);
  }

  renderTableData(result);
});

// Hiển thị kết quả tìm kiếm trên trang HTML
function renderTableData(pets) {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  if (pets.length > 0) {
    pets.forEach((pet) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${pet.id}</td>
        <td>${pet.name}</td>
        <td>${pet.age}</td>
        <td>${pet.type}</td>
        <td>${pet.weight}</td>
        <td>${pet.length}</td>
        <td>${pet.breed}</td>
        <td><i class="bi bi-square-fill" style="color:${pet.color}"></i></td>
        <td>${
          pet.vaccinated
            ? '<i class="bi bi-check-circle-fill"></i>'
            : '<i class="bi bi-x-circle-fill"></i>'
        }</td>
        <td>${
          pet.dewormed
            ? '<i class="bi bi-check-circle-fill"></i>'
            : '<i class="bi bi-x-circle-fill"></i>'
        }</td>
        <td>${
          pet.sterilized
            ? '<i class="bi bi-check-circle-fill"></i>'
            : '<i class="bi bi-x-circle-fill"></i>'
        }</td>
        <td>${formatDate(pet.date)}</td>
      `;
      tbody.appendChild(tr);
    });
  } else {
    tbody.innerHTML =
      '<tr><td colspan="12">No matching results were found.</td></tr>';
  }
}

// Hàm định dạng ngày tháng
function formatDate(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object" && date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  }
  return "";
}

// Lắng nghe sự kiện thay đổi loại thú cưng
const typeSelect = document.getElementById("input-type");
typeSelect.addEventListener("change", updateBreeds);

// Hàm cập nhật danh sách Breed dựa trên loại thú cưng
function updateBreeds() {
  const type = typeSelect.value;
  const breedSelect = document.getElementById("input-breed");

  // Lấy danh sách Breed dựa trên loại thú cưng từ LocalStorage
  const breeds = getFromStorage("breeds", []);
  const filteredBreeds = breeds.filter((breedObj) => breedObj.type === type);

  // Xóa tất cả các option cũ trong dropdown Breed
  breedSelect.innerHTML = "";

  // Thêm các option mới vào dropdown Breed
  filteredBreeds.forEach((breedObj) => {
    const option = document.createElement("option");
    option.value = breedObj.name;
    option.textContent = breedObj.name;
    breedSelect.appendChild(option);
  });
}
