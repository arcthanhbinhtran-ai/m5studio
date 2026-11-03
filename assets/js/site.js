/* M5 STUDIO - phần dùng chung cho mọi trang.
   Dữ liệu nằm ở thư mục data/, file này chỉ dựng giao diện từ dữ liệu đó. */
(function () {
  "use strict";

  var PLUGINS = window.M5_PLUGINS || [];
  var CAI_DAT = window.M5_CAI_DAT || {};
  // en.anhChup là danh sách chú thích theo thứ tự ảnh -> gắn vào từng ảnh (a.en.chu)
  PLUGINS.forEach(function (p) {
    var ds = p.en && p.en.anhChup;
    if (!ds || !p.anhChup) return;
    p.anhChup.forEach(function (a, i) { if (ds[i]) a.en = { chu: ds[i] }; });
  });

  /* ---------- Ngôn ngữ: tiếng Việt / English ----------
     ?lang=vi|en trên địa chỉ > lựa chọn đã nhớ > tự đoán: máy đặt giờ Việt Nam hoặc trình duyệt
     tiếng Việt thì tiếng Việt, còn lại English. Bản tiếng Anh của dữ liệu nằm trong ô en: { ... }
     (data/plugins.js...), của chữ trong HTML nằm ở thuộc tính data-en. Thiếu thì dùng tiếng Việt. */
  var LANG = (function () {
    var q = new URLSearchParams(location.search).get("lang"), nho = null;
    try { nho = localStorage.getItem("m5lang"); } catch (e) {}
    var l = q || nho;
    if (!l) {
      var tz = "";
      try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
      var ngu = (navigator.languages || [navigator.language || ""]).join(",").toLowerCase();
      l = /Ho_Chi_Minh|Saigon/.test(tz) || /(^|,)vi/.test(ngu) ? "vi" : "en";
    }
    l = l === "en" ? "en" : "vi";
    if (q) { try { localStorage.setItem("m5lang", l); } catch (e) {} }
    return l;
  })();
  var EN = LANG === "en";
  function T(vi, en) { return EN ? en : vi; }
  function L(o, k) { return EN && o && o.en && o.en[k] != null ? o.en[k] : (o ? o[k] : ""); }

  function dichTrang() {
    document.documentElement.lang = LANG;
    if (!EN) return;
    Array.prototype.forEach.call(document.querySelectorAll("[data-en]"), function (el) {
      if (el.tagName === "META") el.setAttribute("content", el.getAttribute("data-en"));
      else el.innerHTML = el.getAttribute("data-en");
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-en-ph]"), function (el) {
      el.setAttribute("placeholder", el.getAttribute("data-en-ph"));
      el.setAttribute("aria-label", el.getAttribute("data-en-ph"));
    });
  }

  /** Link đổi sang ngôn ngữ kia, giữ nguyên trang đang xem (cả ?id=...). */
  function linkNgonNgu(l) {
    var q = new URLSearchParams(location.search);
    q.set("lang", l);
    return location.pathname + "?" + q.toString() + location.hash;
  }

  var ICON = {
    tai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
    tim: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    pdf: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v6h4v-6h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2c-.2-1.6-1-2.6-2.6-2.8C17 5 12 5 12 5s-5 0-7.4.4C3 5.6 2.2 6.6 2 8.2 1.8 9.6 1.8 12 1.8 12s0 2.4.2 3.8c.2 1.6 1 2.6 2.6 2.8C7 19 12 19 12 19s5 0 7.4-.4c1.6-.2 2.4-1.2 2.6-2.8.2-1.4.2-3.8.2-3.8s0-2.4-.2-3.8zM10 15V9l5 3z"/></svg>',
    zalo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v11H11l-5 4v-4H4z" stroke-linejoin="round"/><path d="M8.5 9h3.5l-3.5 4H12M14.5 9v4" stroke-linecap="round"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>'
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function soDep(n) { return Number(n).toLocaleString(EN ? "en-US" : "vi-VN"); }
  function boDau(s) {
    return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
  }
  function $(sel) { return document.querySelector(sel); }

  /* ---------- Đầu trang / chân trang ---------- */
  function dauTrang(trang) {
    var muc = [["index.html", T("Trang chủ", "Home"), "chu"], ["plugin.html", "Plugin", "plugin"], ["thu-vien.html", T("Thư viện", "Library"), "thuvien"], ["bai-viet.html", T("Bài viết", "Articles"), "baiviet"]];
    var nav = muc.map(function (m) {
      return '<a href="' + m[0] + '"' + (m[2] === trang ? ' class="on"' : "") + ">" + m[1] + "</a>";
    }).join("");
    var h = document.createElement("header");
    h.className = "site-head";
    h.innerHTML =
      '<div class="wrap">' +
        '<a class="brand" href="index.html" aria-label="M5 STUDIO - ' + T("Trang chủ", "Home") + '">' +
          '<img src="assets/img/m5-logo-sm.png" alt="M5 STUDIO"></a>' +
        '<nav class="nav" id="nav">' + nav + "</nav>" +
        '<div class="lang-sw" role="group" aria-label="' + T("Ngôn ngữ", "Language") + '">' +
          '<a href="' + esc(linkNgonNgu("vi")) + '" lang="vi"' + (EN ? "" : ' class="on" aria-current="true"') + ' title="Tiếng Việt">VI</a>' +
          '<a href="' + esc(linkNgonNgu("en")) + '" lang="en"' + (EN ? ' class="on" aria-current="true"' : "") + ' title="English">EN</a>' +
        "</div>" +
        '<button class="menu-btn" id="menuBtn" aria-label="' + T("Mở menu", "Open menu") + '">' + ICON.menu + "</button>" +
      "</div>";
    document.body.insertBefore(h, document.body.firstChild);
    $("#menuBtn").addEventListener("click", function () { $("#nav").classList.toggle("open"); });
  }

  function chanTrang() {
    var lh = CAI_DAT.lienHe || {};
    var so = ["youtube", "facebook", "zalo", "github"].filter(function (k) { return lh[k]; }).map(function (k) {
      return '<a href="' + esc(lh[k]) + '" target="_blank" rel="noopener" aria-label="' + k + '">' + ICON[k] + "</a>";
    }).join("");
    var f = document.createElement("footer");
    f.className = "site-foot";
    f.innerHTML =
      '<div class="wrap"><div>' +
        '<a class="brand" href="index.html"><img src="assets/img/m5-logo-sm.png" alt="M5 STUDIO"></a>' +
        "<p>" + T("Plugin và công cụ làm hồ sơ cho người dựng bản vẽ cảnh quan, kiến trúc, quy hoạch.",
                  "Plugins and tools for people who draft landscape, architecture and planning drawings.") + " © " +
        new Date().getFullYear() + " M5 STUDIO.</p>" +
      '</div><div class="social">' + so + "</div></div>";
    document.body.appendChild(f);
  }

  /* ---------- Thẻ plugin ---------- */
  function nhanGia(p) {
    if (p.trangThai === "sap-ra-mat") return '<span class="price soon">' + T("Sắp ra mắt", "Coming soon") + "</span>";
    if (p.trangThai === "pro") return '<span class="price pro">' + esc(p.gia || T("Có phí", "Paid")) + "</span>";
    return '<span class="price free">' + T("Miễn phí", "Free") + "</span>";
  }
  function linkChiTiet(p) { return "chi-tiet.html?id=" + encodeURIComponent(p.id); }

  function theePlugin(p) {
    var taiDuoc = p.taiVe && p.trangThai !== "sap-ra-mat";
    var luot = p.luotTai != null ? '<span class="dl">' + ICON.tai + soDep(p.luotTai) + "</span>" : "<span>" + (p.phienBan ? "v" + esc(p.phienBan) : "") + "</span>";
    return '<article class="card">' +
      '<a class="pic" href="' + linkChiTiet(p) + '">' +
        (p.deXuat ? '<span class="tag">' + T("ĐỀ XUẤT", "FEATURED") + "</span>" : "") +
        '<img src="' + esc(p.anh) + '" alt="' + esc(p.ten) + '" loading="lazy"></a>' +
      '<div class="body">' + (p.phanMem ? '<span class="soft">' + esc(p.phanMem) + '</span>' : '') + '<h3><a href="' + linkChiTiet(p) + '">' + esc(p.ten) + "</a></h3>" +
        '<p class="desc">' + esc(L(p, "moTaNgan")) + "</p>" + nhanGia(p) + "</div>" +
      '<div class="foot">' + luot +
        (taiDuoc
          ? '<a class="go" href="' + linkChiTiet(p) + '">' + T("Tải về", "Download") + " ↗</a>"
          : '<a class="go" href="' + linkChiTiet(p) + '">' + T("Xem chi tiết", "Details") + " ↗</a>") +
      "</div></article>";
  }

  /* ---------- Trang chủ ---------- */
  function trangChu() {
    var noiBat = PLUGINS.filter(function (p) { return p.deXuat; });
    if (!noiBat.length) noiBat = PLUGINS;
    $("#noiBat").innerHTML = noiBat.concat(PLUGINS.filter(function (p) { return !p.deXuat; })).slice(0, 4).map(theePlugin).join("");
    $("#soPlugin").textContent = PLUGINS.length;
    $("#soMienPhi").textContent = PLUGINS.filter(function (p) { return p.trangThai === "mien-phi"; }).length;
  }

  /* ---------- Trang danh sách plugin ---------- */
  function trangPlugin() {
    var loc = "tat-ca", tu = "", pm = "";
    var hop = $("#luoi"), dem = $("#dem");
    $("#tongPlugin").textContent = PLUGINS.length;
    var tongTai = PLUGINS.reduce(function (s, p) { return s + (p.luotTai || 0); }, 0);
    if (tongTai > 0) { $("#tongTai").textContent = soDep(tongTai); $("#oTongTai").hidden = false; }

    function ve() {
      var k = boDau(tu.trim());
      var ds = PLUGINS.filter(function (p) {
        if (loc !== "tat-ca" && p.trangThai !== loc) return false;
        if (pm && p.phanMem !== pm) return false;
        if (!k) return true;
        return boDau(p.ten + " " + (p.phanMem || "") + " " + L(p, "moTaNgan") + " " + (L(p, "tinhNang") || []).join(" ")).indexOf(k) >= 0;
      });
      hop.innerHTML = ds.length ? ds.map(theePlugin).join("") :
        '<div class="empty">' + T('Không có plugin nào khớp. Thử bỏ bớt chữ tìm hoặc chọn "Tất cả".',
                                  'No plugin matches. Try fewer words or choose "All".') + "</div>";
      dem.textContent = ds.length + (EN && ds.length !== 1 ? " plugins" : " plugin");
    }
    var nut = document.querySelectorAll("#loc button");
    Array.prototype.forEach.call(nut, function (b) {
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(nut, function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        loc = b.getAttribute("data-loc");
        ve();
      });
    });
    // Hàng chọn phần mềm: chỉ hiện khi có từ 2 phần mềm trở lên
    var dsPm = [];
    PLUGINS.forEach(function (p) { if (p.phanMem && dsPm.indexOf(p.phanMem) < 0) dsPm.push(p.phanMem); });
    var hopPm = $("#locPm");
    if (hopPm && dsPm.length > 1) {
      hopPm.hidden = false;
      hopPm.innerHTML = '<button class="on" data-pm="">' + T("Mọi phần mềm", "All software") + "</button>" + dsPm.map(function (x) {
        return '<button data-pm="' + esc(x) + '">' + esc(x) + "</button>";
      }).join("");
      Array.prototype.forEach.call(hopPm.querySelectorAll("button"), function (b) {
        b.addEventListener("click", function () {
          Array.prototype.forEach.call(hopPm.querySelectorAll("button"), function (x) { x.classList.remove("on"); });
          b.classList.add("on");
          pm = b.getAttribute("data-pm");
          ve();
        });
      });
    }
    $("#tim").addEventListener("input", function (e) { tu = e.target.value; ve(); });
    ve();
  }

  /* ---------- Trang chi tiết ---------- */
  function maYoutube(link) {
    if (!link) return "";
    var m = String(link).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    if (m) return m[1];
    return /^[\w-]{11}$/.test(link) ? link : "";
  }

  function khungUngHo() {
    var u = CAI_DAT.ungHo;
    if (!u) return "";
    var muc = u.mucTien || [];
    var nutMuc = muc.length ? '<div class="amounts">' + muc.map(function (m, i) {
      return '<button data-qr="' + esc(m.maQR) + '" data-nd="' + esc(m.noiDung || u.noiDung) + '"' + (i === 0 ? ' class="on"' : "") + ">" + esc(L(m, "nhan")) + "</button>";
    }).join("") + "</div>" : "";
    return '<section class="panel donate"><div class="pad">' +
      "<h3>" + esc(L(u, "tieuDe")) + "</h3><p>" + esc(L(u, "loiNhan")) + "</p>" + nutMuc +
      '<div class="box"><div class="qr"><img id="maQR" src="' + esc(muc.length ? muc[0].maQR : u.maQR) + '" alt="' + T("Mã QR chuyển khoản ", "Bank transfer QR code ") + esc(u.nganHang) + '">' +
        "<small>" + T("Quét bằng app ngân hàng", "Scan with a Vietnamese banking app") + "</small></div>" +
      '<div class="acct"><span>' + esc(u.nganHang) + "</span>" +
        '<span class="num">' + esc(u.soTaiKhoan) + '<button class="copy" data-chep="' + esc(u.soTaiKhoan) + '">' + T("Chép", "Copy") + "</button></span>" +
        "<span>" + T("Chủ tài khoản", "Account holder") + ": <b>" + esc(u.chuTaiKhoan) + "</b></span>" +
        "<span>" + T("Nội dung", "Message") + ': <b id="noiDung">' + esc(muc.length && muc[0].noiDung ? muc[0].noiDung : u.noiDung) + "</b></span>" +
      "</div></div>" +
      (EN && u.en && u.en.ghiChu ? '<p class="note">' + esc(u.en.ghiChu) + "</p>" : "") +
      "</div></section>";
  }

  function trangChiTiet() {
    var id = new URLSearchParams(location.search).get("id");
    var p = PLUGINS.filter(function (x) { return x.id === id; })[0];
    var hop = $("#chiTiet");
    if (!p) {
      hop.innerHTML = '<div class="empty" style="margin:60px 0">' + T("Không tìm thấy plugin này. ", "Plugin not found. ") +
        '<a href="plugin.html" style="color:var(--accent);font-weight:700">' + T("Xem danh sách plugin", "See all plugins") + "</a></div>";
      return;
    }
    document.title = p.ten + " — M5 STUDIO";
    var mo = document.querySelector('meta[name="description"]');
    if (mo) mo.setAttribute("content", L(p, "moTaNgan"));

    var giaHien = p.trangThai === "sap-ra-mat" ? '<b class="red">' + T("Sắp ra mắt", "Coming soon") + "</b>"
      : p.trangThai === "pro" ? '<b class="red">' + esc(p.gia || T("Có phí", "Paid")) + "</b>"
      : '<b class="free">' + T("Tải miễn phí", "Free download") + "</b>";
    var taiDuoc = p.taiVe && p.trangThai !== "sap-ra-mat";
    var nutTai = taiDuoc
      ? '<a class="btn main" id="nutTai" href="' + esc(p.taiVe) + '" target="_blank" rel="noopener">' + ICON.tai.replace("<svg", '<svg width="18" height="18"') + (EN ? "Download" : "Tải " + esc(p.ten)) + "</a>"
      : '<span class="btn main off" title="' + T("Plugin này chưa phát hành", "Not released yet") + '">' + T("Sắp ra mắt", "Coming soon") + "</span>";

    var yt = maYoutube(p.video);
    var video = yt
      ? '<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/' + yt + '" title="' + T("Video hướng dẫn ", "Video guide ") + esc(p.ten) + '" allowfullscreen loading="lazy"></iframe></div>' +
        '<div class="pad"><div class="lab">' + T("Video hướng dẫn", "Video guide") + '</div><a href="https://www.youtube.com/watch?v=' + yt + '" target="_blank" rel="noopener" style="font-weight:700">' + T("Mở trên YouTube", "Open on YouTube") + " ↗</a>" +
        (EN ? '<div class="note">The video is in Vietnamese.</div>' : "") + "</div>"
      : '<div class="video none"><div>' + ICON.video + T("Video hướng dẫn sắp có", "Video guide coming soon") + "</div></div>" +
        '<div class="pad"><div class="lab">' + T("Video hướng dẫn", "Video guide") + "</div>" + T("Đang quay, sẽ cập nhật ở đây.", "Being recorded, it will appear here.") + "</div>";

    hop.innerHTML =
      '<div class="detail"><div>' +
        '<div class="crumb"><a href="plugin.html">Plugin</a> / ' + esc(p.ten) + "</div>" +
        '<div class="kicker">PLUGIN' + (p.phanMem ? " " + esc(p.phanMem).toUpperCase() : "") + "</div>" +
        (p.deXuat ? '<span class="badge">' + T("ĐỀ XUẤT", "FEATURED") + "</span>" : "") +
        "<h1>" + esc(p.ten) + "</h1>" +
        '<p class="lead">' + esc(L(p, "moTa")) + "</p>" +
        (EN && p.en && p.en.giaoDien ? '<p class="note lang-note">' + esc(p.en.giaoDien) + "</p>" : "") +
        '<div class="meta">' +
          (p.luotTai != null ? "<span>" + T("Lượt tải", "Downloads") + "<b class=\"red\">" + soDep(p.luotTai) + "</b></span>" : "") +
          (p.phienBan || p.github ? "<span>" + T("Phiên bản", "Version") + "<b id=\"phienBan\">" + (p.phienBan ? "v" + esc(p.phienBan) : "…") + "</b></span>" : "") +
          "<span>" + T("Giá", "Price") + giaHien + "</span>" +
          (p.yeuCau ? "<span>" + T("Dùng cho", "Works with") + "<b>" + esc(L(p, "yeuCau")) + "</b></span>" : "") +
        "</div>" +
        '<div class="actions">' + nutTai + '<a class="btn" href="plugin.html">' + T("Xem plugin khác", "Other plugins") + "</a></div>" +
        (p.huongDan ? '<a class="btn guide" href="' + esc(p.huongDan) + '" target="_blank" rel="noopener">' +
          ICON.pdf + T("Hướng dẫn sử dụng (PDF)", "User guide (PDF, Vietnamese)") + "</a>" : "") +
        (taiDuoc ? '<p class="note" id="ghiChuTai">' + T("Tải về, giải nén, đóng AutoCAD rồi chạy <b>CaiDat.bat</b>.",
                                                       "Download, unzip, close AutoCAD and run <b>CaiDat.bat</b>.") + "</p>" : "") +
        (L(p, "tinhNang") && L(p, "tinhNang").length ? '<ul class="feat">' + L(p, "tinhNang").map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "") +
      "</div><div>" +
        '<section class="panel">' + video + "</section>" +
        khungUngHo() +
      "</div></div>" +
      (p.anhChup && p.anhChup.length
        ? '<section class="shots"><h2>' + T("Ảnh chụp giao diện", "Screenshots") + '</h2><div class="shot-grid">' +
          p.anhChup.map(function (a) {
            var chu = L(a, "chu");
            return '<figure class="shot"><img src="' + esc(a.anh) + '" alt="' + esc(chu) + '" loading="lazy"><figcaption>' + esc(chu) + "</figcaption></figure>";
          }).join("") + "</div></section>"
        : "");

    // Bản mới nhất trên GitHub Releases: nút Tải trỏ thẳng file .zip, số phiên bản theo GitHub.
    // Không đọc được (mất mạng, GitHub chặn) thì giữ link trang phát hành trong taiVe.
    if (p.github && taiDuoc && window.fetch) {
      fetch("https://api.github.com/repos/" + p.github + "/releases/latest")
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) {
          if (!d) return;
          // Luôn tải file .zip: trình duyệt / Windows hay chặn file .exe tải thẳng về.
          // Bộ cài .exe nằm SẴN trong zip (giải nén rồi bấm đúp).
          var zip = (d.assets || []).filter(function (a) { return /\.zip$/i.test(a.name); })[0];
          var gc = $("#ghiChuTai");
          // Bộ cài chưa có chữ ký số: Windows có thể cảnh báo, chỉ cách qua
          if (gc && zip) gc.innerHTML = T(
            "Tải về, <b>giải nén</b>, đóng AutoCAD rồi <b>bấm đúp file _CaiDat.exe</b> trong thư mục vừa giải nén " +
            "(bản nào chưa có file .exe thì chạy <b>CaiDat.bat</b>).<br>" +
            "• Windows hiện khung xanh “Windows protected your PC”: bấm <b>More info → Run anyway</b>.<br>" +
            "File an toàn — cảnh báo hiện vì bộ cài chưa có chữ ký số và còn ít người tải.",
            "Download, <b>unzip</b>, close AutoCAD, then <b>double-click the _CaiDat.exe file</b> in the unzipped folder " +
            "(older versions without an .exe: run <b>CaiDat.bat</b>).<br>" +
            "• If Windows shows “Windows protected your PC”: click <b>More info → Run anyway</b>.<br>" +
            "The file is safe — the warning appears because the installer is not code-signed yet and has few downloads.");
          if (zip) {
            var nut = $("#nutTai");
            nut.href = zip.browser_download_url;
            nut.removeAttribute("target");
            nut.title = T("Tải ", "Download ") + zip.name + " (" + Math.round(zip.size / 1024) + " KB)";
          }
          var pb = $("#phienBan");
          if (pb && d.tag_name) pb.textContent = d.tag_name.replace(/^V/, "v");
        })
        .catch(function () {});
    }

    // Phóng to ảnh chụp
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = "<img alt=\"\">";
    document.body.appendChild(lb);
    lb.addEventListener("click", function () { lb.classList.remove("on"); });
    Array.prototype.forEach.call(document.querySelectorAll(".shot img"), function (im) {
      im.addEventListener("click", function () { lb.firstChild.src = im.src; lb.classList.add("on"); });
    });
    // Chọn mức ủng hộ -> đổi mã QR
    var nutTien = document.querySelectorAll(".amounts button");
    Array.prototype.forEach.call(nutTien, function (b) {
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(nutTien, function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        $("#maQR").src = b.getAttribute("data-qr");
        $("#noiDung").textContent = b.getAttribute("data-nd");
      });
    });
    // Nút chép số tài khoản
    Array.prototype.forEach.call(document.querySelectorAll("[data-chep]"), function (b) {
      b.addEventListener("click", function () {
        var s = b.getAttribute("data-chep");
        var xong = function () { b.textContent = T("Đã chép", "Copied"); setTimeout(function () { b.textContent = T("Chép", "Copy"); }, 1500); };
        if (navigator.clipboard) navigator.clipboard.writeText(s).then(xong, function () {});
      });
    });
  }

  /* ---------- Thư viện ---------- */
  function trangThuVien() {
    var nhom = window.M5_THU_VIEN_NHOM || [];
    var ds = window.M5_THU_VIEN || [];
    var dangNhom = nhom.length ? nhom[0].id : "", tu = "";
    var segHop = $("#nhom");
    segHop.innerHTML = nhom.map(function (n, i) {
      return '<button data-nhom="' + esc(n.id) + '"' + (i === 0 ? ' class="on"' : "") + ">" + esc(L(n, "ten")) + "</button>";
    }).join("");

    function ve() {
      var k = boDau(tu.trim());
      var co = ds.filter(function (m) {
        return m.nhom === dangNhom && (!k || boDau(L(m, "ten") + " " + (L(m, "loai") || "")).indexOf(k) >= 0);
      });
      var tenNhom = L(nhom.filter(function (n) { return n.id === dangNhom; })[0] || {}, "ten") || "";
      var html = co.map(function (m) {
        return '<article class="card"><a class="pic" href="' + esc(m.taiVe || "#") + '" target="_blank" rel="noopener">' +
          '<img src="' + esc(m.anh) + '" alt="' + esc(L(m, "ten")) + '" loading="lazy"></a>' +
          '<div class="body"><h3>' + esc(L(m, "ten")) + "</h3>" +
          (m.mienPhi === false ? '<span class="price pro">' + T("Có phí", "Paid") + "</span>" : '<span class="price free">' + T("Miễn phí", "Free") + "</span>") + "</div>" +
          '<div class="foot"><span>' + (m.luotTai != null ? '<span class="dl">' + ICON.tai + soDep(m.luotTai) + "</span>" : esc(L(m, "loai") || "")) + "</span>" +
          '<a class="go" href="' + esc(m.taiVe || "#") + '" target="_blank" rel="noopener">' + T("Tải về", "Download") + " ↗</a></div></article>";
      }).join("");
      if (!co.length && !k) {
        for (var i = 0; i < 4; i++) {
          html += '<article class="card soon-card"><div class="pic">' + T("SẮP CÓ", "SOON") + "</div>" +
            '<div class="body"><h3>' + esc(tenNhom) + "</h3>" +
            '<span class="price soon">' + T("Sắp có", "Coming soon") + '</span></div><div class="foot"><span>M5 Library</span></div></article>';
        }
      } else if (!co.length) {
        html = '<div class="empty">' + T("Không có mục nào khớp.", "Nothing matches.") + "</div>";
      }
      $("#luoi").innerHTML = html;
      $("#dem").textContent = co.length + T(" mục", co.length === 1 ? " item" : " items");
    }
    Array.prototype.forEach.call(segHop.querySelectorAll("button"), function (b) {
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(segHop.querySelectorAll("button"), function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        dangNhom = b.getAttribute("data-nhom");
        ve();
      });
    });
    $("#tim").addEventListener("input", function (e) { tu = e.target.value; ve(); });
    ve();
  }

  /* ---------- Bài viết ---------- */
  function trangBaiViet() {
    var ds = (window.M5_BAI_VIET || []).slice().sort(function (a, b) { return a.ngay < b.ngay ? 1 : -1; });
    var tu = "";
    function ngayDep(s) {
      var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
      return m ? (EN ? m[1] + "-" + m[2] + "-" + m[3] : m[3] + "/" + m[2] + "/" + m[1]) : (s || "");
    }
    function ve() {
      var k = boDau(tu.trim());
      var co = ds.filter(function (b) { return !k || boDau(L(b, "tieuDe") + " " + (L(b, "tomTat") || "")).indexOf(k) >= 0; });
      var html = co.map(function (b) {
        var ngoai = /^https?:/.test(b.link || "");
        var mo = ngoai ? ' target="_blank" rel="noopener"' : "";
        return '<article class="card post"><a class="pic" href="' + esc(b.link || "#") + '"' + mo + ">" +
          (b.anh ? '<img src="' + esc(b.anh) + '" alt="' + esc(L(b, "tieuDe")) + '" loading="lazy">' : '<span class="post-no">M5</span>') + "</a>" +
          '<div class="body"><span class="soft">' + esc(ngayDep(b.ngay)) + (b.nhan ? " · " + esc(L(b, "nhan")) : "") + "</span>" +
          '<h3><a href="' + esc(b.link || "#") + '"' + mo + ">" + esc(L(b, "tieuDe")) + "</a></h3>" +
          '<p class="desc">' + esc(L(b, "tomTat") || "") + "</p></div>" +
          '<div class="foot"><span></span><a class="go" href="' + esc(b.link || "#") + '"' + mo + ">" + T("Đọc tiếp", "Read more") + " ↗</a></div></article>";
      }).join("");
      if (!ds.length) {
        for (var i = 0; i < 3; i++) {
          html += '<article class="card soon-card"><div class="pic">' + T("SẮP CÓ", "SOON") + "</div>" +
            '<div class="body"><h3>' + T("Bài viết", "Article") + '</h3><span class="price soon">' + T("Sắp có", "Coming soon") + "</span></div>" +
            '<div class="foot"><span>M5 STUDIO</span></div></article>';
        }
      } else if (!co.length) {
        html = '<div class="empty">' + T("Không có bài nào khớp.", "No article matches.") + "</div>";
      }
      $("#luoi").innerHTML = html;
      $("#dem").textContent = co.length + T(" bài", co.length === 1 ? " article" : " articles");
    }
    $("#tim").addEventListener("input", function (e) { tu = e.target.value; ve(); });
    ve();
  }

  /* ---------- Bộ đếm lượt xem (GoatCounter, không dùng cookie) ---------- */
  // Mã lấy ở data/cai-dat.js (thongKe.goatcounter). Để trống thì không đếm gì.
  function boDem(trang) {
    var tk = CAI_DAT.thongKe || {};
    var ma = tk.goatcounter;
    if (!ma) return;
    var id = new URLSearchParams(location.search).get("id");
    window.goatcounter = {
      // trang chi tiết đếm riêng từng plugin: /plugin/m5-do-dac, /plugin/alo...
      path: function (p) { return trang === "chitiet" && id ? "/plugin/" + id : p; },
      allow_local: !!tk.demCaMayNha
    };
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.setAttribute("data-goatcounter", "https://" + ma + ".goatcounter.com/count");
    document.body.appendChild(s);

    // Đếm lượt bấm: tải plugin, xem hướng dẫn PDF, mở GitHub / Facebook...
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (!a || !a.href) return;
      var ten = "";
      if (a.id === "nutTai") ten = "bam-tai/" + (id || "");
      else if (/\.pdf($|\?)/i.test(a.href)) ten = "bam-huong-dan/" + (id || "");
      else if (a.hostname && a.hostname !== location.hostname) ten = "mo-link/" + a.hostname.replace(/^www\./, "");
      if (!ten) return;
      try {
        if (window.goatcounter && window.goatcounter.count)
          window.goatcounter.count({ path: ten, title: a.textContent.trim().slice(0, 80), event: true });
      } catch (loi) {}
    }, true);
  }

  /* ---------- Khởi động ---------- */
  var trang = document.body.getAttribute("data-page");
  dichTrang();
  dauTrang(trang);
  chanTrang();
  if (trang === "chu") trangChu();
  else if (trang === "plugin") trangPlugin();
  else if (trang === "chitiet") trangChiTiet();
  else if (trang === "thuvien") trangThuVien();
  else if (trang === "baiviet") trangBaiViet();
  boDem(trang);
  window.M5_ICON = ICON;
})();
