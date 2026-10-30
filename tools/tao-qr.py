# Tao anh QR ung ho (chuan VietQR / NAPAS), chay tai may, khong goi mang.
# Can: pip install segno
# Chay: python tools/tao-qr.py
import os, segno

BIN = "970436"            # Vietcombank
STK = "0531002583603"
NOI_DUNG = "UNG HO M5 STUDIO"
MUC = [0, 25000, 50000, 100000]   # 0 = khong ghi san so tien

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "img")


def tlv(tag, val):
    return tag + "%02d" % len(val) + val


def crc16(s):
    crc = 0xFFFF
    for ch in s.encode("ascii"):
        crc ^= ch << 8
        for _ in range(8):
            crc = ((crc << 1) ^ 0x1021) if crc & 0x8000 else crc << 1
            crc &= 0xFFFF
    return "%04X" % crc


def ma(so_tien):
    acct = tlv("00", "A000000727") + tlv("01", tlv("00", BIN) + tlv("01", STK)) + tlv("02", "QRIBFTTA")
    p = tlv("00", "01") + tlv("01", "12" if so_tien else "11") + tlv("38", acct) + tlv("53", "704")
    if so_tien:
        p += tlv("54", str(so_tien))
    p += tlv("58", "VN") + tlv("62", tlv("08", NOI_DUNG)) + "6304"
    return p + crc16(p)


# Ma chep nguyen tu app Vietcombank (My QR, kieu Gift) - giu dung loi nhan cua chu tai khoan.
TU_APP = {
    25000: "00020101021238570010A00000072701270006970436011305310025836030208QRIBFTTA53037045405250005802VN62360815donate 1ly cafe1013GIFT-TRANSFER63046382",
    50000: "00020101021238570010A00000072701270006970436011305310025836030208QRIBFTTA53037045405500005802VN62360815donate 2ly cafe1013GIFT-TRANSFER630454BB",
    100000: "00020101021238570010A00000072701270006970436011305310025836030208QRIBFTTA530370454061000005802VN62360815donate 4ly cafe1013GIFT-TRANSFER63045A6F",
}

for st in MUC:
    ten = "qr-ung-ho.png" if not st else "qr-ung-ho-%dk.png" % (st // 1000)
    noi = TU_APP.get(st) or ma(st)
    segno.make(noi, error="m").save(os.path.join(OUT, ten), scale=10, border=2)
    print(ten, noi)
