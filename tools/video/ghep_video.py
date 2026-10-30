# Ghep video day du: canh trinh chieu (lam_video.py) xen ke canh quay that (cat_video.py).
# Moi chuc nang: slide giai thich truoc, canh quay that ngay sau.
# Chay: python tools/video/ghep_video.py  ->  tools/video/M5DODAC_DayDu.mp4
import os, subprocess
import imageio_ffmpeg
import lam_video as L
from cat_video import A, B

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "M5DODAC_DayDu.mp4")

# ("canh", so canh trong lam_video.CANH)  hoac  ("quay", [(nguon, bat dau, ket thuc, toc do), ...])
KICH_BAN = [
    # ("canh", so canh, so giay)  - slide rut ngan con 3-4 giay
    ("canh", 0, 3),     # mo dau logo
    ("canh", 1, 4),     # tai ve tu web
    ("quay", [(0, 4.5, 14.0, 1.75), (0, 25.6, 27.6, 1.5)]),         # giai nen, cai that, Always Load
    ("canh", 6, 4),     # chon don vi ve
    ("canh", 7, 3),     # bam TONG CHIEU DAI
    ("quay", [(0, 45.5, 51.0, 1.25), (0, 57.0, 63.0, 1.25)]),        # do chieu dai that
    ("canh", 10, 3),    # Ctrl+V vao Excel
    ("canh", 11, 3),    # bam DIEN TICH
    ("quay", [(0, 65.5, 76.0, 1.25)]),                               # do dien tich, polyline ho
    ("canh", 14, 4),    # tru chong lan, m2 / ha
    ("quay", [(0, 83.0, 92.0, 1.75)]),                               # doi don vi that
    ("quay", [(1, 1.0, 9.0, 2.0), (1, 9.0, 21.0, 1.5), (1, 22.0, 28.0, 1.5)]),  # quy hoach that, theo layer
    ("canh", 16, 4),    # cap nhat
    ("canh", 17, 4),    # ket
]


def main():
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    tam = []
    vao = ["-i", A, "-i", B]
    loc = []
    nhan = []
    tong = 0.0
    so_vao = 2
    for k, muc in enumerate(KICH_BAN):
        loai, gt = muc[0], muc[1]
        if loai == "canh":
            c = L.CANH[gt]
            c.giay = KICH_BAN[k][2]
            ra = os.path.join(HERE, "_canh%02d.mp4" % k)
            p = subprocess.Popen([ff, "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
                                  "-s", "1920x1080", "-r", "30", "-i", "-", "-c:v", "libx264", "-crf", "18",
                                  "-pix_fmt", "yuv420p", ra], stdin=subprocess.PIPE)
            c.tinh()
            for f in range(int(c.giay * 30)):
                p.stdin.write(c.khung(f / 30.0).tobytes())
            p.stdin.close()
            p.wait()
            tam.append(ra)
            vao += ["-i", ra]
            loc.append("[%d:v]fps=30,format=yuv420p[s%d]" % (so_vao, k))
            so_vao += 1
            tong += c.giay
        else:
            ten = []
            dai = 0.0
            for j, (n, a, b, v) in enumerate(gt):
                loc.append("[%d:v]trim=start=%g:end=%g,setpts=(PTS-STARTPTS)/%g,fps=30,format=yuv420p[q%d_%d]"
                           % (n, a, b, v, k, j))
                ten.append("[q%d_%d]" % (k, j))
                dai += (b - a) / v
            loc.append("%sconcat=n=%d:v=1:a=0,fade=t=in:st=0:d=0.3,fade=t=out:st=%g:d=0.3[s%d]"
                       % ("".join(ten), len(ten), dai - 0.3, k))
            tong += dai
        nhan.append("[s%d]" % k)
        print("xong muc", k + 1, "/", len(KICH_BAN), flush=True)
    loc.append("%sconcat=n=%d:v=1:a=0[ra]" % ("".join(nhan), len(nhan)))
    cmd = [ff, "-y", "-loglevel", "error"] + vao + ["-filter_complex", ";".join(loc), "-map", "[ra]",
                                                    "-c:v", "libx264", "-crf", "20", "-preset", "medium",
                                                    "-movflags", "+faststart", OUT]
    subprocess.run(cmd, check=True)
    for t in tam:
        os.remove(t)
    print("%.1f giay -> %s" % (tong, OUT))


if __name__ == "__main__":
    main()
