// Mobile nav toggle
const toggleBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggleBtn && nav) {
  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!expanded));
  });
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Back to top
const toTop = document.getElementById('toTop');
if (toTop) toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Newsletter
const nl = document.getElementById('newsletterForm');
if (nl) {
  nl.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('nlEmail').value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) { alert('Please enter a valid email.'); return; }
    alert('Subscribed! Welcome to FitForge updates.');
    nl.reset();
  });
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = String(data.get('name')||'').trim();
    const email = String(data.get('email')||'').trim();
    const message = String(data.get('message')||'').trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !validEmail || message.length < 5) {
      alert('Please provide your name, a valid email, and a message (5+ chars).');
      return;
    }
    alert('Thanks! Your message was sent.');
    contactForm.reset();
  });
}

// Workout filter
const woFilter = document.getElementById('woFilter');
if (woFilter) {
  const cards = document.querySelectorAll('.w');
  woFilter.addEventListener('change', () => {
    const tag = woFilter.value;
    cards.forEach(c => {
      const tags = (c.getAttribute('data-tags') || '').split(/\s+/);
      c.style.display = (tag === 'all' || tags.includes(tag)) ? '' : 'none';
    });
  });
}

// BMI/BMR/TDEE calculator
const calcAll = document.getElementById('calcAll');
if (calcAll) {
  calcAll.addEventListener('click', () => {
    const h = Math.max(80, parseFloat(document.getElementById('cHeight').value || '0'));
    const w = Math.max(20, parseFloat(document.getElementById('cWeight').value || '0'));
    const age = Math.max(10, parseInt(document.getElementById('cAge').value || '0', 10));
    const sex = document.getElementById('cSex').value;
    const act = parseFloat(document.getElementById('cAct').value || '1.2');
    const bmi = w / Math.pow(h/100, 2);
    let bmr = 10*w + 6.25*h - 5*age + (sex === 'Male' ? 5 : -161);
    const tdee = bmr * act;
    document.getElementById('outBMI').textContent = bmi.toFixed(1);
    document.getElementById('outBMR').textContent = Math.round(bmr);
    document.getElementById('outTDEE').textContent = Math.round(tdee);
  });
}

// Tracker
const tAdd = document.getElementById('tAdd');
if (tAdd) {
  tAdd.addEventListener('click', () => {
    const date = (document.getElementById('tDate').value || '').trim();
    const weight = (document.getElementById('tWeight').value || '').trim();
    const notes = (document.getElementById('tNotes').value || '').trim();
    if (!date || !weight) { alert('Please add date and weight.'); return; }
    const li = document.createElement('li');
    li.textContent = `${date} — ${weight} kg — ${notes}`;
    document.getElementById('tList').appendChild(li);
    document.getElementById('tWeight').value='';
    document.getElementById('tNotes').value='';
  });
}
