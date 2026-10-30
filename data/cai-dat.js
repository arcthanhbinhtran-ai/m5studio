/*
  THÔNG TIN CHUNG CỦA WEB
  Sửa ở đây là mọi trang theo.
*/
window.M5_CAI_DAT = {
  ungHo: {
    tieuDe: "Tặng mình một ly cà phê",
    loiNhan: "Các plugin của M5 STUDIO đều làm trong giờ rảnh. Mỗi lượt ủng hộ giúp mình có thêm thời gian sửa lỗi và làm thêm công cụ miễn phí cho dân dựng bản vẽ.",
    nganHang: "Vietcombank",
    soTaiKhoan: "0531002583603",
    chuTaiKhoan: "TRAN THANH BINH",
    noiDung: "UNG HO M5 STUDIO",
    maQR: "assets/img/qr-ung-ho.png",
    // Các mức tiền có sẵn mã QR. Đổi mức thì chạy lại tools/tao-qr.py để tạo ảnh mới.
    // Mức đầu tiên được chọn sẵn. "Tự nhập" = mã không ghi sẵn số tiền.
    mucTien: [
      { nhan: "25k", maQR: "assets/img/qr-ung-ho-25k.png", noiDung: "donate 1ly cafe" },
      { nhan: "50k", maQR: "assets/img/qr-ung-ho-50k.png", noiDung: "donate 2ly cafe" },
      { nhan: "100k", maQR: "assets/img/qr-ung-ho-100k.png", noiDung: "donate 4ly cafe" },
      { nhan: "Tự nhập", maQR: "assets/img/qr-ung-ho.png", noiDung: "UNG HO M5 STUDIO" }
    ]
  },
  // Link mạng xã hội ở chân trang. Để "" thì không hiện.
  lienHe: {
    facebook: "",
    youtube: "",
    zalo: "",
    github: "https://github.com/arcthanhbinhtran-ai"
  }
};
