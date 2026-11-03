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
      { nhan: "Tự nhập", maQR: "assets/img/qr-ung-ho.png", noiDung: "UNG HO M5 STUDIO", en: { nhan: "Custom" } }
    ],
    // Bản tiếng Anh (khi người xem chọn EN)
    en: {
      tieuDe: "Buy me a coffee",
      loiNhan: "All M5 STUDIO plugins are built in my spare time. Every bit of support gives me more time to fix bugs and make more free tools for drafters.",
      ghiChu: "This QR code works with Vietnamese banking apps. International options (PayPal / Ko-fi) are coming soon."
    }
  },
  // Bộ đếm lượt xem GoatCounter: điền mã trang (phần đầu của địa chỉ <mã>.goatcounter.com).
  // Để "" thì web không đếm gì. Xem số liệu tại https://<mã>.goatcounter.com
  thongKe: {
    goatcounter: "m5studio",
    demCaMayNha: false      // true = đếm cả khi mở web ngay trên máy (localhost), chỉ dùng lúc thử
  },
  // Link mạng xã hội ở chân trang. Để "" thì không hiện.
  lienHe: {
    facebook: "https://www.facebook.com/M5Studiovn",
    youtube: "https://www.youtube.com/@BinhTran-sb7di",
    zalo: "",
    github: "https://github.com/arcthanhbinhtran-ai"
  }
};
