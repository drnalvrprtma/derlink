var SUPABASE_URL = 'https://ejglcymhfhvvawaivzzn.supabase.co';
var SUPABASE_ANON_KEY = 'sb_publishable_tZumN4lZridU8OugW1YRag_ItE3VISi';

var sb = null;
if (window.supabase && SUPABASE_URL.indexOf('YOUR-PROJECT') === -1) {
  sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
var $ = function (id) { return document.getElementById(id); };

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

(function () {
  var el = $('name');
  var text = el.textContent.trim();
  el.setAttribute('aria-label', text);
  el.textContent = '';
  var i = 0;
  text.split(' ').forEach(function (w) {
    var word = document.createElement('span');
    word.className = 'word';
    word.setAttribute('aria-hidden', 'true');
    w.split('').forEach(function (c) {
      var s = document.createElement('span');
      s.className = 'ch';
      s.style.setProperty('--i', i++);
      s.textContent = c;
      word.appendChild(s);
    });
    el.appendChild(word);
  });
})();

var io = null, firstBatch = true;

function reveal(el, k) {
  var delay = reduce ? 0 : (firstBatch ? 350 : 0) + Math.min(k, 8) * 70;
  el.style.transitionDelay = delay + 'ms';
  el.classList.add('in');
  setTimeout(function () {
    el.style.transitionDelay = '';
    el.classList.add('done');
  }, delay + 700);
}

function watch(el) { if (io) io.observe(el); }

function startReveal() {
  io = new IntersectionObserver(function (entries) {
    var k = 0;
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        reveal(en.target, k++);
        io.unobserve(en.target);
      }
    });
    if (k) firstBatch = false;
  }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });
}

var loaded = false, finished = false, t0 = performance.now();
window.addEventListener('load', function () { loaded = true; });

function finish() {
  if (finished) return;
  finished = true;
  $('loader').classList.add('hidden');
  document.body.classList.add('ready');
  setTimeout(startReveal, 150);
  setTimeout(typeLoop, 1600);
  setTimeout(function () { var l = $('loader'); if (l) l.style.display = 'none'; }, 700);
}

(function step(now) {
  var target = Math.min(100, ((now - t0) / 1400) * 100);
  var p = loaded ? target : Math.min(target, 90);
  $('loaderFill').style.width = p + '%';
  $('loaderPct').textContent = Math.floor(p);
  if (p >= 100) { finish(); return; }
  requestAnimationFrame(step);
})(t0);
setTimeout(finish, 6000);

if (!isTouch) {
  var dot = $('cursorDot');
  var magnets = Array.prototype.slice.call(document.querySelectorAll('.socialBtn'));

  document.addEventListener('mousemove', function (e) {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';

    if (reduce) return;

    magnets.forEach(function (b) {
      var r = b.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width / 2);
      var dy = e.clientY - (r.top + r.height / 2);
      if (Math.sqrt(dx * dx + dy * dy) < 90) {
        b.style.setProperty('--mx', Math.max(-6, Math.min(6, dx * 0.2)) + 'px');
        b.style.setProperty('--my', Math.max(-6, Math.min(6, dy * 0.2)) + 'px');
      } else {
        b.style.setProperty('--mx', '0px');
        b.style.setProperty('--my', '0px');
      }
    });

    var t = e.target.closest ? e.target.closest('.tilt') : null;
    if (t) {
      var rc = t.getBoundingClientRect();
      var px = (e.clientX - rc.left) / rc.width - 0.5;
      var py = (e.clientY - rc.top) / rc.height - 0.5;
      t.style.setProperty('--ry', (px * 4).toFixed(2) + 'deg');
      t.style.setProperty('--rx', (-py * 4).toFixed(2) + 'deg');
    }
  });

  document.addEventListener('mouseout', function (e) {
    var t = e.target.closest ? e.target.closest('.tilt') : null;
    if (t && !t.contains(e.relatedTarget)) {
      t.style.setProperty('--rx', '0deg');
      t.style.setProperty('--ry', '0deg');
    }
  });

    if (!reduce) {
    var decos = Array.prototype.slice.call(document.querySelectorAll('.deco'));
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        decos.forEach(function (d) {
          var y = window.scrollY * parseFloat(d.getAttribute('data-p'));
          d.style.transform = 'translateY(' + Math.max(-20, Math.min(20, y)) + 'px)';
        });
        ticking = false;
      });
    }, { passive: true });
  }
}

window.addEventListener('scroll', function () {
  var max = document.body.scrollHeight - window.innerHeight;
  $('progress').style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
}, { passive: true });

document.addEventListener('click', function (e) {
  if (reduce) return;
  var host = e.target.closest ? e.target.closest('.rippleHost') : null;
  if (!host) return;
  var rect = host.getBoundingClientRect();
  var x = (e.clientX || rect.left + rect.width / 2) - rect.left - 20;
  var y = (e.clientY || rect.top + rect.height / 2) - rect.top - 20;
  var r = document.createElement('span');
  r.className = 'ripple';
  r.style.left = x + 'px';
  r.style.top = y + 'px';
  host.appendChild(r);
  setTimeout(function () { r.remove(); }, 450);
});

function tickClock() {
  var n = new Date();
  var h = n.getHours();
  var m = String(n.getMinutes()).padStart(2, '0');
  var ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  $('clock').textContent = h + ':' + m + ' ' + ap;
}
tickClock();
setInterval(tickClock, 1000);

$('handleBtn').addEventListener('click', function () {
  var txt = this.getAttribute('data-copy');
  if (navigator.clipboard) navigator.clipboard.writeText(txt).catch(function () {});
  var toast = $('toast');
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 2000);
});

var phrases = ['UI/UX Designer & Developer.', 'Building premium web experiences.', 'Open source enthusiast.', 'Creator. Builder. Dreamer.'];
var pi = 0, ci = 0, deleting = false;
var typeEl = $('typeText');

function typeLoop() {
  var current = phrases[pi];
  if (!deleting) {
    ci++;
    typeEl.textContent = current.slice(0, ci);
    if (ci === current.length) { deleting = true; setTimeout(typeLoop, 2200); return; }
    setTimeout(typeLoop, 52);
  } else {
    ci--;
    typeEl.textContent = current.slice(0, ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(typeLoop, 380); return; }
    setTimeout(typeLoop, 26);
  }
}

function initPlayer(track) {
  var audio = new Audio(track.src);
  var playBtn = $('playBtn'), disc = $('disc'), seek = $('seek');
  var playing = false;

  $('trackTitle').textContent = track.title || 'Tanpa judul';
  $('trackArtist').textContent = track.artist || '';
  $('player').hidden = false;
  watch($('player'));

  function fmt(s) {
    if (!isFinite(s)) return '0:00';
    return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  }
  function setProgress(p) {
    seek.value = p;
    seek.style.setProperty('--p', p + '%');
  }
  function setPlaying(v) {
    playing = v;
    disc.classList.toggle('playing', v);
    playBtn.querySelector('i').className = v ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    playBtn.setAttribute('aria-label', v ? 'Jeda musik' : 'Putar musik');
  }

  playBtn.addEventListener('click', function () {
    if (!playing) {
      audio.play().then(function () { setPlaying(true); }).catch(function () { setPlaying(false); });
    } else {
      audio.pause();
      setPlaying(false);
    }
  });

  seek.addEventListener('input', function () {
    setProgress(seek.value);
    if (audio.duration) audio.currentTime = (seek.value / 100) * audio.duration;
  });

  audio.addEventListener('loadedmetadata', function () { $('tDur').textContent = fmt(audio.duration); });
  audio.addEventListener('timeupdate', function () {
    if (!audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
    $('tCur').textContent = fmt(audio.currentTime);
  });
  audio.addEventListener('ended', function () { setPlaying(false); setProgress(0); });
}

function loadTrack() {
  if (!sb) return;
  sb.from('music').select('*').eq('id', 1).maybeSingle().then(function (res) {
    if (res.error || !res.data || !res.data.src) return;
    initPlayer(res.data);
  });
}

function safeUrl(u) { return /^(https?:\/\/|mailto:)/i.test(u || '') ? u : '#'; }
function safeIcon(c) { return /^[a-z0-9 -]+$/i.test(c || '') ? c : 'fa-solid fa-link'; }

function renderProjects(list) {
  var container = $('projectsList');
  container.innerHTML = '';

  if (!list || list.length === 0) {
    container.innerHTML = '<div class="emptyState"><i class="fa-solid fa-folder-open"></i><span>Belum ada project ditambahkan</span></div>';
    return;
  }

  list.forEach(function (p) {
    var a = document.createElement('a');
    a.className = 'linkCard rv tilt rippleHost';
    a.href = safeUrl(p.url);
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML =
      '<span class="linkIcon"><i class="' + safeIcon(p.icon) + '"></i></span>' +
      '<span class="linkText"><span class="linkLabel">' + esc(p.title) + '</span><span class="linkSub">' + esc(p.subtitle) + '</span></span>' +
      '<i class="fa-solid fa-arrow-right linkArrow"></i>';
    container.appendChild(a);
    watch(a);
  });
}

function loadProjects() {
  var container = $('projectsList');
  if (!sb) {
    container.innerHTML = '<div class="errorState"><i class="fa-solid fa-plug-circle-xmark"></i><span>Supabase belum dikonfigurasi</span></div>';
    return;
  }
  sb.from('projects').select('*').order('sort_order', { ascending: true }).then(function (res) {
    if (res.error) {
      container.innerHTML = '<div class="errorState"><i class="fa-solid fa-triangle-exclamation"></i><span>Gagal memuat project</span></div>';
      return;
    }
    renderProjects(res.data);
  });
}
loadProjects();
loadTrack();