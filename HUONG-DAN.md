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

## Thông tin ủng hộ, link mạng xã hội

Sửa `data/cai-dat.js`. Mã QR là ảnh `assets/img/qr-ung-ho.png`.

## Thư viện (vật liệu, model, block)

Sửa `data/thu-vien.js` — trong file có sẵn mẫu.

## Các trang

| File | Trang |
|---|---|
| `index.html` | Trang chủ |
| `plugin.html` | Danh sách plugin, lọc + tìm |
| `chi-tiet.html?id=...` | Chi tiết một plugin (dùng chung, đọc theo `id`) |
| `thu-vien.html` | Thư viện |

Màu sắc nằm ở đầu file `assets/css/style.css` (bảng màu M5).
