// Lấy dữ liệu Breed từ LocalStorage
function getBreedsFromStorage() {
  return getFromStorage("breeds", []);
}

// Lưu dữ liệu Breed vào LocalStorage
function saveBreedsToLocalStorage(breedsData) {
  saveToStorage("breeds", breedsData);
}

// Hiển thị dữ liệu Breed trong bảng
function renderBreedsTable() {
  let breedsData = getBreedsFromStorage();
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  breedsData.forEach((breed, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${breed.name}</td>
      <td>${breed.type}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteBreed(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Thêm Breed
function addBreed() {
  const nameInput = document.getElementById("input-breed");
  const typeInput = document.getElementById("input-type");

  const name = nameInput.value.trim();
  const type = typeInput.value;

  if (!name || type === "Select Type") {
    alert("Please fill in all the fields.");
    return;
  }

  let breedsData = getBreedsFromStorage();
  breedsData.push({ name, type });
  saveBreedsToLocalStorage(breedsData);
  renderBreedsTable();

  nameInput.value = "";
  typeInput.value = "Select Type";
}

// Xóa Breed
function deleteBreed(index) {
  let breedsData = getBreedsFromStorage();
  breedsData.splice(index, 1);
  saveBreedsToLocalStorage(breedsData);
  renderBreedsTable();
}

// Sự kiện click cho nút Submit
const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", addBreed);

// Gọi hàm renderBreedsTable để hiển thị dữ liệu khi trang được tải
renderBreedsTable();
