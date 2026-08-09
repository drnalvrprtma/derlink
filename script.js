var SUPABASE_URL = 'https://ejglcymhfhvvawaivzzn.supabase.co';
var SUPABASE_ANON_KEY = 'sb_publishable_tZumN4lZridU8OugW1YRag_ItE3VISi';

var sb = null;
if (window.supabase && SUPABASE_URL.indexOf('YOUR-PROJECT') === -1) {
  sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

window.addEventListener('load', function () {
  setTimeout(function () {
    document.getElementById('loader').classList.add('hidden');
  }, 1500);
});

var revealEls = document.querySelectorAll('[data-reveal]');
revealEls.forEach(function (el, i) {
  setTimeout(function () {
    el.classList.add('in');
  }, 1600 + i * 140);
});

var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

if (!isTouch) {
  var core = document.getElementById('cursorCore');
  var lens = document.getElementById('cursorLens');
  var mx = 0, my = 0, lx = 0, ly = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    core.style.left = mx + 'px';
    core.style.top = my + 'px';
  });

  (function loop() {
    lx += (mx - lx) * 0.16;
    ly += (my - ly) * 0.16;
    lens.style.left = lx + 'px';
    lens.style.top = ly + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      lens.classList.add('active');
    });
    el.addEventListener('mouseleave', function () {
      lens.classList.remove('active');
    });
  });
}

function tickClock() {
  var n = new Date();
  var h = n.getHours();
  var m = String(n.getMinutes()).padStart(2, '0');
  var ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  document.getElementById('clock').textContent = h + ':' + m + ' ' + ap;
}
tickClock();
setInterval(tickClock, 1000);

var handleBtn = document.getElementById('handleBtn');
var toast = document.getElementById('toast');
handleBtn.addEventListener('click', function () {
  navigator.clipboard.writeText('@derenxtrnlz').catch(function () {});
  toast.classList.add('show');
  setTimeout(function () {
    toast.classList.remove('show');
  }, 2200);
});

function addRipple(e, el) {
  var r = document.createElement('span');
  var rect = el.getBoundingClientRect();
  var size = Math.max(rect.width, rect.height) * 1.5;
  var x = (e.clientX || (e.touches && e.touches[0].clientX) || rect.width / 2) - rect.left - size / 2;
  var y = (e.clientY || (e.touches && e.touches[0].clientY) || rect.height / 2) - rect.top - size / 2;
  r.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;';
  r.className = 'ripple';
  el.appendChild(r);
  setTimeout(function () {
    r.remove();
  }, 650);
}

function bindRipple(el) {
  el.addEventListener('click', function (e) {
    addRipple(e, el);
  });
}

document.querySelectorAll('.linkCard').forEach(bindRipple);

var phrases = ['UI/UX Designer & Developer.', 'Building premium web experiences.', 'Open source enthusiast.', 'Creator. Builder. Dreamer.'];
var pi = 0, ci = 0, deleting = false;
var typeEl = document.getElementById('typeText');

function typeLoop() {
  var current = phrases[pi];
  if (!deleting) {
    ci++;
    typeEl.textContent = current.slice(0, ci);
    if (ci === current.length) {
      deleting = true;
      setTimeout(typeLoop, 2200);
      return;
    }
    setTimeout(typeLoop, 52);
  } else {
    ci--;
    typeEl.textContent = current.slice(0, ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      setTimeout(typeLoop, 380);
      return;
    }
    setTimeout(typeLoop, 26);
  }
}
setTimeout(typeLoop, 2000);

var musicBtn = document.getElementById('musicBtn');
var playing = false;
musicBtn.addEventListener('click', function () {
  playing = !playing;
  musicBtn.classList.toggle('playing', playing);
  musicBtn.querySelector('i').className = playing ? 'fa-solid fa-compact-disc' : 'fa-solid fa-music';
});

function renderProjects(list) {
  var container = document.getElementById('projectsList');
  container.innerHTML = '';

  if (!list || list.length === 0) {
    container.innerHTML = '<div class="emptyState"><i class="fa-solid fa-folder-open"></i><span>Belum ada project ditambahkan</span></div>';
    return;
  }

  list.forEach(function (p) {
    var a = document.createElement('a');
    a.className = 'linkCard';
    a.href = p.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML =
      '<span class="linkIcon"><i class="' + (p.icon || 'fa-solid fa-link') + '"></i></span>' +
      '<span class="linkText"><span class="linkLabel">' + p.title + '</span><span class="linkSub">' + (p.subtitle || '') + '</span></span>' +
      '<i class="fa-solid fa-arrow-right linkArrow"></i>';
    bindRipple(a);
    container.appendChild(a);
  });
}

function loadProjects() {
  var container = document.getElementById('projectsList');

  if (!sb) {
    container.innerHTML = '<div class="errorState"><i class="fa-solid fa-plug-circle-xmark"></i><span>Supabase belum dikonfigurasi</span></div>';
    return;
  }

  sb.from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .then(function (res) {
      if (res.error) {
        container.innerHTML = '<div class="errorState"><i class="fa-solid fa-triangle-exclamation"></i><span>Gagal memuat project</span></div>';
        return;
      }
      renderProjects(res.data);
    });
}

loadProjects();
