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
    (1, 1.0, 13.0, 1.0),    # ban ve quy hoach that: chon, ra bang
    (1, 22.0, 28.0, 1.0),   # phong to cho chong lan
]


def main():
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    loc = []
    for i, (n, a, b, v) in enumerate(DOAN):
        loc.append("[%d:v]trim=start=%g:end=%g,setpts=(PTS-STARTPTS)/%g,fps=30,format=yuv420p[v%d]" % (n, a, b, v, i))
    tong = sum((b - a) / v for _, a, b, v in DOAN)
    loc.append("%sconcat=n=%d:v=1:a=0,fade=t=in:st=0:d=0.4,fade=t=out:st=%g:d=0.5[ra]"
               % ("".join("[v%d]" % i for i in range(len(DOAN))), len(DOAN), tong - 0.5))
    cmd = [ff, "-y", "-loglevel", "error", "-i", A, "-i", B, "-filter_complex", ";".join(loc),
           "-map", "[ra]", "-c:v", "libx264", "-crf", "20", "-preset", "medium", "-movflags", "+faststart", OUT]
    subprocess.run(cmd, check=True)
    print("%.1f giay -> %s" % (tong, OUT))


if __name__ == "__main__":
    main()
