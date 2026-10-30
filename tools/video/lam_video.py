# Dung video huong dan M5 DO DAC dang trinh chieu (1920x1080, 25 hinh/giay).
# Can: pip install pillow imageio-ffmpeg
# Chay: python tools/video/lam_video.py  ->  tools/video/M5DODAC_HuongDan.mp4
import os, subprocess, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio_ffmpeg

HERE = os.path.dirname(os.path.abspath(__file__))
WEB = os.path.normpath(os.path.join(HERE, "..", ".."))
ANH = os.path.join(HERE, "anh")
IMG = os.path.join(WEB, "assets", "img")
OUT = os.path.join(HERE, "M5DODAC_HuongDan.mp4")

W, H, FPS = 1920, 1080, 25
BG = (24, 24, 26)
BG2 = (38, 38, 41)
TXT = (238, 238, 240)
LBL = (198, 198, 202)
DIM = (132, 132, 138)
RED = (214, 58, 52)
GREEN = (76, 195, 138)

FD = "C:/Windows/Fonts/"


def font(n, s):
    return ImageFont.truetype(FD + n, s)


F_KICK = font("segoeuib.ttf", 34)
F_TITLE = font("segoeuib.ttf", 76)
F_BIG = font("segoeuib.ttf", 110)
F_TXT = font("segoeui.ttf", 40)
F_TXTB = font("segoeuib.ttf", 40)
F_SMALL = font("segoeui.ttf", 30)
F_MONO = font("consola.ttf", 34) if os.path.exists(FD + "consola.ttf") else font("segoeui.ttf", 34)


def ease(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


# ---------- nen chung ----------
def nen():
    im = Image.new("RGB", (W, H), BG)
    glow = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(glow)
    d.ellipse((W * 0.15, -420, W * 0.85, 300), fill=(70, 28, 28))
    glow = glow.filter(ImageFilter.GaussianBlur(160))
    im = Image.blend(im, glow, 0.9)
    return im


LOGO = Image.open(os.path.join(IMG, "m5-logo.png")).convert("RGBA")


def dan_logo(im, cao, xy):
    lg = LOGO.resize((int(LOGO.size[0] * cao / LOGO.size[1]), cao), Image.LANCZOS)
    im.paste(lg, xy, lg)
    return lg.size


def chu(d, xy, s, f, fill=TXT, w=None, lh=1.3):
    """Ve chu, tu xuong dong neu co w. Tra ve y cuoi."""
    x, y = xy
    dong = []
    for doan in s.split("\n"):
        if not w:
            dong.append(doan)
            continue
        cur = ""
        for tu in doan.split(" "):
            thu = (cur + " " + tu).strip()
            if d.textlength(thu, font=f) > w and cur:
                dong.append(cur)
                cur = tu
            else:
                cur = thu
        dong.append(cur)
    for dg in dong:
        d.text((x, y), dg, font=f, fill=fill)
        y += int(f.size * lh)
    return y


def khung_anh(src, box_w, box_h, nen_sang=False):
    """Anh dat trong khung bo goc, co vien + bong."""
    im = src.convert("RGB")
    s = min(box_w / im.size[0], box_h / im.size[1])
    im = im.resize((int(im.size[0] * s), int(im.size[1] * s)), Image.LANCZOS)
    return im, s


def dan_anh(canvas, im, xy, r=18):
    w, h = im.size
    sh = Image.new("RGBA", (w + 80, h + 80), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle((40, 50, 40 + w, 50 + h), r, fill=(0, 0, 0, 150))
    sh = sh.filter(ImageFilter.GaussianBlur(22))
    canvas.paste(sh, (xy[0] - 40, xy[1] - 40), sh)
    m = Image.new("L", (w, h), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, w - 1, h - 1), r, fill=255)
    canvas.paste(im, xy, m)
    ImageDraw.Draw(canvas).rounded_rectangle((xy[0], xy[1], xy[0] + w - 1, xy[1] + h - 1), r, outline=(68, 68, 74), width=2)


def con_tro(d, x, y, s=1.0):
    p = [(0, 0), (0, 34), (9, 26), (15, 40), (21, 37), (15, 24), (26, 24)]
    p = [(x + a * s, y + b * s) for a, b in p]
    d.polygon(p, fill=(255, 255, 255), outline=(0, 0, 0))


# ---------- mot canh ----------
class Canh:
    def __init__(self, giay, kicker, tieu_de, y_chinh, anh=None, vung=None, anh_trai=False, ve_them=None, dau=False):
        self.giay = giay
        self.kicker = kicker
        self.tieu_de = tieu_de
        self.y_chinh = y_chinh      # danh sach dong chu (chuoi) hoac None
        self.anh = anh              # Image hoac None
        self.vung = vung or []      # cac khung do can chi (toa do tren anh goc)
        self.ve_them = ve_them      # ham ve rieng (canvas, t)
        self.dau = dau

    def tinh(self):
        """Ve phan dung yen mot lan."""
        base = nen()
        d = ImageDraw.Draw(base)
        dan_logo(base, 54, (W - 190, 46))
        self.vi_tri_anh = None
        if self.tieu_de:
            x0 = 110
            if self.kicker:
                d.text((x0, 120), self.kicker, font=F_KICK, fill=RED)
            hep = self.anh is not None or self.ve_them is not None
            y = chu(d, (x0, 168), self.tieu_de, F_TITLE, w=760 if hep else 1500, lh=1.12) + 30
            if self.y_chinh:
                for i, dg in enumerate(self.y_chinh):
                    self.__dong(d, x0, y, dg)
                    y = chu(d, (x0 + 48, y), dg, F_TXT, fill=LBL, w=690 if hep else 1500) + 22
            if self.anh is not None:
                im, s = khung_anh(self.anh, 900, 760)
                ax = W - 110 - im.size[0]
                ay = (H - im.size[1]) // 2 + 30
                dan_anh(base, im, (ax, ay))
                self.vi_tri_anh = (ax, ay, s)
        self.base = base

    def __dong(self, d, x, y, s):
        d.rounded_rectangle((x, y + 14, x + 22, y + 36), 5, fill=RED)

    def khung(self, t):
        """t: giay tinh tu dau canh."""
        im = self.base.copy()
        if self.ve_them:
            self.ve_them(im, t)
        if self.vi_tri_anh and self.vung:
            ax, ay, s = self.vi_tri_anh
            ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            d = ImageDraw.Draw(ov)
            for i, v in enumerate(self.vung):
                bat = 0.5 + i * 0.8
                if t < bat:
                    continue
                k = ease((t - bat) / 0.45)
                x1, y1, x2, y2 = v[:4]
                pad = 8 + (1 - k) * 40
                bx = (ax + x1 * s - pad, ay + y1 * s - pad, ax + x2 * s + pad, ay + y2 * s + pad)
                nhip = 0.5 + 0.5 * math.sin((t - bat) * 4)
                d.rounded_rectangle(bx, 10, outline=RED + (int(255 * k),), width=int(5 + 2 * nhip))
                if len(v) > 4 and k > 0.95:
                    nhan = v[4]
                    tw = d.textlength(nhan, font=F_SMALL)
                    cho = v[5] if len(v) > 5 else "duoi"
                    lx, ly = bx[0], bx[3] + 12
                    if cho == "tren" or ly + 50 > H:
                        ly = bx[1] - 60
                    elif cho == "phai":
                        lx, ly = bx[2] + 14, (bx[1] + bx[3]) / 2 - 24
                    lx = min(lx, W - tw - 60)
                    d.rounded_rectangle((lx, ly, lx + tw + 28, ly + 48), 10, fill=RED + (240,))
                    d.text((lx + 14, ly + 5), nhan, font=F_SMALL, fill=(255, 255, 255))
            im.paste(ov, (0, 0), ov)
        # chuyen canh: mo dan vao / ra
        a = min(ease(t / 0.4), ease((self.giay - t) / 0.4))
        if a < 1:
            im = Image.blend(Image.new("RGB", (W, H), BG), im, a)
        return im


def mo(ten):
    return Image.open(os.path.join(ANH, ten))


# ---------- canh ve rieng ----------
def ve_mo_dau(im, t):
    d = ImageDraw.Draw(im)
    k = ease(t / 1.0)
    cao = 300
    lg = LOGO.resize((int(LOGO.size[0] * cao / LOGO.size[1]), cao), Image.LANCZOS)
    # nen trang bo goc cho logo
    bw, bh = lg.size[0] + 120, lg.size[1] + 120
    bx, by = (W - bw) // 2, 130 + int((1 - k) * 30)
    d.rounded_rectangle((bx, by, bx + bw, by + bh), 36, fill=(244, 244, 245))
    im.paste(lg, (bx + 60, by + 60), lg)
    ty = by + bh + 60
    s = "M5 ĐO ĐẠC"
    d.text(((W - d.textlength(s, font=F_BIG)) / 2, ty), s, font=F_BIG, fill=TXT)
    s2 = "Hướng dẫn cài đặt và đo chiều dài, diện tích"
    d.text(((W - d.textlength(s2, font=F_TXTB)) / 2, ty + 150), s2, font=F_TXTB, fill=RED)
    s3 = "Miễn phí  ·  AutoCAD 2015 – 2027  ·  Tiếng Việt"
    d.text(((W - d.textlength(s3, font=F_SMALL)) / 2, ty + 215), s3, font=F_SMALL, fill=DIM)


def ve_thu_muc(im, t):
    d = ImageDraw.Draw(im)
    x0, y0, w = 1000, 230, 780
    d.rounded_rectangle((x0, y0, x0 + w, y0 + 640), 18, fill=(32, 32, 35), outline=(68, 68, 74), width=2)
    d.rounded_rectangle((x0, y0, x0 + w, y0 + 70), 18, fill=BG2)
    d.rectangle((x0, y0 + 50, x0 + w, y0 + 70), fill=BG2)
    d.rounded_rectangle((x0 + 30, y0 + 20, x0 + 66, y0 + 50), 5, fill=(226, 178, 74))
    d.text((x0 + 84, y0 + 10), "M5DODAC_v3.0", font=F_TXTB, fill=TXT)
    tep = ["M5DoDac.bundle", "nap", "src", "tools", "BienDich.bat", "CaiDat.bat", "GoCaiDat.bat", "Huongdan.txt", "KiemTraCaiDat.bat"]
    y = y0 + 95
    for f in tep:
        thu_muc = "." not in f or f.endswith(".bundle")
        chon = f == "CaiDat.bat"
        if chon and t > 3.0:
            k = ease((t - 3.0) / 0.4)
            d.rounded_rectangle((x0 + 16, y - 6, x0 + w - 16, y + 50), 10, fill=(96, 32, 30), outline=RED + (0,), width=3)
            d.rounded_rectangle((x0 + 16, y - 6, x0 + w - 16, y + 50), 10, outline=RED, width=3)
        o = (226, 178, 74) if thu_muc else (150, 150, 160)
        d.rounded_rectangle((x0 + 34, y + 6, x0 + 66, y + 38), 5, fill=o)
        d.text((x0 + 86, y + 2), f, font=F_TXTB if chon else F_TXT, fill=TXT if chon else LBL)
        if chon and t > 3.6:
            d.text((x0 + 400, y + 6), "← bấm đúp", font=F_SMALL, fill=(255, 140, 130))
            con_tro(d, x0 + 330, y + 22, 1.2)
        y += 58


def ve_cap_nhat(im, t):
    d = ImageDraw.Draw(im)
    x0, y0 = 1030, 300
    d.rounded_rectangle((x0, y0, x0 + 760, y0 + 470), 22, fill=(32, 32, 35), outline=(68, 68, 74), width=2)
    d.text((x0 + 40, y0 + 36), "Kiểm tra cập nhật", font=F_TXTB, fill=TXT)
    d.text((x0 + 40, y0 + 100), "Có bản mới: v3.1", font=F_TXT, fill=GREEN)
    d.text((x0 + 40, y0 + 160), "Đang dùng: v3.0", font=F_TXT, fill=DIM)
    k = ease((t - 1.2) / 0.4)
    bx = (x0 + 40, y0 + 270, x0 + 720, y0 + 360)
    d.rounded_rectangle(bx, 14, fill=RED if k > 0.5 else (60, 30, 30))
    s = "TẢI VÀ CÀI BẢN MỚI"
    d.text(((bx[0] + bx[2] - d.textlength(s, font=F_TXTB)) / 2, bx[1] + 20), s, font=F_TXTB, fill=(255, 255, 255))
    if t > 1.6:
        con_tro(d, bx[2] - 120, bx[1] + 50, 1.4)
    if t > 2.4:
        d.text((x0 + 40, y0 + 390), "Tự tải, tự cài — AutoCAD vẫn mở", font=F_SMALL, fill=LBL)


def ve_ket(im, t):
    d = ImageDraw.Draw(im)
    k = ease(t / 0.8)
    cao = 200
    lg = LOGO.resize((int(LOGO.size[0] * cao / LOGO.size[1]), cao), Image.LANCZOS)
    bw, bh = lg.size[0] + 80, lg.size[1] + 80
    bx, by = (W - bw) // 2, 120
    d.rounded_rectangle((bx, by, bx + bw, by + bh), 28, fill=(244, 244, 245))
    im.paste(lg, (bx + 40, by + 40), lg)
    y = by + bh + 70
    for s, f, c in [
        ("Tải miễn phí tại", F_TXT, LBL),
        ("arcthanhbinhtran-ai.github.io/m5studio", F_TITLE, TXT),
    ]:
        d.text(((W - d.textlength(s, font=f)) / 2, y), s, font=f, fill=c)
        y += int(f.size * 1.35)
    y += 30
    for s in ["Gặp lỗi hay muốn góp ý? Gửi M5 kèm ảnh chụp màn hình — M5 sửa và cập nhật ngay.",
              "Thấy có ích, mời M5 một ly cà phê ngay trên trang tải nhé!"]:
        d.text(((W - d.textlength(s, font=F_SMALL)) / 2, y), s, font=F_SMALL, fill=DIM)
        y += 52


# ---------- kich ban ----------
WEBSHOT = mo("web.jpg").crop((262, 60, 1180, 700))   # lech 262,60 so voi anh goc
CANH = [
    Canh(5, None, "", None, ve_them=ve_mo_dau),
    Canh(7, "BƯỚC 1  ·  TẢI VỀ", "Tải M5 ĐO ĐẠC",
         ["Vào trang M5 STUDIO, mục Plugin → M5 ĐO ĐẠC.",
          "Bấm TẢI M5 ĐO ĐẠC — file .zip tự tải về máy.",
          "Cần xem kỹ hơn thì mở Hướng dẫn sử dụng (PDF)."],
         anh=WEBSHOT, vung=[(281 - 262, 360 - 60, 490 - 262, 395 - 60, "Bấm để tải", "tren"),
                            (281 - 262, 410 - 60, 709 - 262, 445 - 60, "Hướng dẫn PDF")]),
    Canh(7, "BƯỚC 2  ·  GIẢI NÉN", "Giải nén, chạy CaiDat.bat",
         ["Bấm chuột phải file .zip → Extract All (Giải nén).",
          "Mở thư mục vừa giải nén.",
          "Bấm đúp CaiDat.bat."],
         ve_them=ve_thu_muc),
    Canh(7, "BƯỚC 3  ·  CÀI ĐẶT", "Đóng AutoCAD, bấm Cài đặt",
         ["Bộ cài tự tìm AutoCAD trên máy.",
          "Đóng hết AutoCAD đang mở.",
          "Bấm nút đỏ Cài đặt."],
         anh=mo("caidat_1.png"), vung=[(491, 559, 623, 595, "Bấm Cài đặt")]),
    Canh(5, "BƯỚC 3  ·  CÀI ĐẶT", "Đợi khoảng một phút",
         ["Bộ cài tự làm từng bước, có dấu tích khi xong.",
          "Không cần cài thêm gì khác."],
         anh=mo("caidat_2.png"), vung=[(25, 262, 620, 360, "Đang cài")]),
    Canh(8, "BƯỚC 4  ·  MỞ AUTOCAD", "Cài xong!",
         ["Bấm Xong, mở lại AutoCAD.",
          "Nếu AutoCAD hỏi, chọn Always Load.",
          "Trên ribbon có thêm tab M5 ĐO ĐẠC."],
         anh=mo("caidat_3.png"), vung=[(27, 252, 620, 336, "Đã cài"), (385, 559, 479, 595, "Bấm Xong")]),
    Canh(6, "TRƯỚC KHI ĐO", "Bản vẽ vẽ theo mm, cm hay m?",
         ["Xem ô \"Bản vẽ vẽ theo\" trên bảng kết quả.",
          "Chọn sai thì số lệch 1.000 lần — đổi lại là tính lại ngay."],
         anh=mo("m5dodac-chieu-dai.png"), vung=[(548, 116, 782, 142, "Đơn vị vẽ")]),
    Canh(5, "ĐO CHIỀU DÀI  ·  1", "Bấm TỔNG CHIỀU DÀI",
         ["Trên tab M5 ĐO ĐẠC của ribbon.", "Hoặc gõ lệnh M5DODAI."],
         anh=mo("im0_2.png")),
    Canh(6, "ĐO CHIỀU DÀI  ·  2", "Quét chọn các đường",
         ["Polyline, line, cung, đường tròn, elip, spline.", "Chọn xong bấm Enter."],
         anh=mo("im0_3.png")),
    Canh(8, "ĐO CHIỀU DÀI  ·  3", "Ra ngay bảng kết quả",
         ["Số tổng ở góc phải.", "Chi tiết từng đường, từng layer.",
          "Bấm đúp một dòng → phóng tới đường đó trên bản vẽ."],
         anh=mo("m5dodac-chieu-dai.png"),
         vung=[(686, 56, 786, 90, "Số tổng"), (146, 195, 276, 220, "Tab Theo layer")]),
    Canh(5, "ĐO CHIỀU DÀI  ·  4", "Dán vào Excel bằng Ctrl+V",
         ["Số tổng đã được chép sẵn.", "Mở Excel hay Word, Ctrl+V là xong."],
         anh=mo("im0_4.png")),
    Canh(5, "ĐO DIỆN TÍCH  ·  1", "Bấm DIỆN TÍCH",
         ["Hoặc gõ lệnh M5DODT.", "Quét chọn hatch và polyline kín, bấm Enter."],
         anh=mo("im1_2.png")),
    Canh(7, "ĐO DIỆN TÍCH  ·  2", "Màu soát trên bản vẽ",
         ["Xanh = đã tính.", "Đỏ = chồng lấn hoặc chỗ hở.", "Cam = cần xem lại.",
          "Chỉ hiện tạm, không ghi vào bản vẽ."],
         anh=mo("im1_3.png"), vung=[(282, 208, 452, 346, "Chồng lấn"), (636, 368, 832, 500, "Polyline hở")]),
    Canh(8, "ĐO DIỆN TÍCH  ·  3", "Polyline chưa đóng kín?",
         ["M5 kẻ vạch đỏ đúng chỗ hở và hỏi bạn:",
          "Tự đóng rồi tính luôn,", "bỏ qua chúng, hoặc dừng để tự sửa."],
         anh=mo("m5dodac-chua-kin.png"), vung=[(22, 143, 464, 179, "Hay chọn nhất")]),
    Canh(8, "ĐO DIỆN TÍCH  ·  4", "Trừ chồng lấn, ra m² và ha",
         ["Tích \"Trừ chồng lấn\" — phần trùng chỉ tính một lần.",
          "Đổi đơn vị m², ha, km² — khỏi tự đếm số 0."],
         anh=mo("m5dodac-dien-tich.png"),
         vung=[(664, 52, 786, 92, "Số tổng"), (166, 464, 262, 484, "Trừ chồng lấn"), (66, 462, 168, 486, "m² / ha")]),
    Canh(5, "ĐO DIỆN TÍCH  ·  5", "Chép ra Excel",
         ["Ctrl+V để dán số tổng.", "Bấm \"Chép cả bảng\" để dán cả bảng chi tiết."],
         anh=mo("im1_4.png")),
    Canh(6, "LUÔN BẢN MỚI NHẤT", "Cập nhật ngay trong AutoCAD",
         ["Bấm Kiểm tra cập nhật trên tab M5 ĐO ĐẠC.",
          "Có bản mới thì bấm TẢI VÀ CÀI BẢN MỚI.",
          "Không cần đóng AutoCAD (từ bản 3.0)."],
         ve_them=ve_cap_nhat),
    Canh(6, None, "", None, ve_them=ve_ket),
]


def main():
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [ff, "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", "%dx%d" % (W, H), "-r", str(FPS), "-i", "-",
           "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "20", "-movflags", "+faststart", OUT]
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)
    tong = 0
    for i, c in enumerate(CANH):
        c.tinh()
        n = int(c.giay * FPS)
        for f in range(n):
            p.stdin.write(c.khung(f / FPS).tobytes())
        tong += c.giay
        print("canh", i + 1, "/", len(CANH), "xong", flush=True)
    p.stdin.close()
    p.wait()
    print("Tong", tong, "giay ->", OUT)


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:   # xem truoc mot canh: python lam_video.py <so canh> <giay>
        c = CANH[int(sys.argv[1])]
        c.tinh()
        c.khung(float(sys.argv[2])).save(os.path.join(HERE, "xem_truoc.png"))
    else:
        main()
