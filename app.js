/**
 * Warisan vs Arisan: Merge Kafe — Official Informational & Beta Platform (warisanarisan.com)
 * Native iOS & Android Mobile Game by KAS Studio.
 */

const SITE_CONFIG = {
  domain: 'warisanarisan.com',

  iosUrl: '',
  iosBadgeSub: 'iOS • TestFlight',
  androidUrl: '',
  androidBadgeSub: 'Android • Beta',

  androidWaitlistFormUrl: '',
  feedbackFormUrl: '',

  supabaseUrl: '',
  supabaseAnonKey: '',

  leadsWebhookUrl: '',
  leadsInboxEmail: ['halo', 'warisanarisan.com'].join('@'),
  contactEmail: ['halo', 'warisanarisan.com'].join('@'),
};

const KAS_ADMIN_HUB_ENDPOINTS = [
  ['https:', '', 'admin.kasstudio.id', 'api', 'public', 'inquiries'].join('/'),
  ['https:', '', 'kas-admin.vercel.app', 'api', 'public', 'inquiries'].join('/'),
];

const STORAGE_EMAIL_KEY = 'wva_tester_email_v1';

// ============================================================================
// 1. PROCEDURAL JAVANESE BRONZE & PORCELAIN WEB AUDIO
// ============================================================================
let audioCtx = null;
function getAudio() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!audioCtx && Ctx) {
    audioCtx = new Ctx();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

const SLENDRO_FREQS = [293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

const sfx = {
  click(up = true) {
    const ctx = getAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(up ? 480 : 360, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(up ? 760 : 240, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.13, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.075);
  },

  porcelain() {
    const ctx = getAudio();
    if (!ctx) return;
    [1318.5, 2093.0].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.035);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.035);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.035 + 0.16);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.035);
      osc.stop(ctx.currentTime + i * 0.035 + 0.17);
    });
  },

  saron(tier = 2) {
    const ctx = getAudio();
    if (!ctx) return;
    const base = SLENDRO_FREQS[Math.min(SLENDRO_FREQS.length - 1, Math.max(0, tier - 1))];
    [base, base * 2].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(idx === 0 ? 0.17 : 0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.34);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    });
  },

  saronLadder() {
    const ctx = getAudio();
    if (!ctx) return;
    [0, 1, 2, 3, 4].forEach((step, idx) => {
      const t0 = ctx.currentTime + idx * 0.09;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(SLENDRO_FREQS[step], t0);
      gain.gain.setValueAtTime(0.14, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.25);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.26);
    });
  },

  wax() {
    const ctx = getAudio();
    if (!ctx) return;
    const dur = 0.18;
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1450;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.24, ctx.currentTime);
    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start();
    setTimeout(() => sfx.saron(5), 110);
  },

  fan() {
    const ctx = getAudio();
    if (!ctx) return;
    [0, 0.07].forEach((off, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(idx === 0 ? 820 : 620, ctx.currentTime + off);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + off + 0.055);
      gain.gain.setValueAtTime(0.17, ctx.currentTime + off);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + off + 0.065);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + off);
      osc.stop(ctx.currentTime + off + 0.07);
    });
  },
};

// ============================================================================
// 2. TOAST NOTIFICATION
// ============================================================================
const griyaToast = document.getElementById('griya-toast');
const griyaToastBadge = document.getElementById('griya-toast-badge');
const griyaToastText = document.getElementById('griya-toast-text');
let toastTimer = null;

const TOAST_BADGES = {
  nadia: { code: 'ND', bg: '#0B5D3E', fg: '#FFFFFF' },
  ratna: { code: 'IR', bg: '#9E141C', fg: '#FFFFFF' },
  baskara: { code: 'BW', bg: '#233B59', fg: '#FFE39E' },
  wasiat: { code: 'WS', bg: '#F4BC47', fg: '#180C06' },
};

function showGriyaToast(msg, actor = 'nadia') {
  if (!griyaToast || !griyaToastText) return;
  const b = TOAST_BADGES[actor] || TOAST_BADGES.nadia;
  if (griyaToastBadge) {
    griyaToastBadge.textContent = b.code;
    griyaToastBadge.style.background = b.bg;
    griyaToastBadge.style.color = b.fg;
  }
  griyaToastText.textContent = msg;
  griyaToast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => griyaToast.classList.add('hidden'), 3000);
}

// ============================================================================
// 3. HERO GAMEPLAY PHONE VIEWER (DOTS + QUICK SCREEN PILLS)
// ============================================================================
const HERO_SLIDES = [
  { src: 'assets/screen-dapur-merge.jpg', label: 'Papan Merge 7×9 • 36 Kuliner' },
  { src: 'assets/screen-pendopo.jpg', label: 'Putaran 1 • Pendopo Utama' },
  { src: 'assets/screen-dapur-warisan.jpg', label: 'Putaran 2 • Dapur Kayu Warisan' },
  { src: 'assets/screen-serambi-patri.jpg', label: 'Putaran 3 • Serambi Kaca Patri' },
  { src: 'assets/screen-wasiat.jpg', label: 'Arsip 12 Amplop Wasiat' },
];

const heroImg = document.getElementById('hero-screen-img');
const heroLabel = document.getElementById('hero-screen-label');
const heroDotsWrap = document.getElementById('hero-dots');
let heroIdx = 0;
let manualPauseUntil = 0;

if (heroDotsWrap) {
  HERO_SLIDES.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = `hero-dot${idx === 0 ? ' active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `Tampilkan layar ${idx + 1}`);
    dot.addEventListener('click', () => {
      manualPauseUntil = Date.now() + 9000;
      sfx.click(true);
      setHeroSlide(idx);
    });
    heroDotsWrap.appendChild(dot);
  });
}

document.querySelectorAll('.screen-pill').forEach((pill) => {
  pill.addEventListener('click', () => {
    const idx = Number(pill.dataset.slide || 0);
    manualPauseUntil = Date.now() + 9000;
    sfx.click(true);
    setHeroSlide(idx);
  });
});

function setHeroSlide(idx) {
  heroIdx = idx % HERO_SLIDES.length;
  const slide = HERO_SLIDES[heroIdx];
  if (heroImg) heroImg.src = slide.src;
  if (heroLabel) heroLabel.textContent = slide.label;
  heroDotsWrap?.querySelectorAll('.hero-dot').forEach((d, i) => {
    d.classList.toggle('active', i === heroIdx);
  });
  document.querySelectorAll('.screen-pill').forEach((p) => {
    p.classList.toggle('active', Number(p.dataset.slide) === heroIdx);
  });
}

const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  setInterval(() => {
    if (Date.now() < manualPauseUntil) return;
    setHeroSlide(heroIdx + 1);
  }, 4400);
}

// ============================================================================
// 4. INTERACTIVE MINI-MERGE DEMO (TAP + DRAG & DROP)
// ============================================================================
const KUE_SPECS = {
  1: { name: 'Adonan Pandan', img: 'assets/items/kue_01.webp' },
  2: { name: 'Klepon Melaka', img: 'assets/items/kue_02.webp' },
  3: { name: 'Kue Lumpur', img: 'assets/items/kue_03.webp' },
  4: { name: 'Dadar Gulung', img: 'assets/items/kue_04.webp' },
  5: { name: 'Serabi Kinca', img: 'assets/items/kue_05.webp' },
  6: { name: 'Kue Lapis Beras', img: 'assets/items/kue_06.webp' },
};

const MINI_ORDERS = [
  {
    actor: 'ratna',
    name: 'Ibu Ratna Wijaya',
    portrait: 'assets/cast-ratna.webp',
    bgGrad: 'radial-gradient(circle at 50% 30%, #A61922 0%, #3D060A 100%)',
    quip: '"Jangan buat tamu menunggu. Sajikan Kue Lumpur hangat di meja utama."',
    tier: 3,
    reward: 45,
  },
  {
    actor: 'baskara',
    name: 'Baskara Wijaya',
    portrait: 'assets/cast-baskara.webp',
    bgGrad: 'radial-gradient(circle at 50% 30%, #233B59 0%, #0C1522 100%)',
    quip: '"Dadar Gulung buatanmu masih persis resep Ibu Sri delapan tahun lalu, Nad."',
    tier: 4,
    reward: 75,
  },
  {
    actor: 'nadia',
    name: 'Tante Mirna Subianto',
    portrait: 'assets/cast-mirna.webp',
    bgGrad: 'radial-gradient(circle at 50% 30%, #6E1E4A 0%, #2A091B 100%)',
    quip: '"Serabi Kinca Nangka wangi pandan begini bikin Tante langsung luluh!"',
    tier: 5,
    reward: 120,
  },
];

let miniGrid = [2, 2, 1, 1, null, null];
let selectedIdx = null;
let dragSourceIdx = null;
let miniKoin = 28;
let miniOrderIdx = 0;

const miniGridEl = document.getElementById('mini-jade-grid');
const miniHintEl = document.getElementById('mini-merge-hint');
const miniKoinEl = document.getElementById('mini-koin-val');
const serveBtn = document.getElementById('btn-serve-mini');
const serveBtnLbl = document.getElementById('btn-serve-mini-label');

function renderMiniOrder() {
  const ord = MINI_ORDERS[miniOrderIdx % MINI_ORDERS.length];
  const spec = KUE_SPECS[ord.tier];
  const pEl = document.getElementById('mini-guest-portrait');
  const frameEl = document.getElementById('mini-guest-frame');
  const nEl = document.getElementById('mini-guest-name');
  const qEl = document.getElementById('mini-guest-quip');
  const rEl = document.getElementById('mini-order-reward');
  const wImg = document.getElementById('mini-wanted-img');
  const wName = document.getElementById('mini-wanted-name');

  if (pEl) pEl.src = ord.portrait;
  if (frameEl && ord.bgGrad) frameEl.style.background = ord.bgGrad;
  if (nEl) nEl.textContent = ord.name;
  if (qEl) qEl.textContent = ord.quip;
  if (rEl) rEl.textContent = `+${ord.reward} Koin`;
  if (wImg) wImg.src = spec.img;
  if (wName) wName.textContent = `T${ord.tier} ${spec.name}`;

  const readyCell = miniGrid.findIndex((t) => t === ord.tier);
  if (serveBtn && serveBtnLbl) {
    serveBtn.disabled = readyCell === -1;
    serveBtnLbl.textContent =
      readyCell !== -1
        ? `SAJIKAN T${ord.tier} ${spec.name.toUpperCase()} (+${ord.reward} Koin)`
        : `Gabungkan kue sampai T${ord.tier} ${spec.name}`;
  }
}

function mergeOrSwapMiniCells(fromIdx, toIdx) {
  if (fromIdx === null || fromIdx === toIdx) return;
  const fromTier = miniGrid[fromIdx];
  const toTier = miniGrid[toIdx];
  if (!fromTier) return;

  if (toTier === fromTier && fromTier < 6) {
    const nextTier = fromTier + 1;
    miniGrid[toIdx] = nextTier;
    miniGrid[fromIdx] = null;
    selectedIdx = null;
    sfx.saron(nextTier);
    if (miniHintEl) {
      miniHintEl.textContent = `Terbentuk T${nextTier} ${KUE_SPECS[nextTier].name}!`;
    }
    renderMiniGrid();
    return;
  }

  miniGrid[toIdx] = fromTier;
  miniGrid[fromIdx] = toTier;
  selectedIdx = null;
  sfx.porcelain();
  renderMiniGrid();
}

function renderMiniGrid() {
  if (!miniGridEl) return;
  const ord = MINI_ORDERS[miniOrderIdx % MINI_ORDERS.length];
  miniGridEl.innerHTML = '';

  miniGrid.forEach((tier, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    const isWanted = tier === ord.tier;
    btn.className = `mini-jade-cell${selectedIdx === idx ? ' selected' : ''}${isWanted ? ' wanted-ready' : ''}`;
    if (tier) {
      const spec = KUE_SPECS[tier];
      btn.draggable = true;
      btn.setAttribute('aria-label', `Petak ${idx + 1}: Tingkat ${tier} ${spec.name}`);
      btn.innerHTML = `
        <span class="mini-tier-pill">T${tier}</span>
        <img src="${spec.img}" alt="${spec.name}" width="56" height="56" />
        <span class="mini-dish-lbl">${spec.name}</span>
      `;
      btn.addEventListener('dragstart', (ev) => {
        dragSourceIdx = idx;
        selectedIdx = idx;
        if (ev.dataTransfer) {
          ev.dataTransfer.effectAllowed = 'move';
          ev.dataTransfer.setData('text/plain', String(idx));
        }
      });
      btn.addEventListener('dragend', () => {
        dragSourceIdx = null;
        miniGridEl.querySelectorAll('.mini-jade-cell').forEach((c) => c.classList.remove('drag-over'));
      });
    } else {
      btn.setAttribute('aria-label', `Petak ${idx + 1} kosong`);
    }

    btn.addEventListener('dragover', (ev) => {
      if (dragSourceIdx === null || dragSourceIdx === idx) return;
      ev.preventDefault();
      btn.classList.add('drag-over');
    });
    btn.addEventListener('dragleave', () => {
      btn.classList.remove('drag-over');
    });
    btn.addEventListener('drop', (ev) => {
      ev.preventDefault();
      btn.classList.remove('drag-over');
      const from = dragSourceIdx !== null ? dragSourceIdx : Number(ev.dataTransfer?.getData('text/plain'));
      dragSourceIdx = null;
      if (Number.isInteger(from) && from >= 0 && from < miniGrid.length) {
        mergeOrSwapMiniCells(from, idx);
      }
    });

    btn.addEventListener('click', () => handleMiniCellTap(idx));
    miniGridEl.appendChild(btn);
  });

  if (miniKoinEl) miniKoinEl.textContent = `${miniKoin} Koin`;
  renderMiniOrder();
}

function handleMiniCellTap(idx) {
  const clickedTier = miniGrid[idx];
  if (selectedIdx === null) {
    if (!clickedTier) {
      sfx.click(false);
      return;
    }
    selectedIdx = idx;
    sfx.porcelain();
    renderMiniGrid();
    return;
  }

  if (selectedIdx === idx) {
    selectedIdx = null;
    sfx.click(false);
    renderMiniGrid();
    return;
  }

  mergeOrSwapMiniCells(selectedIdx, idx);
}

document.getElementById('btn-spawn-bakul')?.addEventListener('click', () => {
  const emptyIdx = miniGrid.findIndex((x) => x === null);
  if (emptyIdx === -1) {
    sfx.fan();
    showGriyaToast('Meja penuh—gabungkan 2 kue yang sama terlebih dahulu.', 'nadia');
    return;
  }
  miniGrid[emptyIdx] = 1;
  selectedIdx = null;
  sfx.porcelain();
  renderMiniGrid();
});

document.getElementById('merge-reset-btn')?.addEventListener('click', () => {
  miniGrid = [2, 2, 1, 1, null, null];
  selectedIdx = null;
  sfx.click(true);
  if (miniHintEl) {
    miniHintEl.textContent = 'Ketuk atau seret dua Klepon (T2) untuk membuat Kue Lumpur (T3).';
  }
  renderMiniGrid();
});

serveBtn?.addEventListener('click', () => {
  const ord = MINI_ORDERS[miniOrderIdx % MINI_ORDERS.length];
  const readyIdx = miniGrid.findIndex((t) => t === ord.tier);
  if (readyIdx === -1) return;
  miniGrid[readyIdx] = null;
  selectedIdx = null;
  miniKoin += ord.reward;
  sfx.saronLadder();
  showGriyaToast(`Pesanan ${ord.name} disajikan (+${ord.reward} Koin).`, ord.actor);
  miniOrderIdx += 1;
  renderMiniGrid();
});

renderMiniGrid();

document.querySelectorAll('.asmr-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.sfx;
    if (key === 'porcelain') sfx.porcelain();
    else if (key === 'saron') sfx.saronLadder();
    else if (key === 'wax') sfx.wax();
    else if (key === 'fan') sfx.fan();
  });
});

// ============================================================================
// 5. 3-ROOM x 4-STYLE ARCHITECTURAL COMPARISON + WAX SEAL CLUES
// ============================================================================
const ROOM_NAMES = {
  p1: 'Pendopo Utama',
  p2: 'Dapur Kayu Warisan',
  p3: 'Serambi Kaca Patri',
};

const STYLE_NAMES = {
  ruined: 'Kondisi Awal (Sebelum Dipugar)',
  kebayoran_tropis_giok: 'Gaya Kebayoran Tropis Giok',
  jati_klasik: 'Gaya Jati Klasik Keraton',
  menteng_art_deco: 'Gaya Menteng Art Deco 1930',
};

let activeRoomKey = 'p1';
let activeStyleKey = 'kebayoran_tropis_giok';

const renovasiImg = document.getElementById('renovasi-preview-img');
const renovasiCap = document.getElementById('renovasi-preview-caption');

function updateRenovasiPreview() {
  if (renovasiImg) {
    renovasiImg.src = `assets/room_${activeRoomKey}_${activeStyleKey}.webp`;
  }
  if (renovasiCap) {
    renovasiCap.textContent = `${ROOM_NAMES[activeRoomKey]} • ${STYLE_NAMES[activeStyleKey]}`;
  }
}

document.querySelectorAll('.room-pill').forEach((btn) => {
  btn.addEventListener('click', () => {
    activeRoomKey = btn.dataset.room || 'p1';
    sfx.click(true);
    document.querySelectorAll('.room-pill').forEach((b) => b.classList.toggle('active', b === btn));
    updateRenovasiPreview();
  });
});

document.querySelectorAll('.style-swatch-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    activeStyleKey = btn.dataset.style || 'kebayoran_tropis_giok';
    sfx.saron(activeStyleKey === 'ruined' ? 1 : 4);
    document.querySelectorAll('.style-swatch-btn').forEach((b) => b.classList.toggle('active', b === btn));
    updateRenovasiPreview();
  });
});

const WASIAT_CLUES = [
  {
    tag: 'BUKTI WASIAT #01',
    title: 'Slip Transfer Rp1,5 Miliar ("R.W.")',
    desc: 'Dana pribadi Ibu Sri ternyata dipakai menalangi rekening berinisial R.W. sebelum wafat.',
    img: 'assets/items/slip_transfer_rw_1_5m.webp',
  },
  {
    tag: 'BUKTI WASIAT #04',
    title: 'Foto Pendiri Paguyuban 1998',
    desc: 'Potret lama Ibu Sri dan Ibu Ratna bersama bendahara ketiga yang disembunyikan.',
    img: 'assets/items/amplop_wasiat_04.webp',
  },
  {
    tag: 'BUKTI WASIAT #09',
    title: 'Buku Kas Asli Bersampul Giok',
    desc: 'Catatan aliran dana paguyuban dari laci terkunci Tante Mirna.',
    img: 'assets/items/amplop_wasiat_09.webp',
  },
  {
    tag: 'BUKTI WASIAT #12',
    title: 'Sertifikat Asli Griya Cempaka',
    desc: 'Dokumen pelepasan hak tanggungan yang membebaskan Griya Cempaka sepenuhnya.',
    img: 'assets/items/amplop_wasiat_12.webp',
  },
];

let clueIdx = -1;
document.getElementById('btn-cycle-clue')?.addEventListener('click', () => {
  clueIdx = (clueIdx + 1) % WASIAT_CLUES.length;
  const c = WASIAT_CLUES[clueIdx];
  sfx.wax();
  const imgEl = document.getElementById('wasiat-clue-img');
  const tagEl = document.getElementById('wasiat-clue-tag');
  const titEl = document.getElementById('wasiat-clue-title');
  const descEl = document.getElementById('wasiat-clue-desc');
  const btnEl = document.getElementById('btn-cycle-clue');

  if (imgEl) imgEl.src = c.img;
  if (tagEl) tagEl.textContent = c.tag;
  if (titEl) titEl.textContent = c.title;
  if (descEl) descEl.textContent = c.desc;
  if (btnEl) btnEl.textContent = 'Lihat Bukti Berikutnya →';
});

// ============================================================================
// 6. HIGH-CONTRAST CANVAS2D WASIAT DOSSIER CARD
// ============================================================================
const demoWasiatCanvas = document.getElementById('demo-wasiat-canvas');

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawDemoWasiatCanvas(mode = 'bukti') {
  if (!demoWasiatCanvas) return;
  const ctx = demoWasiatCanvas.getContext('2d');
  if (!ctx) return;

  const isBukti = mode === 'bukti';
  const w = 360;
  const h = 420;
  ctx.save();
  ctx.setTransform(2, 0, 0, 2, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const m = 8;
  const rw = w - m * 2;
  const rh = h - m * 2;

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(m, m + 7);
  const teeth = 24;
  const tw = rw / teeth;
  for (let i = 0; i < teeth; i++) {
    ctx.lineTo(m + i * tw + tw / 2, m);
    ctx.lineTo(m + (i + 1) * tw, m + 7);
  }
  ctx.lineTo(m + rw, m + rh - 7);
  for (let i = teeth - 1; i >= 0; i--) {
    ctx.lineTo(m + i * tw + tw / 2, m + rh);
    ctx.lineTo(m + i * tw, m + rh - 7);
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#23120A';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Rich Ruby / Emerald & 24K Gold Header Bars (Zero Pastels)
  ctx.fillStyle = isBukti ? '#9E141C' : '#0B5D3E';
  ctx.fillRect(m + 14, m + 13, rw - 28, 4);
  ctx.fillStyle = '#D9971E';
  ctx.fillRect(m + 14, m + 17, rw - 28, 3);

  const cx = w / 2;
  let y = m + 36;
  ctx.fillStyle = '#1C0E07';
  ctx.textAlign = 'center';
  ctx.font = '900 16px Georgia, serif';
  ctx.fillText('ARSIP NOTARIS GRIYA CEMPAKA', cx, y);
  y += 14;
  ctx.fillStyle = '#5C4434';
  ctx.font = '800 9.5px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(
    isBukti
      ? 'BERKAS WASIAT #01 • PENDOPO UTAMA'
      : 'RAPOR MALAM ARISAN • SERAMBI PATRI',
    cx,
    y
  );
  y += 10;

  // Bold High-Contrast Status Banner
  ctx.fillStyle = isBukti ? '#9E141C' : '#063D29';
  roundRectPath(ctx, m + 14, y, rw - 28, 24, 6);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 11.4px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(
    isBukti ? 'SEGEL TERBUKA: SLIP TRANSFER Rp1,5M' : 'JAMUAN TUNTAS • PUJIAN TAMU VIP 5/5',
    cx,
    y + 16
  );
  y += 31;

  // 12-Envelope Progress Strip
  const openedCount = isBukti ? 1 : 3;
  const sq = 21.5;
  const gap = 4;
  const stripW = 12 * sq + 11 * gap;
  for (let i = 0; i < 12; i++) {
    const sx = cx - stripW / 2 + i * (sq + gap);
    const isOpen = i < openedCount;
    ctx.fillStyle = isOpen ? '#0B5D3E' : i === openedCount ? '#9E141C' : '#EDE5D8';
    roundRectPath(ctx, sx, y, sq, 15, 3);
    ctx.fill();
    ctx.strokeStyle = isOpen || i === openedCount ? '#1C0E07' : '#C2B39C';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = isOpen || i === openedCount ? '#FFFFFF' : '#695243';
    ctx.font = '800 8px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(String(i + 1).padStart(2, '0'), sx + sq / 2, y + 10.5);
  }
  y += 23;

  // 2x2 KPI Box
  const bx = m + 14;
  const bw = rw - 28;
  const bh = 70;
  ctx.fillStyle = '#F6F1E7';
  roundRectPath(ctx, bx, y, bw, bh, 8);
  ctx.fill();
  ctx.strokeStyle = '#D9971E';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(bx + bw / 2, y + 6);
  ctx.lineTo(bx + bw / 2, y + bh - 6);
  ctx.moveTo(bx + 8, y + bh / 2);
  ctx.lineTo(bx + bw - 8, y + bh / 2);
  ctx.stroke();

  const kpis = isBukti
    ? [
        ['DANA TALANGAN', 'Rp1,5 Miliar', '#9E141C'],
        ['PENERIMA SLIP', 'Inisial "R.W."', '#1C0E07'],
        ['SUDUT PULIH', '7/7 Pendopo', '#0B5D3E'],
        ['GAYA DESAIN', 'Tropis Giok', '#331A0E'],
      ]
    : [
        ['KAS RENOVASI', '+3.420 Koin', '#0B5D3E'],
        ['SAJIAN PUNCAK', 'T10 Lapis Legit', '#331A0E'],
        ['GAYA PILIHAN', 'Menteng 1930', '#063D29'],
        ['RESEP TERBUKA', '18 / 36 Kue', '#9E141C'],
      ];

  kpis.forEach(([lbl, val, col], idx) => {
    const kx = bx + (idx % 2) * (bw / 2) + bw / 4;
    const ky = y + Math.floor(idx / 2) * (bh / 2);
    ctx.fillStyle = '#695243';
    ctx.font = '800 8.6px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(lbl, kx, ky + 13);
    ctx.fillStyle = col;
    ctx.font = '900 13.5px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(val, kx, ky + 28.5);
  });
  y += bh + 13;

  const rows = isBukti
    ? [
        ['SAKSI NOTARIS', 'Baskara Wijaya, S.H.', '#1C0E07'],
        ['STATUS KLAIM', 'Gugatan Terpatahkan', '#0B5D3E'],
        ['SAJIAN UTAMA', 'Klepon & Jamu Kunyit', '#1C0E07'],
        ['VERIFIKASI AKTA', 'BUKTI SAH 01/12', '#9E141C'],
      ]
    : [
        ['TAMU MEJA VIP', 'Tante Mirna & 11 Tamu', '#1C0E07'],
        ['KOMBO SAJIAN', '5x Pesanan Beruntun', '#0B5D3E'],
        ['KONDISI PAPAN', 'Rapi • 0x Macet', '#0B5D3E'],
        ['AMPLOP BERIKUT', 'Segel #04 Siap Dibuka', '#9E141C'],
      ];

  rows.forEach(([l, v, col]) => {
    ctx.textAlign = 'left';
    ctx.fillStyle = '#5C4434';
    ctx.font = '800 10.6px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(l, m + 16, y + 4);
    ctx.textAlign = 'right';
    ctx.fillStyle = col;
    ctx.font = '900 11.2px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(v, w - m - 16, y + 4);
    y += 18.5;
  });

  y += 12;
  ctx.strokeStyle = '#C7B8A1';
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(m + 14, y);
  ctx.lineTo(w - m - 14, y);
  ctx.stroke();
  ctx.setLineDash([]);
  y += 12;

  ctx.textAlign = 'center';
  ctx.save();
  ctx.translate(cx - 18, y + 22);
  ctx.rotate(-0.028);
  ctx.strokeStyle = isBukti ? '#9E141C' : '#0B5D3E';
  ctx.lineWidth = 2.6;
  ctx.strokeRect(-124, -20, 248, 40);
  ctx.fillStyle = isBukti ? '#9E141C' : '#0B5D3E';
  ctx.font = '900 16.5px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(isBukti ? 'BUKTI #01 SAH' : 'SKOR ARISAN S+', 0, -2);
  ctx.font = '800 10px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(isBukti ? 'REKENING "R.W." TERUNGKAP' : 'NYONYA RUMAH KEBAYORAN', 0, 13.5);
  ctx.restore();

  const wx = w - m - 36;
  const wy = y + 22;
  ctx.fillStyle = '#9E141C';
  ctx.beginPath();
  ctx.arc(wx, wy, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#D9971E';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#FFE39E';
  ctx.font = '900 10px Georgia, serif';
  ctx.fillText('SRI', wx, wy + 3.5);

  y += 56;
  ctx.fillStyle = '#331A0E';
  ctx.font = 'italic 700 9.2px Georgia, serif';
  ctx.fillText(
    isBukti
      ? '"Tanda tangan Ibu Sri tak pernah bohong." — Baskara'
      : '"Lapis Legit selembut ini cuma buatan Nadia!" — Mirna',
    cx,
    y,
    rw - 36
  );
  y += 11;

  const barW = 216;
  const barX = cx - barW / 2;
  ctx.fillStyle = '#1C0E07';
  for (let i = 0; i < 52; i++) {
    const thick = (i * 7 + (isBukti ? 3 : 5)) % 3 === 0 ? 2.6 : 1.3;
    if (i % 5 !== 0) ctx.fillRect(barX + i * 4.15, y, thick, 16);
  }
  y += 26;
  ctx.fillStyle = '#5C4434';
  ctx.font = '800 9px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText('#WarisanVsArisan  •  warisanarisan.com  •  iOS & Android', cx, y);

  ctx.restore();
}

document.querySelectorAll('.dossier-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.dossier || 'bukti';
    if (mode === 'bukti') sfx.wax();
    else sfx.saron(5);
    document.querySelectorAll('.dossier-toggle').forEach((b) => b.classList.toggle('active', b === btn));
    drawDemoWasiatCanvas(mode);
  });
});

drawDemoWasiatCanvas('bukti');

// ============================================================================
// 7. MULTI-CHANNEL LEADS, WAITLIST & PLAYTEST FEEDBACK FUNNEL
// ============================================================================
const modal = document.getElementById('store-modal');
const modalKicker = document.getElementById('modal-kicker');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalSlot = document.getElementById('modal-action-slot');

function getSavedEmail() {
  try {
    return localStorage.getItem(STORAGE_EMAIL_KEY) || '';
  } catch {
    return '';
  }
}

function saveTesterEmail(email) {
  if (!email) return;
  try {
    localStorage.setItem(STORAGE_EMAIL_KEY, email);
  } catch {
    // ignore
  }
}

function detectDeviceOs() {
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  if (/Android/i.test(ua)) return 'Android';
  return 'Desktop';
}

function getAttributionMeta() {
  const params = new URLSearchParams(window.location.search);
  const src = params.get('utm_source') || '';
  const med = params.get('utm_medium') || '';
  const camp = params.get('utm_campaign') || '';
  const utm = [src, med, camp].filter(Boolean).join(' / ');
  return {
    game: 'Warisan vs Arisan',
    domain: SITE_CONFIG.domain,
    utm: utm || 'direct',
    referrer: document.referrer || 'direct',
    deviceOs: detectDeviceOs(),
    submittedAt: new Date().toISOString(),
  };
}

function buildMailtoHref(subject, lines) {
  const target = SITE_CONFIG.leadsInboxEmail || SITE_CONFIG.contactEmail;
  return `mailto:${target}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}

async function postToKasAdminHub(payload, plainSummaryLines) {
  const isIos = payload.jenis === 'testflight_ios';
  const isAndroid = payload.jenis === 'closed_beta_android';
  const fallbackSender = ['masukan', 'warisanarisan.com'].join('@');
  const rawEmail = isValidEmail(payload.email || '')
    ? payload.email
    : isValidEmail(payload.kontak_kredit || '')
      ? payload.kontak_kredit
      : fallbackSender;
  const displayName =
    payload.kontak_kredit && payload.kontak_kredit !== '-'
      ? payload.kontak_kredit
      : rawEmail.split('@')[0] || 'Tamu Griya Cempaka';

  const hubBody = {
    gameSlug: 'warisan-arisan',
    category: isIos || isAndroid ? 'demo_access' : 'support',
    platform: isIos ? 'ios_testflight' : 'android_play',
    fullName: displayName,
    workEmail: rawEmail,
    storeAccountEmail: isIos || isAndroid ? rawEmail : undefined,
    deviceNote: payload.perangkat_catatan || payload.platform_main || undefined,
    marketingOptIn: Boolean(payload.marketing_opt_in),
    privacyConsentVersion: 'uupdp-2026.11',
    utmSource: payload.sumber_utm || 'direct',
    message: plainSummaryLines.join('\n'),
  };

  for (const endpoint of KAS_ADMIN_HUB_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hubBody),
      });
      if (res.ok) return true;
    } catch {
      // try secondary endpoint
    }
  }
  return false;
}

async function deliverFunnelPayload(payload, subject, plainSummaryLines) {
  const tasks = [postToKasAdminHub(payload, plainSummaryLines)];
  const mailtoHref = buildMailtoHref(subject, plainSummaryLines);
  const results = await Promise.allSettled(tasks);
  const anyOk = results.some((r) => r.status === 'fulfilled' && r.value);
  return { delivered: anyOk, mailtoHref };
}

function openModal({ kicker, title, desc, slotHtml }) {
  if (!modal) return;
  if (modalKicker) modalKicker.textContent = kicker;
  if (modalTitle) modalTitle.textContent = title;
  if (modalDesc) modalDesc.textContent = desc;
  if (modalSlot) modalSlot.innerHTML = slotHtml;
  modal.classList.remove('hidden');
}

function closeModal() {
  modal?.classList.add('hidden');
  if (['#testflight', '#ios', '#android', '#beta', '#masukan', '#feedback'].includes(window.location.hash)) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}

document.getElementById('modal-close')?.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

const iosSubEl = document.getElementById('ios-badge-sub');
const andSubEl = document.getElementById('android-badge-sub');
if (iosSubEl) iosSubEl.textContent = SITE_CONFIG.iosBadgeSub;
if (andSubEl) andSubEl.textContent = SITE_CONFIG.androidBadgeSub;

function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function renderSuccessSlot({ heading, body, nextHint, mailtoHref, plainText }) {
  if (!modalSlot) return;
  modalSlot.innerHTML = `
    <div class="modal-success-card">
      <strong>${heading}</strong>
      <p>${body}</p>
      ${nextHint ? `<p>${nextHint}</p>` : ''}
    </div>
    <button type="button" id="btn-done-modal" class="btn-emerald btn-full">
      Selesai &amp; Tutup
    </button>
    <div class="modal-alt-links">
      <a href="${mailtoHref}">Kirim salinan via Email</a>
      <button type="button" id="btn-copy-summary">Salin catatan</button>
    </div>
  `;
  document.getElementById('btn-done-modal')?.addEventListener('click', closeModal);
  document.getElementById('btn-copy-summary')?.addEventListener('click', () => {
    navigator.clipboard?.writeText(plainText).then(() => {
      showGriyaToast('Catatan disalin ke clipboard.', 'nadia');
    });
  });
}

function renderFallbackSlot({ errorNote, mailtoHref, plainText }) {
  if (!modalSlot) return;
  modalSlot.innerHTML = `
    <div class="modal-info-card">
      <strong>Koneksi peramban membatasi pengiriman otomatis.</strong><br/>
      ${errorNote}
    </div>
    <a href="${mailtoHref}" class="btn-ruby btn-full">Kirim Lewat Aplikasi Email</a>
    <div class="modal-alt-links">
      <button type="button" id="btn-copy-fallback">Salin teks pendaftaran</button>
    </div>
  `;
  document.getElementById('btn-copy-fallback')?.addEventListener('click', () => {
    navigator.clipboard?.writeText(plainText).then(() => {
      showGriyaToast('Teks pendaftaran disalin.', 'nadia');
    });
  });
}

function openIosLeadModal(forceEmailForm = false) {
  if (SITE_CONFIG.iosUrl && !forceEmailForm) {
    window.open(SITE_CONFIG.iosUrl, '_blank', 'noopener');
    return;
  }
  openModal({
    kicker: 'TESTFLIGHT BETA • iOS',
    title: 'Daftar TestFlight iPhone & iPad',
    desc: 'Masukkan email Apple ID kamu untuk menerima tautan undangan resmi saat gelombang uji coba dibuka.',
    slotHtml: `
      <form id="ios-lead-form" class="funnel-form" novalidate>
        <input type="text" name="website_hp" class="hp-trap" tabindex="-1" autocomplete="off" />
        <div class="field-group">
          <label class="field-label" for="ios-email-input">Email Apple ID</label>
          <input id="ios-email-input" type="email" class="modal-input" placeholder="nama@icloud.com atau email Apple ID" value="${getSavedEmail()}" autocomplete="email" required />
        </div>
        <div class="field-group">
          <label class="field-label" for="ios-device-input">Perangkat (opsional)</label>
          <input id="ios-device-input" type="text" class="modal-input" placeholder="Contoh: iPhone 13, iPhone 15 Pro" />
        </div>
        <p id="ios-form-err" class="form-error-msg hidden"></p>
        <button id="ios-submit-btn" type="submit" class="btn-ruby btn-full">Minta Undangan TestFlight</button>
      </form>
    `,
  });

  document.getElementById('ios-lead-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const hp = e.target.querySelector('[name="website_hp"]')?.value;
    if (hp) return;

    const email = document.getElementById('ios-email-input')?.value?.trim() || '';
    const device = document.getElementById('ios-device-input')?.value?.trim() || '-';
    const errEl = document.getElementById('ios-form-err');
    const btn = document.getElementById('ios-submit-btn');

    if (!isValidEmail(email)) {
      if (errEl) {
        errEl.textContent = 'Mohon isi alamat email yang valid.';
        errEl.classList.remove('hidden');
      }
      return;
    }
    errEl?.classList.add('hidden');
    saveTesterEmail(email);

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Mencatat email...';
    }

    const meta = getAttributionMeta();
    const payload = {
      jenis: 'testflight_ios',
      email,
      perangkat_catatan: device,
      os_pengunjung: meta.deviceOs,
      sumber_utm: meta.utm,
      perujuk: meta.referrer,
      waktu: meta.submittedAt,
    };
    const subject = `[TestFlight iOS] ${email} – Warisan vs Arisan`;
    const lines = [
      'Pendaftaran TestFlight iOS Warisan vs Arisan:',
      `Email Apple ID: ${email}`,
      `Perangkat: ${device}`,
      `Sumber: ${meta.utm}`,
    ];

    const res = await deliverFunnelPayload(payload, subject, lines);
    const plainText = lines.join('\n');
    if (res.delivered) {
      sfx.saronLadder();
      renderSuccessSlot({
        heading: 'Email TestFlight Tercatat',
        body: `Undangan TestFlight resmi Warisan vs Arisan akan dikirim ke ${email}.`,
        nextHint: '',
        mailtoHref: res.mailtoHref,
        plainText,
      });
    } else {
      renderFallbackSlot({
        errorNote: 'Klik tombol di bawah untuk mengirim permintaan TestFlight:',
        mailtoHref: res.mailtoHref,
        plainText,
      });
    }
  });
}

function openAndroidLeadModal() {
  if (SITE_CONFIG.androidUrl) {
    window.open(SITE_CONFIG.androidUrl, '_blank', 'noopener');
    return;
  }
  if (SITE_CONFIG.androidWaitlistFormUrl) {
    window.open(SITE_CONFIG.androidWaitlistFormUrl, '_blank', 'noopener');
    return;
  }
  openModal({
    kicker: 'ANDROID • GOOGLE PLAY BETA',
    title: 'Daftar Closed Beta Android',
    desc: 'Masukkan alamat Gmail Google Play supaya akunmu diaktifkan untuk unduhan awal + bonus Kartu Ketua Arisan.',
    slotHtml: `
      <form id="and-lead-form" class="funnel-form" novalidate>
        <input type="text" name="website_hp" class="hp-trap" tabindex="-1" autocomplete="off" />
        <div class="field-group">
          <label class="field-label" for="and-email-input">Alamat Gmail Google Play</label>
          <input id="and-email-input" type="email" class="modal-input" placeholder="nama@gmail.com" value="${getSavedEmail()}" autocomplete="email" required />
        </div>
        <div class="field-group">
          <label class="field-label" for="and-device-input">Tipe HP Android (opsional)</label>
          <input id="and-device-input" type="text" class="modal-input" placeholder="Contoh: Samsung A55, Xiaomi, OPPO" />
        </div>
        <p id="and-form-err" class="form-error-msg hidden"></p>
        <button id="and-submit-btn" type="submit" class="btn-emerald btn-full">Daftarkan Gmail Google Play</button>
      </form>
    `,
  });

  document.getElementById('and-lead-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const hp = e.target.querySelector('[name="website_hp"]')?.value;
    if (hp) return;

    const email = document.getElementById('and-email-input')?.value?.trim() || '';
    const device = document.getElementById('and-device-input')?.value?.trim() || '-';
    const errEl = document.getElementById('and-form-err');
    const btn = document.getElementById('and-submit-btn');

    if (!isValidEmail(email)) {
      if (errEl) {
        errEl.textContent = 'Mohon isi alamat Gmail yang valid.';
        errEl.classList.remove('hidden');
      }
      return;
    }
    errEl?.classList.add('hidden');
    saveTesterEmail(email);

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Mendaftarkan Gmail...';
    }

    const meta = getAttributionMeta();
    const payload = {
      jenis: 'closed_beta_android',
      email,
      perangkat_catatan: device,
      os_pengunjung: meta.deviceOs,
      sumber_utm: meta.utm,
      perujuk: meta.referrer,
      waktu: meta.submittedAt,
    };
    const subject = `[Beta Android] ${email} – Warisan vs Arisan`;
    const lines = [
      'Pendaftaran Closed Beta Android Warisan vs Arisan:',
      `Email Google Play: ${email}`,
      `HP Android: ${device}`,
      `Sumber: ${meta.utm}`,
    ];

    const res = await deliverFunnelPayload(payload, subject, lines);
    const plainText = lines.join('\n');
    if (res.delivered) {
      sfx.saronLadder();
      renderSuccessSlot({
        heading: 'Gmail Google Play Terdaftar',
        body: `Akun ${email} telah masuk daftar penguji Closed Beta Android beserta bonus Kartu Ketua Arisan.`,
        nextHint: '',
        mailtoHref: res.mailtoHref,
        plainText,
      });
    } else {
      renderFallbackSlot({
        errorNote: 'Klik tombol di bawah untuk mengirim pendaftaran Gmail:',
        mailtoHref: res.mailtoHref,
        plainText,
      });
    }
  });
}

function openFeedbackModal() {
  if (SITE_CONFIG.feedbackFormUrl) {
    window.open(SITE_CONFIG.feedbackFormUrl, '_blank', 'noopener');
    return;
  }
  const os = detectDeviceOs();
  const defaultPlat = os === 'iOS' ? 'iPhone / iPad (iOS)' : os === 'Android' ? 'Android' : 'Simulasi Web';

  openModal({
    kicker: 'MASUKAN PEMAIN',
    title: 'Kirim Masukan atau Usul Kuliner',
    desc: 'Bagikan kesan bermain, laporan kendala layar, atau usulan jajanan pasar untuk pembaruan berikutnya.',
    slotHtml: `
      <form id="fb-funnel-form" class="funnel-form" novalidate>
        <input type="text" name="website_hp" class="hp-trap" tabindex="-1" autocomplete="off" />
        <div class="field-group">
          <span class="field-label">Kategori cepat:</span>
          <div class="fb-chips" id="fb-quick-chips">
            <button type="button" class="fb-chip active" data-vibe="Usul Kuliner">Usul Kuliner</button>
            <button type="button" class="fb-chip" data-vibe="Cerita & Renovasi">Cerita &amp; Renovasi</button>
            <button type="button" class="fb-chip" data-vibe="Keseimbangan Koin">Keseimbangan Koin</button>
            <button type="button" class="fb-chip" data-vibe="Laporan Bug">Laporan Bug</button>
          </div>
        </div>
        <div class="field-row-2">
          <div class="field-group">
            <label class="field-label" for="fb-kind">Topik</label>
            <select id="fb-kind" class="modal-select">
              <option value="Usul Kue / Cerita">Usul Kue / Cerita</option>
              <option value="Balance Koin & Energi">Koin &amp; Energi</option>
              <option value="Lapor Bug / Layar">Lapor Bug / Layar</option>
            </select>
          </div>
          <div class="field-group">
            <label class="field-label" for="fb-platform">Perangkat</label>
            <select id="fb-platform" class="modal-select">
              <option value="iPhone / iPad (iOS)" ${defaultPlat.includes('iOS') ? 'selected' : ''}>iPhone / iPad (iOS)</option>
              <option value="Android" ${defaultPlat === 'Android' ? 'selected' : ''}>HP Android</option>
              <option value="Simulasi Web" ${defaultPlat === 'Simulasi Web' ? 'selected' : ''}>Simulasi Web</option>
            </select>
          </div>
        </div>
        <div class="field-group">
          <label class="field-label" for="fb-body">Pesan</label>
          <textarea id="fb-body" class="modal-textarea" placeholder="Tulis usulan jajanan pasar atau masukanmu di sini..." required></textarea>
        </div>
        <div class="field-group">
          <label class="field-label" for="fb-contact">Nama / Email (opsional)</label>
          <input id="fb-contact" type="text" class="modal-input" placeholder="Opsional, untuk kredit penguji awal" value="${getSavedEmail()}" />
        </div>
        <p id="fb-form-err" class="form-error-msg hidden"></p>
        <button id="fb-submit-btn" type="submit" class="btn-gold btn-full">Kirim ke KAS Studio</button>
      </form>
    `,
  });

  let selectedVibe = 'Usul Kuliner';
  document.querySelectorAll('#fb-quick-chips .fb-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      sfx.click(true);
      selectedVibe = chip.dataset.vibe || '';
      document.querySelectorAll('#fb-quick-chips .fb-chip').forEach((c) => c.classList.toggle('active', c === chip));
      if (selectedVibe.includes('Bug')) {
        const kindSel = document.getElementById('fb-kind');
        if (kindSel) kindSel.value = 'Lapor Bug / Layar';
      }
    });
  });

  document.getElementById('fb-funnel-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const hp = e.target.querySelector('[name="website_hp"]')?.value;
    if (hp) return;

    const kind = document.getElementById('fb-kind')?.value || 'Masukan';
    const platform = document.getElementById('fb-platform')?.value || '-';
    const message = document.getElementById('fb-body')?.value?.trim() || '';
    const contact = document.getElementById('fb-contact')?.value?.trim() || '-';
    const errEl = document.getElementById('fb-form-err');
    const btn = document.getElementById('fb-submit-btn');

    if (message.length < 4) {
      if (errEl) {
        errEl.textContent = 'Mohon tulis minimal satu kalimat singkat.';
        errEl.classList.remove('hidden');
      }
      return;
    }
    errEl?.classList.add('hidden');
    if (isValidEmail(contact)) saveTesterEmail(contact);

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Mengirim...';
    }

    const meta = getAttributionMeta();
    const payload = {
      jenis: 'playtest_feedback',
      kesan_cepat: selectedVibe,
      kategori: kind,
      platform_main: platform,
      pesan: message,
      kontak_kredit: contact,
      os_pengunjung: meta.deviceOs,
      sumber_utm: meta.utm,
      perujuk: meta.referrer,
      waktu: meta.submittedAt,
    };
    const subject = `[${kind}] ${selectedVibe} (${platform}) – Warisan vs Arisan`;
    const lines = [
      `Topik: ${kind}`,
      `Kategori: ${selectedVibe}`,
      `Platform: ${platform}`,
      `Kontak: ${contact}`,
      '',
      message,
    ];

    const res = await deliverFunnelPayload(payload, subject, lines);
    const plainText = lines.join('\n');
    if (res.delivered) {
      sfx.saronLadder();
      renderSuccessSlot({
        heading: 'Masukan Diterima',
        body: 'Terima kasih! Catatanmu langsung masuk ke tim pengembang KAS Studio.',
        nextHint: '',
        mailtoHref: res.mailtoHref,
        plainText,
      });
    } else {
      renderFallbackSlot({
        errorNote: 'Klik tombol di bawah untuk mengirim lewat aplikasi email:',
        mailtoHref: res.mailtoHref,
        plainText,
      });
    }
  });
}

document.querySelectorAll('[data-store]').forEach((btn) => {
  btn.addEventListener('click', () => {
    sfx.click(true);
    if (btn.dataset.store === 'ios') openIosLeadModal(false);
    else openAndroidLeadModal();
  });
});

document.querySelectorAll('[data-open-feedback]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    sfx.click(true);
    openFeedbackModal();
  });
});

document.getElementById('footer-contact-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  sfx.click(true);
  openFeedbackModal();
});

document.getElementById('btn-open-press')?.addEventListener('click', () => {
  sfx.click(true);
  openModal({
    kicker: 'PRESS & CREATOR KIT',
    title: 'Aset Resmi Warisan vs Arisan',
    desc: 'Aset resmi resolusi penuh untuk liputan media dan kreator konten.',
    slotHtml: `
      <div class="modal-info-card">
        <strong>Informasi Ringkas:</strong><br/>
        • Judul: Warisan vs Arisan: Merge Kafe<br/>
        • Pengembang: KAS Studio (Jakarta, Indonesia)<br/>
        • Platform: iOS &amp; Android (Gratis, 100% Bisa Offline)<br/>
        • Situs Resmi: <strong>https://warisanarisan.com</strong>
      </div>
      <a href="assets/logo-hero.png" download="warisan-vs-arisan-logo-3d.png" class="btn-emerald btn-full">
        Unduh Logo 3D Transparan (PNG)
      </a>
      <a href="og-image.png" download="warisan-vs-arisan-keyart-1200x630.png" class="btn-ruby btn-full">
        Unduh Gambar Sampul (1200×630 PNG)
      </a>
      <a href="assets/kas-studio-logo.svg" download="kas-studio-logo.svg" class="btn-gold btn-full">
        Unduh Logo KAS Studio (SVG)
      </a>
    `,
  });
});

function openSalamNeighborModal(salamCode) {
  const clean = String(salamCode || '').trim().toUpperCase();
  openModal({
    kicker: 'KODE SALAM TETANGGA',
    title: 'Bonus +25 Energi Permainan',
    desc: 'Salin kode di bawah lalu tukarkan pada tab Bazar di dalam aplikasi Warisan vs Arisan (iOS / Android).',
    slotHtml: `
      <div class="modal-info-card" style="text-align:center">
        <strong>Kode Salam:</strong><br/>
        <code style="font-size:16px;font-weight:800">${clean}</code>
      </div>
      <button type="button" id="btn-copy-salam" class="btn-gold btn-full">Salin Kode</button>
    `,
  });
  document.getElementById('btn-copy-salam')?.addEventListener('click', () => {
    navigator.clipboard?.writeText(clean).then(() => {
      sfx.saronLadder();
      showGriyaToast(`Kode ${clean} disalin.`, 'nadia');
      closeModal();
    });
  });
}

function handleFunnelDeepLink() {
  const hash = (window.location.hash || '').toLowerCase();
  const params = new URLSearchParams(window.location.search);
  if (params.get('salam')) {
    openSalamNeighborModal(params.get('salam'));
  } else if (hash === '#testflight' || hash === '#ios' || params.get('beta') === 'ios') {
    openIosLeadModal(true);
  } else if (hash === '#android' || hash === '#beta' || params.get('beta') === 'android') {
    openAndroidLeadModal();
  } else if (hash === '#masukan' || hash === '#feedback' || params.get('feedback') === '1') {
    openFeedbackModal();
  }
}

window.addEventListener('hashchange', handleFunnelDeepLink);
handleFunnelDeepLink();
