const PROFILE_PHOTO = "files/prof2.jpeg";
const RESUME_PDF    = "files/Md_Ali_Shekh_Resume.pdf";

/* ── Photo loader ── */
const frame = document.getElementById('photo-frame');
const img = new Image();
img.src = PROFILE_PHOTO;
img.onload = () => {
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
  frame.appendChild(img);
};
img.onerror = () => {
  frame.innerHTML = `<div class="photo-placeholder">
    <i class="fas fa-user-circle"></i>
    <p>Add profile.jpg to assets/</p>
  </div>`;
};

/* ── Resume buttons ── */
document.getElementById('resume-nav-btn').href     = RESUME_PDF;
document.getElementById('resume-contact-btn').href = RESUME_PDF;

/* ── Theme toggle ── */
const html      = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
const icon      = document.getElementById('themeIcon');
let dark = true;
icon.className = 'fas fa-sun';
toggleBtn.addEventListener('click', () => {
  dark = !dark;
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
});

/* ══ SKILLS DATA ═════════════════════════════════ */
const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

/* CHANGE 3: LLM added to skillsAI */
const skillsAI = [
  { name: "NumPy",       logo: `${CDN}/numpy/numpy-original.svg` },
  { name: "Pandas",      logo: `${CDN}/pandas/pandas-original.svg` },
  { name: "Matplotlib",  logo: `${CDN}/matplotlib/matplotlib-original.svg` },
  { name: "Scikit-learn",logo: `${CDN}/scikitlearn/scikitlearn-original.svg` },
  { name: "LangChain",   logo: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
  { name: "OpenAI",      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
  { name: "Pinecone",    logo: "https://avatars.githubusercontent.com/u/54333248?s=200&v=4" },
  { name: "LLM",         logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1200px-OpenAI_Logo.svg.png" },
];

/* CHANGE 2: JS removed from skillsCore */
const skillsCore = [
  { name: "Python",  logo: `${CDN}/python/python-original.svg` },
  { name: "FastAPI", logo: `${CDN}/fastapi/fastapi-original.svg` },
  { name: "Django",  logo: `${CDN}/django/django-plain.svg` },
  { name: "HTML",    logo: `${CDN}/html5/html5-original.svg` },
  { name: "CSS",     logo: `${CDN}/css3/css3-original.svg` },
];

const skillsDevOps = [
  { name: "Docker",  logo: `${CDN}/docker/docker-original.svg` },
  { name: "AWS",     logo: `${CDN}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
  { name: "CI/CD",   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
  { name: "GitHub",  logo: `${CDN}/github/github-original.svg` },
  { name: "Render",  logo: "https://render.com/images/render-banner.png" },
];

/* CHANGE 3: JWT removed from skillsTools */
const skillsTools = [
  { name: "PostgreSQL", logo: `${CDN}/postgresql/postgresql-original.svg` },
  { name: "MySQL",      logo: `${CDN}/mysql/mysql-original.svg` },
  { name: "VS Code",    logo: `${CDN}/vscode/vscode-original.svg` },
  { name: "PyCharm",    logo: `${CDN}/pycharm/pycharm-original.svg` },
  { name: "Jupyter",    logo: `${CDN}/jupyter/jupyter-original.svg` },
  { name: "Anaconda",   logo: `${CDN}/anaconda/anaconda-original.svg` },
  { name: "Postman",    logo: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
  { name: "Git",        logo: `${CDN}/git/git-original.svg` },
];

function renderSkills(id, skills) {
  const container = document.getElementById(id);
  skills.forEach(skill => {
    const box = document.createElement('div');
    box.className = 'skill-box'; box.title = skill.name;

    const img = document.createElement('img');
    img.src = skill.logo; img.alt = skill.name;
    img.onerror = () => {
      img.style.display = 'none';
      const ic = document.createElement('i');
      ic.className = 'fas fa-code';
      ic.style.cssText = 'font-size:1.5rem;color:var(--violet);opacity:0.55;';
      box.insertBefore(ic, box.querySelector('.skill-name'));
    };

    const label = document.createElement('span');
    label.className = 'skill-name'; label.textContent = skill.name;

    box.appendChild(img); box.appendChild(label);
    container.appendChild(box);
  });
}

renderSkills('skills-ai',     skillsAI);
renderSkills('skills-core',   skillsCore);
renderSkills('skills-devops', skillsDevOps);
renderSkills('skills-tools',  skillsTools);

/* ══ SCROLL REVEAL — skill boxes ════════════════ */
document.querySelectorAll('.skill-box').forEach(b => b.classList.add('sr-hidden'));

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-box').forEach((box, i) => {
        setTimeout(() => {
          box.classList.remove('sr-hidden');
          box.classList.add('sr-revealed');
          box.addEventListener('animationend', () => {
            box.classList.remove('sr-revealed');
          }, { once: true });
        }, i * 55);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.skills-grid').forEach(g => skillObserver.observe(g));

/* ══ SCROLL REVEAL — project cards ══════════════ */
document.querySelectorAll('.project-card').forEach(c => c.classList.add('sr-hidden'));

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.project-card').forEach((card, i) => {
        setTimeout(() => {
          card.classList.remove('sr-hidden');
          card.classList.add('sr-revealed');
          card.addEventListener('animationend', () => {
            card.classList.remove('sr-revealed');
          }, { once: true });
        }, i * 80);
      });
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.projects-grid').forEach(g => cardObserver.observe(g));

/* ══ STAT CARDS — click to scroll ═══════════════ */
document.querySelectorAll('.stat-card[data-target]').forEach(card => {
  card.addEventListener('click', () => {
    const target = document.querySelector(card.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
