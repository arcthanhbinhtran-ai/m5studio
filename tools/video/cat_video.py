# Cat gon hai video quay man hinh M5 DO DAC thanh mot video ngan.
# Chay: python tools/video/cat_video.py  ->  tools/video/M5DODAC_QuayThat.mp4
import os, subprocess
import imageio_ffmpeg

HERE = os.path.dirname(os.path.abspath(__file__))
A = r"C:\Users\ADMIN\Videos\2026-10-30 13-06-53.mp4"   # cai dat + do tren hinh mau
B = r"C:\Users\ADMIN\Videos\2026-10-30 13-10-47.mp4"   # do dien tich ban ve quy hoach that
OUT = os.path.join(HERE, "M5DODAC_QuayThat.mp4")

# (nguon, giay bat dau, giay ket thuc, toc do)
DOAN = [
    (0, 4.5, 14.0, 1.5),    # mo thu muc, chay CaiDat.bat, bo cai chay xong
    (0, 25.6, 27.6, 1.5),   # AutoCAD hoi nap plugin -> Always Load
    (0, 45.5, 51.0, 1.0),   # do chieu dai mot duong
    (0, 57.0, 63.0, 1.0),   # do chieu dai nhieu duong, hien so tren ban ve
    (0, 65.5, 76.0, 1.0),   # do dien tich, polyline ho, bang ket qua
    (0, 83.0, 92.0, 1.5),   # doi don vi m2 -> ha
    (1, 1.0, 9.0, 1.5),     # ban ve quy hoach that: quet chon
    (1, 9.0, 21.0, 1.0),    # bang ket qua: Chi tiet -> Theo layer -> Chong lan -> Theo layer
    (1, 22.0, 33.0, 1.0),   # bam dup dong de phong toi, xem tung layer
]


def lam_canh(canh, ten, ff):
    """Dung canh logo (mo dau / ket) tu lam_video.py thanh mp4 30 hinh/giay."""
    import lam_video as L
    ra = os.path.join(HERE, ten)
    p = subprocess.Popen([ff, "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", "1920x1080",
                          "-r", "30", "-i", "-", "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p", ra],
                         stdin=subprocess.PIPE)
    canh.tinh()
    for f in range(int(canh.giay * 30)):
        p.stdin.write(canh.khung(f / 30.0).tobytes())
    p.stdin.close()
    p.wait()
    return ra


def main():
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    import lam_video as L
    dau = lam_canh(L.CANH[0], "_dau.mp4", ff)
    ket = lam_canh(L.CANH[-1], "_ket.mp4", ff)
    loc = []
    for i, (n, a, b, v) in enumerate(DOAN):
        loc.append("[%d:v]trim=start=%g:end=%g,setpts=(PTS-STARTPTS)/%g,fps=30,format=yuv420p[v%d]" % (n, a, b, v, i))
    tong = sum((b - a) / v for _, a, b, v in DOAN)
    # doan quay that: mo dan vao / ra cho em khi noi voi canh logo
    loc.append("%sconcat=n=%d:v=1:a=0,fade=t=in:st=0:d=0.4,fade=t=out:st=%g:d=0.4[giua]"
               % ("".join("[v%d]" % i for i in range(len(DOAN))), len(DOAN), tong - 0.4))
    loc.append("[2:v]fps=30,format=yuv420p[dau];[3:v]fps=30,format=yuv420p[ket];[dau][giua][ket]concat=n=3:v=1:a=0[ra]")
    tong += L.CANH[0].giay + L.CANH[-1].giay
    cmd = [ff, "-y", "-loglevel", "error", "-i", A, "-i", B, "-i", dau, "-i", ket, "-filter_complex", ";".join(loc),
           "-map", "[ra]", "-c:v", "libx264", "-crf", "20", "-preset", "medium", "-movflags", "+faststart", OUT]
    subprocess.run(cmd, check=True)
    os.remove(dau)
    os.remove(ket)
    print("%.1f giay -> %s" % (tong, OUT))


if __name__ == "__main__":
    main()
