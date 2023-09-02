// Lắng nghe sự kiện nhấn nút Export Data
const exportBtn = document.getElementById("export-btn");
exportBtn.addEventListener("click", exportData);

// Lắng nghe sự kiện thay đổi nội dung của input file
const inputFile = document.getElementById("input-file");
inputFile.addEventListener("change", handleFile);

// Hàm xử lý sự kiện chọn file
function handleFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const content = e.target.result;
    const pets = JSON.parse(content);

    // Ghi đè dữ liệu thú cưng lên LocalStorage
    saveToStorage("petArr", pets);
    alert("Import data successfully!");

    // Chuyển về trang danh sách thú cưng
    window.location.href = "../index.html";
  };

  reader.readAsText(file);
}

// Hàm xuất dữ liệu
function exportData() {
  // Lấy danh sách thú cưng từ LocalStorage
  const pets = getFromStorage("petArr", []);

  // Chuyển danh sách thú cưng thành định dạng JSON
  const jsonData = JSON.stringify(pets, null, 2);

  // Tạo đối tượng Blob từ dữ liệu JSON
  const blob = new Blob([jsonData], { type: "application/json" });

  // Tạo URL để tải xuống file
  const url = URL.createObjectURL(blob);

  // Tạo đối tượng link và cấu hình thuộc tính để tải xuống file
  const link = document.createElement("a");
  link.href = url;
  link.download = "pets.json";

  // Kích hoạt sự kiện click tự động để tải xuống file
  link.dispatchEvent(new MouseEvent("click"));

  // Giải phóng URL
  URL.revokeObjectURL(url);
}
