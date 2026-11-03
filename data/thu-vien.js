/*
  THƯ VIỆN (vật liệu, model 3D, block CAD...)
  ------------------------------------------
  Chưa có gì thì để danh sách rỗng - trang sẽ hiện ô "Sắp có".
  Thêm một mục: chép mẫu dưới đây vào giữa hai dấu [ ].

    {
      ten: "Gạch lát sân vườn",
      nhom: "vat-lieu",          // "vat-lieu" hoặc "model-3d" hoặc "block-cad"
      loai: "Gạch",              // nhãn lọc nhỏ, tuỳ ý
      anh: "assets/img/thu-vien/gach-san-vuon.jpg",
      taiVe: "https://...",
      mienPhi: true,
      luotTai: null
    }
*/
window.M5_THU_VIEN_NHOM = [
  { id: "model-3d", ten: "Model 3D", en: { ten: "3D models" } },
  { id: "vat-lieu", ten: "Vật liệu", en: { ten: "Materials" } },
  { id: "block-cad", ten: "Block CAD", en: { ten: "CAD blocks" } }
];

window.M5_THU_VIEN = [
  {
    ten: "VOL 01-A — Bộ cây cọ tropical (M5_LIB_TREE_PALM)",
    nhom: "model-3d",
    loai: "Cây cọ · SketchUp",
    en: { ten: "VOL 01-A — Tropical palm tree set (M5_LIB_TREE_PALM)", loai: "Palms · SketchUp" },
    anh: "assets/img/thu-vien/cay-co-vol01.jpg",
    taiVe: "https://drive.google.com/file/d/10cFpBx-zDriIhSuvv8xxHaTj0xMx0dlI/view",
    mienPhi: true,
    luotTai: null
  },
  {
    ten: "VOL 01-B — Bộ cây cọ tropical (M5_LIB_TREE_PALM)",
    nhom: "model-3d",
    loai: "Cây cọ · SketchUp",
    en: { ten: "VOL 01-B — Tropical palm tree set (M5_LIB_TREE_PALM)", loai: "Palms · SketchUp" },
    anh: "assets/img/thu-vien/cay-co-vol01b.jpg",
    taiVe: "https://drive.google.com/file/d/1XZq-PqE5Y-GyiLcQjdZRgR0OoUL86TCl/view",
    mienPhi: true,
    luotTai: null
  },
  {
    ten: "VOL 02 — Bộ cây ăn trái (M5_LIB_TREE_FRUIT)",
    nhom: "model-3d",
    loai: "Cây ăn trái · SketchUp",
    en: { ten: "VOL 02 — Fruit tree set (M5_LIB_TREE_FRUIT)", loai: "Fruit trees · SketchUp" },
    anh: "assets/img/thu-vien/cay-an-trai-vol02.jpg",
    taiVe: "https://drive.google.com/file/d/1_vTpUwBz28fBTe_uXeD8_YvRltH2B-jT/view",
    mienPhi: true,
    luotTai: null
  }
];
