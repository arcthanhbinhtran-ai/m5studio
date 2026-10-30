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
    trangThai: "mien-phi",
    gia: "",
    phienBan: "2.6",
    luotTai: null,
    anh: "assets/img/m5dodac-dien-tich.png",
    anhChup: [
      { anh: "assets/img/m5dodac-chieu-dai.png", chu: "Bảng kết quả tổng chiều dài" },
      { anh: "assets/img/m5dodac-dien-tich.png", chu: "Bảng kết quả diện tích, có trừ chồng lấn" },
      { anh: "assets/img/m5dodac-chua-kin.png", chu: "Phát hiện polyline chưa đóng kín" }
    ],
    video: "",
    taiVe: "https://github.com/arcthanhbinhtran-ai/m5-do-dac/releases/latest",
    github: "arcthanhbinhtran-ai/m5-do-dac",
    huongDan: "assets/docs/M5DODAC_HuongDan.pdf",
    tinhNang: [
      "Tổng chiều dài polyline, line, cung tròn, spline, elip",
      "Diện tích hatch và polyline kín, ra m² hoặc ha",
      "Soát và trừ phần chồng lấn, tô đỏ chỗ trùng",
      "Kẻ đỏ chỗ hở của polyline chưa kín, tự đóng nếu muốn",
      "Chuyển spline / elip sang polyline, làm mượt polyline",
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
    trangThai: "sap-ra-mat",
    gia: "",
    phienBan: "",
    luotTai: null,
    anh: "assets/img/alo-the.svg",
    anhChup: [],
    video: "",
    taiVe: "",
    tinhNang: [
      "Tạo layout hàng loạt từ khung bản vẽ trong Model",
      "Bộ bản vẽ: đánh số, chia nhóm, ghi xuống bản vẽ",
      "Gán field Sheet Set vào khung tên",
      "Tạo, đọc, sửa file sheet set (.dst), vòng Excel",
      "In PDF cả bộ, mục lục theo nhóm"
    ],
    yeuCau: "AutoCAD 2015 – 2027",
    deXuat: false
  },
  {
    id: "ihl",
    ten: "IHL",
    moTaNgan: "In PDF hàng loạt theo khung bản vẽ — miễn phí cho sinh viên quy hoạch.",
    moTa: "Tự tìm các khung bản vẽ trong Model và in ra PDF hàng loạt, gộp một file hoặc tách từng file. Bản 10.0 miễn phí cho sinh viên khoa quy hoạch.",
    trangThai: "sap-ra-mat",
    gia: "",
    phienBan: "10.0",
    luotTai: null,
    anh: "assets/img/ihl-the.svg",
    anhChup: [],
    video: "",
    taiVe: "",
    tinhNang: [
      "Tự nhận khung bản vẽ theo block",
      "In PDF gộp một file hoặc tách từng khung",
      "Nhớ cách in của từng bản vẽ"
    ],
    yeuCau: "AutoCAD 2018 – 2027",
    deXuat: false
  }
];
