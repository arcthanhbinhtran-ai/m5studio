/*
  DANH SÁCH PLUGIN CỦA M5 STUDIO
  ------------------------------
  Thêm plugin mới: chép nguyên một khối { ... } bên dưới, dán thêm vào danh sách
  (nhớ dấu phẩy giữa hai khối), rồi sửa chữ. Không cần sửa file HTML nào.

  Các ô:
    id         : tên ngắn không dấu, không cách (dùng làm đường dẫn trang chi tiết)
    ten        : tên hiện trên web
    moTaNgan   : một dòng hiện trên thẻ
    moTa       : đoạn giới thiệu ở trang chi tiết
    phanMem    : phần mềm plugin chạy trong, ví dụ "AutoCAD", "SketchUp", "Revit".
                 Có từ 2 phần mềm trở lên thì trang Plugin tự hiện hàng nút lọc theo phần mềm.
    trangThai  : "mien-phi"  = Miễn phí
                 "pro"       = có giá (ghi giá ở ô gia, ví dụ "199.000đ")
                 "sap-ra-mat"= Sắp ra mắt (chưa có nút Tải)
    gia        : giá, để "" nếu chưa định
    phienBan   : ví dụ "3.0", để "" nếu chưa có
    luotTai    : số lượt tải, để null nếu không muốn hiện
    anh        : ảnh trên thẻ (đặt file vào assets/img/)
    anhChup    : danh sách ảnh chụp giao diện ở trang chi tiết, mỗi ảnh { anh, chu }
    video      : link YouTube (dán nguyên link), để "" nếu chưa có
    taiVe      : link tải, để "" nếu chưa có
    github     : (tuỳ chọn) kho GitHub dạng "tên-tài-khoản/tên-kho". Có ô này thì web tự lấy
                 bản mới nhất trên GitHub Releases: nút Tải tải thẳng file .zip, số phiên bản
                 tự cập nhật. Ô phienBan / taiVe chỉ dùng khi không đọc được GitHub.
    huongDan   : (tuỳ chọn) file PDF hướng dẫn, đặt trong assets/docs/. Có thì hiện nút "Hướng dẫn (PDF)".
    tinhNang   : danh sách tính năng, mỗi dòng một chuỗi
    yeuCau     : phiên bản AutoCAD hỗ trợ
    deXuat     : true = gắn nhãn ĐỀ XUẤT trên thẻ
*/
window.M5_PLUGINS = [
  {
    id: "m5-do-dac",
    ten: "M5 ĐO ĐẠC",
    moTaNgan: "Đo tổng chiều dài, diện tích hatch / polyline kín, soát chồng lấn.",
    moTa: "Chọn đường hay vùng trên bản vẽ là có ngay tổng chiều dài, tổng diện tích, kèm bảng kết quả từng đối tượng và từng layer. Polyline hở được kẻ đỏ chỗ hở và hỏi tự đóng; vùng chồng lấn được tô đỏ và trừ khỏi tổng nếu muốn. Số tổng tự chép sẵn, Ctrl+V là dán vào Excel hay Word.",
    phanMem: "AutoCAD",
    trangThai: "mien-phi",
    gia: "",
    phienBan: "4.0",
    luotTai: null,
    anh: "assets/img/m5dodac-dien-tich.png",
    anhChup: [
      { anh: "assets/img/m5dodac-chieu-dai.png", chu: "Bảng kết quả tổng chiều dài" },
      { anh: "assets/img/m5dodac-dien-tich.png", chu: "Bảng kết quả diện tích, có trừ chồng lấn" },
      { anh: "assets/img/m5dodac-chua-kin.png", chu: "Phát hiện polyline chưa đóng kín" }
    ],
    video: "https://youtu.be/KkD2ICXNS90",
    taiVe: "https://github.com/arcthanhbinhtran-ai/m5-do-dac/releases/latest",
    github: "arcthanhbinhtran-ai/m5-do-dac",
    huongDan: "assets/docs/M5DODAC_HuongDan.pdf",
    tinhNang: [
      "Tổng chiều dài polyline, line, cung tròn, spline, elip",
      "Diện tích hatch và polyline kín, ra m² hoặc ha",
      "Soát và trừ phần chồng lấn, tô đỏ chỗ trùng",
      "Kẻ đỏ chỗ hở của polyline chưa kín, tự đóng nếu muốn",
      "Chuyển spline / elip sang polyline, làm mượt polyline",
      "Chia đều đường: đặt điểm, cắt rời, chèn block (xoay, lật)",
      "Thay block, đổi tên, đổi điểm gốc, bật Annotative khỏi mở Block Editor",
      "Tự kiểm tra bản mới"
    ],
    yeuCau: "AutoCAD 2015 – 2027",
    deXuat: true
  },
  {
    id: "alo",
    ten: "ALO",
    moTaNgan: "Tạo layout hàng loạt, bộ bản vẽ, field khung tên, sheet set và in PDF cả bộ.",
    moTa: "Dành cho người dựng hồ sơ nhiều bản vẽ: quét khung trong Model và tạo layout hàng loạt, quản lý bộ bản vẽ (số hiệu, tên, tỉ lệ, ngày), gán field khung tên để sửa một chỗ là mọi bản vẽ theo, đọc / sửa / thêm bản vẽ vào sheet set (.dst), xuất nhập Excel và in PDF cả bộ có mục lục theo nhóm.",
    phanMem: "AutoCAD",
    trangThai: "mien-phi",
    gia: "",
    phienBan: "1.1",
    luotTai: null,
    anh: "assets/img/alo-bo-ban-ve.png",
    anhChup: [
      { anh: "assets/img/alo-bo-ban-ve.png", chu: "Bảng bộ bản vẽ: số hiệu, tên, tỉ lệ, ngày, chia nhóm" },
      { anh: "assets/img/alo-sheet-set.png", chu: "Tab Sheet set: sửa hàng loạt file .dst, Excel, in PDF cả bộ" },
      { anh: "assets/img/alo-khung-ten.png", chu: "Tab Khung tên: đặt khung tên, ghi giá trị, gán field" },
      { anh: "assets/img/alo-cap-nhat.png", chu: "Tự kiểm tra và tải bản mới" }
    ],
    video: "",
    taiVe: "https://github.com/arcthanhbinhtran-ai/alo/releases/latest",
    github: "arcthanhbinhtran-ai/alo",
    huongDan: "assets/docs/ALO_HuongDan.pdf",
    tinhNang: [
      "Tạo layout hàng loạt từ khung bản vẽ trong Model",
      "Bộ bản vẽ: đánh số, chia nhóm, ghi xuống bản vẽ",
      "Gán field Sheet Set vào khung tên",
      "Tạo, đọc, sửa file sheet set (.dst), vòng Excel",
      "In PDF cả bộ, mục lục theo nhóm",
      "Tự kiểm tra bản mới"
    ],
    yeuCau: "AutoCAD 2015 – 2027",
    deXuat: false
  },
  {
    id: "ihl",
    ten: "IHL",
    moTaNgan: "In PDF hàng loạt theo khung bản vẽ hoặc theo từng tab Layout — miễn phí cho sinh viên quy hoạch.",
    moTa: "Tự tìm các khung bản vẽ trong Model (hoặc từng tab Layout) và in ra PDF hàng loạt, gộp một file hoặc tách từng file, đặt tên theo bản vẽ. Có bảng In nâng cao để chọn đúng khung cần in, nhớ cách in của từng bản vẽ, tự soát trang in ra có trắng không. Miễn phí cho sinh viên khoa quy hoạch.",
    phanMem: "AutoCAD",
    trangThai: "mien-phi",
    gia: "",
    phienBan: "1.1",
    luotTai: null,
    anh: "assets/img/ihl-bang.png",
    anhChup: [
      { anh: "assets/img/ihl-bang.png", chu: "Bảng IHL: 4 bước — thiết lập in, khung in, xuất file, danh sách khung" },
      { anh: "assets/img/ihl-layout.png", chu: "In theo từng tab Layout: tích chọn layout cần in" },
      { anh: "assets/img/ihl-nang-cao.png", chu: "In nâng cao: sơ đồ khung trên bản vẽ, bấm để bỏ / lấy lại" },
      { anh: "assets/img/ihl-cap-nhat.png", chu: "Tự kiểm tra và tải bản mới" }
    ],
    video: "",
    taiVe: "https://github.com/arcthanhbinhtran-ai/ihl/releases/latest",
    github: "arcthanhbinhtran-ai/ihl",
    huongDan: "assets/docs/IHL_HuongDan.pdf",
    tinhNang: [
      "Tự nhận khung bản vẽ theo block",
      "In theo khung trong Model hoặc theo từng tab Layout",
      "In PDF gộp một file hoặc tách từng khung",
      "Nhớ cách in của từng bản vẽ",
      "Tự soát trang in ra bị trắng",
      "Tự kiểm tra bản mới"
    ],
    yeuCau: "AutoCAD 2018 – 2027",
    deXuat: false
  }
];
