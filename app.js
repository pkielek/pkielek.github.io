

(function () {
  "use strict";

  /* --------------------------------------------------------------- setup */

  var C          = 500;   /* dial centre, in viewBox units                  */
  var R_IN       =  46;   /* the cone's apex — small, so it reads as a cone */
  var R_OUT      = 424;   /* the cone's wide end                            */
  var GAP        = 1.8;   /* angular gap between cones, in degrees          */
  var R_LABEL    = 312;   /* where the section label sits                   */
  var R_HIT      = 250;   /* inside this the cone is haze — ignore the mouse*/
  var LBL_PAD    =  14;   /* clearance a label keeps at each end            */
  var R_TICK_A   = 428;   /* minor tick, inner                              */
  var R_TICK_B   = 436;   /* minor tick, outer                              */
  var R_TICK_MAJ = 442;   /* major tick, outer                              */
  var R_MARK_ARC = 456;   /* the reading mark's arc                         */
  var R_MARK_1   = 462;   /* mark stem, inner                               */
  var R_MARK_2   = 482;   /* mark stem, outer                               */
  var R_MARK_DOT = 488;   /* mark dot                                       */
  var IMG_BLEED  = 1.02;  /* margin on the photo square, against rounding   */

  var FOCUS_WORDS = {
    top:    [50,   0], bottom: [50, 100],
    left:   [ 0,  50], right:  [100, 50],
    center: [50,  50]
  };

  function focusPercent(f) {
    if (!f) return FOCUS_WORDS.center;
    if (FOCUS_WORDS[f]) return FOCUS_WORDS[f];
    var m = String(f).match(/(-?[\d.]+)%\s+(-?[\d.]+)%/);
    return m ? [parseFloat(m[1]), parseFloat(m[2])] : FOCUS_WORDS.center;
  }

  function focusAlign(f) {
    var p = focusPercent(f);
    return (p[0] < 34 ? "xMin" : p[0] > 66 ? "xMax" : "xMid") +
           (p[1] < 34 ? "YMin" : p[1] > 66 ? "YMax" : "YMid");
  }

  function focusPosition(f) {
    var p = focusPercent(f);
    return p[0] + "% " + p[1] + "%";
  }

  var READ_ANGLE = 90;    /* a chosen cone travels to 3 o'clock             */

  var LANGS    = ["en", "pl"];
  var LANG_KEY = "portfolio-lang";
  var lang     = pickLang();

  var data     = localize(window.CONTENT, lang);
  var SECTIONS = data.sections;
  var N        = SECTIONS.length;
  var SEG      = 360 / N;

  function localize(node, l) {
    if (Array.isArray(node)) return node.map(function (n) { return localize(n, l); });
    if (node === null || typeof node !== "object") return node;

    var keys = Object.keys(node);
    var isPair = keys.length > 0 && keys.every(function (k) { return LANGS.indexOf(k) >= 0; });
    if (isPair) return localize(node[l] !== undefined ? node[l] : node[LANGS[0]], l);

    var out = {};
    keys.forEach(function (k) { out[k] = localize(node[k], l); });
    return out;
  }

  function pickLang() {
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (LANGS.indexOf(saved) >= 0) return saved;
    } catch (e) { /* private mode */ }
    var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) >= 0 ? nav : LANGS[0];
  }

  var stage      = document.getElementById("stage");
  var dialWrap   = document.getElementById("dialWrap");
  var defs       = document.querySelector("#dial defs");
  var gWedges    = document.getElementById("wedges");
  var gTicks     = document.getElementById("ticks");
  var gLabels    = document.getElementById("labels");
  var gWheel     = document.getElementById("wheel");
  var gMarker    = document.getElementById("marker");
  var markerArc  = document.getElementById("markerArc");
  var hub        = document.getElementById("hub");
  var hubDefault = document.getElementById("hubDefault");
  var hubFocus   = document.getElementById("hubFocus");
  var panel      = document.getElementById("panel");
  var panelInner = document.getElementById("panelInner");
  var scrimClose = document.getElementById("scrimClose");
  var langBar    = document.getElementById("lang");

  var photos = [];   /* the <image> in each cone, so they can be kept upright */

  var current   = -1;     /* -1 = default state                             */
  var accWheel  = 0;      /* accumulated wheel rotation, never wrapped      */
  var accMarker = 0;      /* accumulated mark rotation                      */

  var SVG_NS = "http://www.w3.org/2000/svg";

  /* ------------------------------------------------------------ geometry */

  function centerAngle(i) { return i * SEG + SEG / 2; }

  function polar(angle, radius) {
    var rad = (angle - 90) * Math.PI / 180;
    return [C + radius * Math.cos(rad), C + radius * Math.sin(rad)];
  }

  function fmt(n) { return Math.round(n * 100) / 100; }

  function arcPath(a0, a1, r) {
    var p0 = polar(a0, r), p1 = polar(a1, r);
    var large = (a1 - a0) > 180 ? 1 : 0;
    return "M" + fmt(p0[0]) + "," + fmt(p0[1]) +
           " A" + r + "," + r + " 0 " + large + " 1 " + fmt(p1[0]) + "," + fmt(p1[1]);
  }


  function conePath(a0, a1, r0, r1) {
    var large = (a1 - a0) > 180 ? 1 : 0;
    var o0 = polar(a0, r1), o1 = polar(a1, r1);
    var i1 = polar(a1, r0), i0 = polar(a0, r0);
    return "M" + fmt(o0[0]) + "," + fmt(o0[1]) +
           " A" + r1 + "," + r1 + " 0 " + large + " 1 " + fmt(o1[0]) + "," + fmt(o1[1]) +
           " L" + fmt(i1[0]) + "," + fmt(i1[1]) +
           " A" + r0 + "," + r0 + " 0 " + large + " 0 " + fmt(i0[0]) + "," + fmt(i0[1]) + " Z";
  }

  function conePhoto(a0, a1, r0, r1) {
    var half = (a1 - a0) / 2 * Math.PI / 180;
    var cosH = Math.cos(half);
    var d    = (r0 + r1) / (2 * cosH);
    var R    = Math.sqrt(d * d + r1 * r1 - 2 * d * r1 * cosH);
    var c    = polar((a0 + a1) / 2, d);
    return { cx: c[0], cy: c[1], side: 2 * R * IMG_BLEED };
  }

  function el(name, attrs) {
    var node = document.createElementNS(SVG_NS, name);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) node.setAttribute(k, attrs[k]);
    return node;
  }

  /* --------------------------------------------------------------- icons */

  var ICONS = {
    code:  '<path d="M9 5 4 12l5 7"/><path d="M15 5l5 7-5 7"/>',
    case:  '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7"/><path d="M3 12h18"/>',
    mail:  '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    doc:   '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    right: '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
    left:  '<path d="M20 12H5"/><path d="m11 6-6 6 6 6"/>',
    home:  '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.4"/>',
    pin:   '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',

    github:   '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
    linkedin: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>'
  };

  var SOLID = { github: 1, linkedin: 1 };

  function icon(name, size) {
    var solid = SOLID[name];
    return '<svg viewBox="' + (solid ? "-2.5 -2.5 29 29" : "0 0 24 24") +
           '" width="' + (size || 24) + '" height="' + (size || 24) + '" ' +
           (solid
             ? 'fill="currentColor" stroke="none"'
             : 'fill="none" stroke="currentColor" stroke-width="1.6" ' +
               'stroke-linecap="round" stroke-linejoin="round"') +
           ' aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }

  /* --------------------------------------------------------- build dial  */

  function buildTicks() {
    for (var a = 0; a < 360; a += 6) {
      var major = (a % SEG === 0);
      var p0 = polar(a, major ? R_TICK_A - 4 : R_TICK_A);
      var p1 = polar(a, major ? R_TICK_MAJ : R_TICK_B);
      gTicks.appendChild(el("line", {
        x1: fmt(p0[0]), y1: fmt(p0[1]), x2: fmt(p1[0]), y2: fmt(p1[1]),
        "class": major ? "tick-major" : "tick-minor"
      }));
    }
  }

  function buildWedges() {
    SECTIONS.forEach(function (sec, i) {
      var a0  = i * SEG + GAP / 2;
      var a1  = (i + 1) * SEG - GAP / 2;
      var mid = centerAngle(i);
      var d   = conePath(a0, a1, R_IN, R_OUT);

      var cp = el("clipPath", { id: "wclip-" + i, clipPathUnits: "userSpaceOnUse" });
      cp.appendChild(el("path", { d: d }));
      defs.appendChild(cp);

      var ph = conePhoto(a0, a1, R_IN, R_OUT);
      var img = el("image", {
        href: sec.image.src,
        x: fmt(ph.cx - ph.side / 2),
        y: fmt(ph.cy - ph.side / 2),
        width: fmt(ph.side),
        height: fmt(ph.side),
        preserveAspectRatio: focusAlign(sec.image.focus) + " slice"
      });
      img.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", sec.image.src);
      img.style.transformOrigin = fmt(ph.cx) + "px " + fmt(ph.cy) + "px";
      photos.push(img);

      var photo = el("g", { "class": "w-photo", "clip-path": "url(#wclip-" + i + ")" });
      photo.appendChild(img);

      var dir = polar(mid, 1);
      var g = el("g", {
        "class": "wedge",
        "data-index": i,
        role: "button",
        tabindex: "0",
        "aria-label": sec.title
      });
      g.style.setProperty("--dx", fmt(dir[0] - C));
      g.style.setProperty("--dy", fmt(dir[1] - C));

      g.appendChild(photo);
      g.appendChild(el("path", { "class": "w-scrim", d: d }));
      g.appendChild(el("path", { "class": "w-edge",  d: d }));
      g.appendChild(el("path", { "class": "w-flare", d: arcPath(a0 + 1, a1 - 1, R_OUT) }));
      g.appendChild(el("path", { "class": "w-hit", d: conePath(a0, a1, R_HIT, R_OUT) }));
      gWedges.appendChild(g);

      /* label */
      var lp = polar(mid, R_LABEL);
      var lg = el("g", { "class": "lbl", "data-index": i });
      lg.dataset.x = fmt(lp[0]);
      lg.dataset.y = fmt(lp[1]);
      var num = el("text", { "class": "lbl-num", x: 0, y: -20 });
      num.textContent = "0" + (i + 1);
      var txt = el("text", { "class": "lbl-txt", x: 0, y: 10 });
      txt.textContent = sec.title;
      lg.appendChild(num);
      lg.appendChild(txt);
      gLabels.appendChild(lg);
    });
  }

  function buildMarker() {
    markerArc.setAttribute("d", arcPath(-SEG / 2 + GAP, SEG / 2 - GAP, R_MARK_ARC));
    var stem = gMarker.querySelector(".marker-stem");
    stem.setAttribute("x1", C); stem.setAttribute("y1", C - R_MARK_1);
    stem.setAttribute("x2", C); stem.setAttribute("y2", C - R_MARK_2);
    var dot = gMarker.querySelector(".marker-dot");
    dot.setAttribute("cx", C); dot.setAttribute("cy", C - R_MARK_DOT);
  }

  function fitLabels() {
    var texts = Array.prototype.map.call(gLabels.children, function (lg) {
      return lg.querySelector(".lbl-txt");
    });
    if (!texts.length) return;

    texts.forEach(function (t) { t.style.fontSize = ""; });   /* back to the theme's size */

    var dialW = dialWrap.getBoundingClientRect().width;
    if (!dialW) return;

    var hubHalf = (hub.getBoundingClientRect().width / dialW) * 500;
    var inner   = Math.max(hubHalf + LBL_PAD, R_IN + 40);
    var budget  = 2 * Math.min(R_LABEL - inner, R_OUT - R_LABEL - LBL_PAD);
    if (budget <= 0) return;

    var widest = 0;
    texts.forEach(function (t) { widest = Math.max(widest, t.getComputedTextLength()); });
    if (widest <= budget) return;

    var base = parseFloat(getComputedStyle(texts[0]).fontSize) || 31;
    var size = Math.max(base * budget / widest, base * 0.55);
    texts.forEach(function (t) { t.style.fontSize = size.toFixed(2) + "px"; });
  }

  /* ------------------------------------------------------------ rotation */

  function accumulate(acc, target, dir) {
    var delta = ((target - acc) % 360 + 360) % 360;      /* 0 … 359 forward */
    if (dir === 1)        { /* already the forward delta */ }
    else if (dir === -1)  { delta = delta === 0 ? 0 : delta - 360; }
    else if (delta > 180) { delta -= 360; }
    return acc + delta;
  }

  function applyRotation() {
    gWheel.style.transform  = "rotate(" + fmt(accWheel) + "deg)";
    gMarker.style.transform = "rotate(" + fmt(accMarker) + "deg)";

    var counter = -accWheel;
    Array.prototype.forEach.call(gLabels.children, function (lg) {
      lg.style.transform = "translate(" + lg.dataset.x + "px," + lg.dataset.y + "px) rotate(" + fmt(counter) + "deg)";
    });
    photos.forEach(function (im) {
      im.style.transform = "rotate(" + fmt(counter) + "deg)";
    });
  }

  /* --------------------------------------------------------------- state */

  function go(index, dir) {
    if (index === current) return;

    if (index < 0) {
      accWheel  = accumulate(accWheel, 0, 0);
      accMarker = accumulate(accMarker, 0, 0);
      current = -1;
      stage.dataset.state = "default";
      dialWrap.classList.remove("has-focus");
      panel.setAttribute("aria-hidden", "true");
      paintDialState();
      applyRotation();
      setHash("");
      return;
    }

    var wheelDir = current < 0 ? 0 : (dir ? -dir : 0);

    accWheel  = accumulate(accWheel, READ_ANGLE - centerAngle(index), wheelDir);
    accMarker = accumulate(accMarker, READ_ANGLE, 0);

    current = index;
    stage.dataset.state = "focus";
    dialWrap.classList.add("has-focus");
    panel.setAttribute("aria-hidden", "false");

    paintDialState();
    applyRotation();
    renderPanel(SECTIONS[index], index);
    setHash(SECTIONS[index].id);
  }

  function paintDialState() {
    Array.prototype.forEach.call(gWedges.children, function (w, i) {
      w.classList.toggle("is-active", i === current);
    });
    Array.prototype.forEach.call(gLabels.children, function (l, i) {
      l.classList.toggle("is-lit", i === current);
      l.classList.toggle("is-dim", current >= 0 && i !== current);
    });
    if (current >= 0) renderHubFocus(SECTIONS[current], current);
  }

  function next() { go((current + 1 + N) % N, +1); }
  function prev() { go((current - 1 + N) % N, -1); }

  /* ------------------------------------------------------------ language */

  function setLang(next) {
    if (LANGS.indexOf(next) < 0 || next === lang) return;
    lang = next;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* private mode */ }
    applyLang();
  }

  function applyLang() {
    document.documentElement.lang = lang;
    data = localize(window.CONTENT, lang);
    SECTIONS = data.sections;

    Array.prototype.forEach.call(gLabels.children, function (lg, i) {
      lg.querySelector(".lbl-txt").textContent = SECTIONS[i].title;
    });
    Array.prototype.forEach.call(gWedges.children, function (w, i) {
      w.setAttribute("aria-label", SECTIONS[i].title);
    });

    renderHubDefault();
    if (current >= 0) {
      renderHubFocus(SECTIONS[current], current);
      renderPanel(SECTIONS[current], current);
    }
    fitLabels();

    if (langBar) {
      Array.prototype.forEach.call(langBar.querySelectorAll("button[data-lang]"), function (b) {
        b.setAttribute("aria-current", b.dataset.lang === lang ? "true" : "false");
      });
    }
  }

  /* ---------------------------------------------------------------- hash */

  var muteHash = false;
  function setHash(id) {
    muteHash = true;
    if (id) {
      if (history.replaceState) history.replaceState(null, "", "#" + id);
      else location.hash = id;
    } else if (history.replaceState) {
      history.replaceState(null, "", location.pathname + location.search);
    } else {
      location.hash = "";
    }
    setTimeout(function () { muteHash = false; }, 0);
  }

  function indexFromHash() {
    var id = (location.hash || "").replace("#", "");
    for (var i = 0; i < N; i++) if (SECTIONS[i].id === id) return i;
    return -1;
  }

  /* ------------------------------------------------------------ hub copy */

  function renderHubDefault() {
    var p = data.profile;
    var socials = p.socials.map(function (s) {
      return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '" title="' + s.label + '">' + icon(s.icon) + "</a>";
    }).join("");
    var chips = (p.chips || []).map(function (c) { return "<li>" + c + "</li>"; }).join("");

    hubDefault.innerHTML =
      '<p class="hub-role">' + p.role + "</p>" +
      '<h1 class="hub-name">' + p.name + "</h1>" +
      '<div class="hub-rule"></div>' +
      '<p class="hub-tagline">' + p.tagline + "</p>" +
      '<ul class="hub-chips">' + chips + "</ul>" +
      (p.location ? '<p class="hub-location">' + icon("pin") +
                    "<span>" + p.location + "</span></p>" : "") +
      '<div class="hub-socials">' + socials + "</div>" +
      '<p class="hub-hint">' + (p.hint || "Pick an hour") + "</p>";
  }

  function renderHubFocus(sec, i) {
    hubFocus.innerHTML =
      '<p class="hub-index">' + pad(i + 1) + " / " + pad(N) + "</p>" +
      '<h2 class="hub-title">' + sec.title + "</h2>" +
      '<div class="hub-nav">' +
        '<button type="button" data-act="prev" aria-label="Previous section">' + icon("left") + "</button>" +
        '<button type="button" data-act="home" aria-label="Back to the start">' + icon("home") + "</button>" +
        '<button type="button" data-act="next" aria-label="Next section">' + icon("right") + "</button>" +
      "</div>";
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ------------------------------------------------------ block renderer */

  function tagRow(tags, extraClass) {
    if (!tags || !tags.length) return "";
    return '<div class="tag-row ' + (extraClass || "") + '">' +
      tags.map(function (t) { return '<span class="tag">' + t + "</span>"; }).join("") + "</div>";
  }

  var RENDER = {

    prose: function (b) {
      return '<div class="prose">' + b.text.map(function (t) { return "<p>" + t + "</p>"; }).join("") + "</div>";
    },

    facts: function (b) {
      return '<div class="facts">' + b.items.map(function (f) {
        return '<div class="fact"><span class="fact-k">' + f.k + '</span><span class="fact-v">' + f.v + "</span></div>";
      }).join("") + "</div>";
    },

    quote: function (b) {
      return '<blockquote class="quote"><p>' + b.text + "</p>" +
             (b.cite ? "<cite>" + b.cite + "</cite>" : "") + "</blockquote>";
    },

    columns: function (b) {
      return '<div class="cols">' + b.columns.map(function (c) {
        var lines = (c.lines || []).map(function (l) {
          return '<div class="col-line"><b>' + l.k + "</b>" + l.v + "</div>";
        }).join("");
        return '<div class="col">' +
          '<p class="col-meta">' + (c.meta || "") + "</p>" +
          '<h4 class="col-title">' + c.title + "</h4>" +
          (c.org ? '<p class="col-org">' + c.org + "</p>" : "") +
          '<div class="col-lines">' + lines + "</div>" +
          tagRow(c.tags) +
        "</div>";
      }).join("") + "</div>";
    },

    list: function (b) {
      return b.items.map(function (it) {
        return '<div class="entry">' +
          '<div class="entry-head"><h4 class="entry-title">' + it.title + "</h4>" +
          (it.meta ? '<span class="entry-meta">' + it.meta + "</span>" : "") + "</div>" +
          (it.text ? '<p class="entry-text">' + it.text + "</p>" : "") +
          tagRow(it.tags, "tags-inline") +
        "</div>";
      }).join("");
    },

    timeline: function (b) {
      return '<div class="tl">' + b.items.map(function (it) {
        return '<div class="tl-item">' +
          '<h4 class="tl-role">' + it.role + "</h4>" +
          (it.org ? '<p class="tl-org">' + it.org + "</p>" : "") +
          (it.period ? '<p class="tl-period">' + it.period + "</p>" : "") +
          (it.milestones ? it.milestones.map(function (m) {
            return '<p class="tl-milestone">' +
              (m.date ? '<span class="tl-milestone-date">' + m.date + "</span>" : "") +
              m.text + "</p>";
          }).join("") : "") +
          (it.bullets ? '<ul class="tl-bullets">' + it.bullets.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>" : "") +
          tagRow(it.tags) +
        "</div>";
      }).join("") + "</div>";
    },

    skills: function (b) {
      return '<div class="skill-groups">' + b.groups.map(function (g) {
        function tier(cls, items) {
          return items && items.length
            ? '<p class="' + cls + '">' + items.join(' <span class="skill-sep">\u00b7</span> ') + "</p>"
            : "";
        }
        return '<div class="skill-group">' +
                 '<p class="skill-group-name">' + g.name + "</p>" +
                 tier("skill-core", g.core) +
                 tier("skill-also", g.also) +
               "</div>";
      }).join("") + "</div>";
    },

    stats: function (b) {
      return '<div class="stat-row">' + b.items.map(function (s) {
        return "<div><div class=\"stat-v\">" + s.value + "</div><div class=\"stat-l\">" + s.label + "</div></div>";
      }).join("") + "</div>";
    },

    tags: function (b) { return tagRow(b.items); },

    gallery: function (b) {
      return '<div class="gallery">' + b.images.map(function (im) {
        return '<img src="' + im.src + '" alt="' + (im.alt || "") + '" loading="lazy">';
      }).join("") + "</div>";
    }
  };

  function renderBlock(b, i) {
    var body = (RENDER[b.type] || function () { return ""; })(b);
    return '<section class="block block-' + b.type + '" style="--i:' + i + '">' +
      (b.title ? '<h3 class="b-title">' + b.title + "</h3>" : "") + body + "</section>";
  }

  /* ------------------------------------------------------- panel renderer */

  function renderPanel(sec, index) {
    var i = 0;
    var html = "";

    html += '<header class="p-head" style="--i:' + (i++) + '">' +
      '<p class="p-kicker">' + pad(index + 1) + " — " + (sec.kicker || sec.title) + "</p>" +
      '<h2 class="p-title">' + sec.title + "</h2>" +
      (sec.lede ? '<p class="p-lede">' + sec.lede + "</p>" : "") +
    "</header>";

    if (sec.image) {
      html += '<figure class="p-media" style="--i:' + (i++) + '">' +
        '<img src="' + sec.image.src + '" alt="' + (sec.image.alt || "") + '">' +
        (sec.image.caption ? "<figcaption>" + sec.image.caption + "</figcaption>" : "") +
      "</figure>";
    }

    (sec.blocks || []).forEach(function (b) { html += renderBlock(b, i++); });

    html += '<nav class="p-foot" style="--i:' + (i++) + '">' +
      '<button class="btn btn-primary" type="button" data-act="next">' +
        SECTIONS[(index + 1) % N].title + icon("right", 14) + "</button>" +
      '<button class="btn" type="button" data-act="prev">' + icon("left", 14) + "Back</button>" +
      '<button class="btn btn-ghost" type="button" data-act="home">Start</button>' +
    "</nav>";

    panelInner.innerHTML = html;
    panelInner.scrollTop = 0;
    orientMedia(sec);
  }

  function orientMedia(sec) {
    var fig = panelInner.querySelector(".p-media");
    if (!fig) return;
    var img = fig.querySelector("img");
    var spec = sec.image || {};

    fig.classList.toggle("is-cropped", !!spec.crop);
    fig.style.setProperty("--focus", focusPosition(spec.focus));

    var decide = function () {
      if (!img.naturalWidth) return;
      fig.classList.toggle("is-portrait",
        !spec.crop && img.naturalHeight / img.naturalWidth > 1.15);
    };
    if (img.complete) decide(); else img.addEventListener("load", decide, { once: true });
  }

  /* ---------------------------------------------------------- interaction */

  gWedges.addEventListener("click", function (e) {
    var w = e.target.closest(".wedge");
    if (w) go(+w.dataset.index, 0);
  });

  gWedges.addEventListener("keydown", function (e) {
    var w = e.target.closest(".wedge");
    if (!w) return;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(+w.dataset.index, 0); }
  });

  function handleAct(e) {
    var btn = e.target.closest("[data-act]");
    if (!btn) return;
    var act = btn.dataset.act;
    if (act === "next") next();
    else if (act === "prev") prev();
    else if (act === "home") go(-1, 0);
  }
  panelInner.addEventListener("click", handleAct);
  hubFocus.addEventListener("click", handleAct);

  scrimClose.addEventListener("click", function () { if (current >= 0) go(-1, 0); });

  if (langBar) langBar.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-lang]");
    if (b) setLang(b.dataset.lang);
  });

  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "Escape") { go(-1, 0); return; }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); current < 0 ? go(0, 0) : next(); }
    if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   { e.preventDefault(); current < 0 ? go(N - 1, 0) : prev(); }
    if (e.key === "Home") { e.preventDefault(); go(-1, 0); }
  });

  window.addEventListener("hashchange", function () {
    if (muteHash) return;
    go(indexFromHash(), 0);
  });

  /* ----------------------------------------------------------------- boot */

  buildTicks();
  buildWedges();
  buildMarker();
  applyLang();
  applyRotation();
  fitLabels();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitLabels);
  window.addEventListener("resize", fitLabels);

  var start = indexFromHash();
  if (start >= 0) {
    setTimeout(function () { go(start, 0); }, 0);
  }

  function endBoot() { document.documentElement.classList.remove("is-booting"); }
  if (window.requestAnimationFrame) {
    requestAnimationFrame(function () { requestAnimationFrame(endBoot); });
  }
  setTimeout(endBoot, 80);

  document.documentElement.classList.add("is-ready");
})();
