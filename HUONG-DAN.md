# Web M5 STUDIO — cách sửa và cập nhật

Web tĩnh, không cần máy chủ. Mở `index.html` bằng trình duyệt là xem được.

## Thêm hoặc sửa plugin

Chỉ sửa **một file**: `data/plugins.js` (mở bằng Notepad cũng được).

1. Chép nguyên một khối `{ ... }` có sẵn (ví dụ khối của M5 ĐO ĐẠC).
2. Dán xuống cuối danh sách, trước dấu `];` — nhớ có **dấu phẩy** giữa hai khối.
3. Sửa chữ: tên, mô tả, phiên bản, link tải…
4. Ảnh: chép file ảnh vào `assets/img/`, rồi ghi tên file vào ô `anh` / `anhChup`.
5. Video: dán nguyên link YouTube vào ô `video`.

Trạng thái giá (`trangThai`): `"mien-phi"`, `"pro"` (ghi giá ở ô `gia`), `"sap-ra-mat"`.

## Bản tiếng Anh

Web có nút **VI / EN** ở đầu trang. Máy đặt giờ Việt Nam +7 (hoặc trình duyệt tiếng Việt) tự thấy tiếng Việt,
người ở nước ngoài tự thấy tiếng Anh. Link chia sẻ cho người nước ngoài: thêm `?lang=en`, ví dụ
`https://arcthanhbinhtran-ai.github.io/m5studio/chi-tiet.html?id=m5-do-dac&lang=en`.

- Chữ tiếng Anh của plugin nằm trong ô `en: { ... }` của từng plugin trong `data/plugins.js`
  (mô tả, tính năng, chú thích ảnh). Ô nào thiếu thì web dùng tiếng Việt.
- Chữ cố định trên các trang nằm ở thuộc tính `data-en="..."` trong file HTML.
- Ủng hộ, thư viện: ô `en` trong `data/cai-dat.js`, `data/thu-vien.js`.

## Thông tin ủng hộ, link mạng xã hội

Sửa `data/cai-dat.js`. Mã QR là ảnh `assets/img/qr-ung-ho.png`.

## Bộ đếm lượt xem

Điền mã GoatCounter vào `thongKe.goatcounter` trong `data/cai-dat.js`. Xem số liệu tại `https://<mã>.goatcounter.com`.
Trang chi tiết đếm riêng từng plugin (`/plugin/m5-do-dac`...). Lượt bấm hiện thành `bam-tai/...`, `bam-huong-dan/...`, `mo-link/...`.

## Thư viện (vật liệu, model, block)

Sửa `data/thu-vien.js` — trong file có sẵn mẫu.

## Bài viết

Sửa `data/bai-viet.js` — trong file có sẵn mẫu. Bài mới nhất tự lên đầu.

## Các trang

| File | Trang |
|---|---|
| `index.html` | Trang chủ |
| `plugin.html` | Danh sách plugin, lọc + tìm |
| `chi-tiet.html?id=...` | Chi tiết một plugin (dùng chung, đọc theo `id`) |
| `thu-vien.html` | Thư viện |
| `bai-viet.html` | Bài viết |

Màu sắc nằm ở đầu file `assets/css/style.css` (bảng màu M5).
