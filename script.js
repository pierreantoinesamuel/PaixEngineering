const frame = document.querySelector('#process-frame');
const detailFrame = document.querySelector('#process-frame-detail');
const counter = document.querySelector('#frame-counter');
const totalFrames = 71;
let currentFrame = 1;

const framePath = (number) => `assets/frames/frame_${String(number).padStart(3, '0')}.jpg`;

if (!document.querySelector('link[rel="icon"]')) {
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/png';
  favicon.href = 'assets/paix-logo.png';
  document.head.append(favicon);
}

document.querySelectorAll('.brand').forEach((brand) => {
  if (!brand.querySelector('.brand-logo')) {
    brand.querySelector('.brand-mark')?.remove();
    brand.querySelector('.brand-name')?.remove();
    const logo = document.createElement('img');
    logo.className = 'brand-logo';
    logo.src = 'assets/paix-logo.png';
    logo.alt = 'PAIX Engineering';
    brand.append(logo);
  }
});

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navigationItems = [
  ['services.html', 'Capabilities'],
  ['process.html', 'Process'],
  ['about.html', 'About'],
  ['blog.html', 'Blogs'],
  ['contact.html', 'Contact'],
];

document.querySelectorAll('.desktop-nav').forEach((nav) => {
  nav.innerHTML = navigationItems.map(([href, label]) => `<a href="${href}"${currentPage === href ? ' class="active"' : ''}>${label}</a>`).join('');
});

document.querySelectorAll('.mobile-nav').forEach((nav) => {
  nav.innerHTML = `${navigationItems.map(([href, label]) => `<a href="${href}"${currentPage === href ? ' aria-current="page"' : ''}>${label}</a>`).join('')}<a class="mobile-booking-link" href="consultation.html"${currentPage === 'consultation.html' ? ' aria-current="page"' : ''}>Book a consultation <span aria-hidden="true">↗</span></a>`;
});

document.querySelectorAll('.header-cta').forEach((cta) => {
  cta.href = 'consultation.html';
  cta.innerHTML = 'Book a consultation <span>↗</span>';
});

const calendlyUrl = window.PAIX_CONFIG?.CALENDLY_URL;
const calendlyWidget = document.querySelector('[data-calendly-widget]');
const calendlyFallback = document.querySelector('.scheduler-fallback');

if (calendlyUrl && calendlyFallback) {
  calendlyFallback.href = calendlyUrl;
}

if (calendlyUrl && calendlyWidget) {
  calendlyWidget.dataset.url = calendlyUrl;
  calendlyWidget.classList.add('is-ready');

  const calendlyScript = document.createElement('script');
  calendlyScript.src = 'https://assets.calendly.com/assets/external/widget.js';
  calendlyScript.async = true;
  document.head.append(calendlyScript);
}

const processDetail = document.querySelector('.process-detail');
if (processDetail && !processDetail.querySelector('.image-feature')) {
  processDetail.insertAdjacentHTML('afterbegin', '<div class="image-feature image-feature-dark"><div><p class="eyebrow">ENGINEERING IN PRACTICE</p><h2>Measure twice.<br /><em>Build with confidence.</em></h2><p>Good process creates space for careful observation before the next decision is made.</p></div><img src="assets/engineer-caliper.png" alt="Engineer measuring a metal component with calipers at a workbench" /></div>');
}

const aboutIntro = document.querySelector('.about-intro');
if (aboutIntro && !aboutIntro.querySelector('.image-feature')) {
  aboutIntro.querySelector('.section-label').insertAdjacentHTML('afterend', '<div class="image-feature image-feature-cyan"><img src="assets/engineer-caliper.png" alt="Engineer inspecting a physical component during product development" /><div><p class="eyebrow">FROM SCREEN TO SHOP FLOOR</p><h2>Make it<br /><em>real.</em></h2><p>PAIX works where engineering decisions become physical products, bringing care and clarity to the details that make the difference.</p></div></div>');
}

const preloadFrames = () => {
  for (let number = 1; number <= totalFrames; number += 1) {
    const image = new Image();
    image.src = framePath(number);
  }
};

const playProcess = () => {
  currentFrame = currentFrame === totalFrames ? 1 : currentFrame + 1;
  if (frame) frame.src = framePath(currentFrame);
  if (detailFrame) detailFrame.src = framePath(currentFrame);
  if (counter) counter.textContent = `${String(currentFrame).padStart(2, '0')} / ${totalFrames}`;
};

if (frame) {
  preloadFrames();
  setInterval(playProcess, 120);
}

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
if (menuButton && mobileNav) menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  mobileNav.classList.toggle('is-open', !isOpen);
  mobileNav.setAttribute('aria-hidden', String(isOpen));
});

document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const files = formData.getAll('attachments');
    const attachmentNames = files
      .filter((file) => file && typeof file.name === 'string' && file.name.trim())
      .map((file) => file.name)
      .join(', ');

    const subject = encodeURIComponent(`PAIX Engineering project inquiry from ${formData.get('name')}`);
    const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nCompany: ${formData.get('company') || 'Not provided'}\nAttachments: ${attachmentNames || 'None'}\n\n${formData.get('message')}`);

    window.location.href = `mailto:info@paixengineering.com?subject=${subject}&body=${body}`;
  });
}
